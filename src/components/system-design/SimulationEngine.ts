import { Node, Edge } from "@xyflow/react";
import {
  SystemNodeData,
  RuleCondition,
  RuleAction,
  StimulusPacket,
  PacketEvent,
  ActionType,
} from "../../types/system-design";

export class SimulationEngine {
  private nodes: Map<string, Node<SystemNodeData>>;
  private edges: Edge[];
  private retryCounters: Map<string, number> = new Map();
  private lbCounters: Map<string, number> = new Map();
  private rlCounters: Map<string, number> = new Map();
  private mergeState: Map<string, { received: Record<string, any>[]; waitFor: number }> = new Map();

  constructor(nodes: Node<SystemNodeData>[], edges: Edge[]) {
    this.nodes = new Map(nodes.map((n) => [n.id, n]));
    this.edges = edges;
  }

  simulate(stimulus: StimulusPacket): PacketEvent[][] {
    this.retryCounters = new Map();
    this.lbCounters = new Map();
    this.rlCounters = new Map();
    this.mergeState = new Map();

    const batches: PacketEvent[][] = [];
    let queue: { nodeId: string; packet: Record<string, any> }[] = [
      {
        nodeId: stimulus.from,
        packet: { type: stimulus.type, path: stimulus.path, from: stimulus.from, ...stimulus.data },
      },
    ];

    let safetyLimit = 60;
    while (queue.length > 0 && safetyLimit-- > 0) {
      const batch: PacketEvent[] = [];
      const nextQueue: { nodeId: string; packet: Record<string, any> }[] = [];

      for (const { nodeId, packet } of queue) {
        const node = this.nodes.get(nodeId);
        if (!node) continue;

        const data = node.data as SystemNodeData;
        const rules = data.behaviors.filter((r) => r.trigger === "on_receive");

        if (rules.length === 0) {
          // Auto-passthrough: forward along all outgoing edges when no rules set
          const outEdges = this.edges.filter((e) => e.source === nodeId);
          if (outEdges.length > 0) {
            for (const outEdge of outEdges) {
              const lbl = typeof outEdge.label === "string" ? outEdge.label : "→";
              const ev = this.makeEvent("forward", nodeId, outEdge.target as string, packet, lbl);
              batch.push(ev);
              nextQueue.push({ nodeId: outEdge.target as string, packet: { ...packet } });
            }
          } else {
            batch.push(this.logEvent(nodeId, packet, "arrived ✓"));
          }
          continue;
        }

        for (const rule of rules) {
          const condMet = !rule.condition || this.evalCondition(rule.condition, packet, data.properties);
          const action = condMet ? rule.then : rule.else;
          if (!action) continue;

          const events = this.execAction(action, nodeId, packet);
          batch.push(...events);

          for (const ev of events) {
            if (ev.toNodeId !== nodeId && !this.isTerminal(ev.action)) {
              nextQueue.push({ nodeId: ev.toNodeId, packet: { ...packet, ...ev.packet } });
            }
          }
        }
      }

      if (batch.length > 0) batches.push(batch);
      queue = nextQueue;
    }

    return batches;
  }

  private evalCondition(c: RuleCondition, packet: Record<string, any>, props: Record<string, any>): boolean {
    const ctx = { ...props, ...packet };
    const val = c.property.split(".").reduce((acc: any, k) => acc?.[k], ctx);
    switch (c.operator) {
      case "==": return String(val) === String(c.value);
      case "!=": return String(val) !== String(c.value);
      case ">": return Number(val) > Number(c.value);
      case "<": return Number(val) < Number(c.value);
      case "contains": return String(val).includes(String(c.value));
      default: return false;
    }
  }

  private execAction(action: RuleAction, fromId: string, packet: Record<string, any>): PacketEvent[] {
    const merged = { ...packet, ...(action.withData ?? {}) };

    switch (action.action) {
      case "forward": {
        const targets = this.toArray(action.to);
        return targets.map((t) => this.makeEvent("forward", fromId, t, merged, action.edgeLabel));
      }

      case "respond": {
        const origin = (packet.from as string) ?? fromId;
        return [this.makeEvent("respond", fromId, origin, merged, action.edgeLabel ?? "← response")];
      }

      case "reject":
        return [this.termEvent("reject", fromId, packet, action.edgeLabel ?? "❌ rejected")];

      case "log":
        return [this.logEvent(fromId, packet, action.edgeLabel ?? "logged")];

      case "cache":
        return [
          this.logEvent(fromId, packet, action.edgeLabel ?? "✓ stored in cache"),
          this.makeEvent("respond", fromId, (packet.from as string) ?? fromId, { ...merged, cached: true }, "served from cache"),
        ];

      case "split": {
        const targets = this.toArray(action.to);
        return targets.map((t) => ({
          ...this.makeEvent("split", fromId, t, merged, action.edgeLabel ?? `fan-out → ${t}`),
          simultaneous: true,
        }));
      }

      case "retry": {
        const target = this.toArray(action.to)[0];
        const max = action.maxAttempts ?? 3;
        const key = `retry-${fromId}-${target}`;
        const attempt = (this.retryCounters.get(key) ?? 0) + 1;
        this.retryCounters.set(key, attempt);

        if (attempt <= max) {
          return [this.makeEvent("retry", fromId, target, { ...merged, retryAttempt: attempt }, `retry ${attempt}/${max}`)];
        }
        return [this.termEvent("reject", fromId, packet, `max retries (${max}) exceeded`)];
      }

      case "load_balance": {
        const targets = this.toArray(action.to);
        const key = `lb-${fromId}`;
        let target: string;
        if (action.strategy === "random") {
          target = targets[Math.floor(Math.random() * targets.length)];
        } else {
          const idx = this.lbCounters.get(key) ?? 0;
          target = targets[idx % targets.length];
          this.lbCounters.set(key, idx + 1);
        }
        return [this.makeEvent("load_balance", fromId, target, merged, action.edgeLabel ?? `→ ${target} (${action.strategy ?? "round-robin"})`)];
      }

      case "rate_limit": {
        const key = `rl-${fromId}`;
        const count = (this.rlCounters.get(key) ?? 0) + 1;
        this.rlCounters.set(key, count);
        const limit = action.rateLimit ?? 1;
        if (count > limit) return [this.termEvent("reject", fromId, packet, `rate limited (${count}/${limit} req/s)`)];
        const target = this.toArray(action.to)[0];
        return target ? [this.makeEvent("forward", fromId, target, merged, `${count}/${limit} req/s`)] : [];
      }

      case "transform": {
        const target = this.toArray(action.to)[0];
        return target ? [this.makeEvent("transform", fromId, target, merged, action.edgeLabel ?? "transformed")] : [];
      }

      case "merge": {
        const key = `merge-${fromId}`;
        const state = this.mergeState.get(key) ?? { received: [], waitFor: action.waitFor ?? 2 };
        state.received.push(packet);
        this.mergeState.set(key, state);
        if (state.received.length >= state.waitFor) {
          this.mergeState.delete(key);
          const target = this.toArray(action.to)[0];
          if (target) return [this.makeEvent("merge", fromId, target, merged, `merged (${state.waitFor} inputs)`)];
        }
        return [this.logEvent(fromId, packet, `waiting for ${state.waitFor - state.received.length} more`)];
      }

      case "queue":
        return [this.logEvent(fromId, packet, action.edgeLabel ?? "queued")];

      default:
        return [];
    }
  }

  private findEdge(source: string, target: string): Edge | undefined {
    return this.edges.find((e) => e.source === source && e.target === target);
  }

  private makeEvent(action: ActionType, from: string, to: string, packet: Record<string, any>, label?: string): PacketEvent {
    const edge = this.findEdge(from, to) ?? this.findEdge(to, from);
    return {
      id: `${action}-${from}-${to}-${Date.now()}-${Math.random()}`,
      fromNodeId: from,
      toNodeId: to,
      edgeId: edge?.id ?? "",
      packet,
      edgeLabel: label,
      action,
    };
  }

  private termEvent(action: ActionType, nodeId: string, packet: Record<string, any>, label: string): PacketEvent {
    return { id: `${action}-${nodeId}-${Date.now()}`, fromNodeId: nodeId, toNodeId: nodeId, edgeId: "", packet, edgeLabel: label, action };
  }

  private logEvent(nodeId: string, packet: Record<string, any>, label: string): PacketEvent {
    return { id: `log-${nodeId}-${Date.now()}`, fromNodeId: nodeId, toNodeId: nodeId, edgeId: "", packet, edgeLabel: label, action: "log" };
  }

  private toArray(val?: string | string[]): string[] {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  }

  private isTerminal(action: ActionType): boolean {
    return action === "respond" || action === "reject" || action === "log";
  }
}
