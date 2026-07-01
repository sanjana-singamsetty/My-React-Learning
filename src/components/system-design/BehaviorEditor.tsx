import React, { useState } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { BehaviorRule, RuleAction, TriggerType, ActionType, OperatorType } from "../../types/system-design";

const TRIGGERS: TriggerType[] = ["on_receive", "on_timeout", "on_error", "on_connect", "on_threshold"];
const ACTIONS: ActionType[] = [
  "forward", "respond", "reject", "cache", "queue",
  "retry", "split", "merge", "load_balance", "rate_limit", "transform", "log",
];
const OPERATORS: OperatorType[] = ["==", "!=", ">", "<", "contains"];

function makeRule(): BehaviorRule {
  return {
    id: `rule-${Date.now()}`,
    trigger: "on_receive",
    then: { action: "forward" },
  };
}

interface Props {
  nodeId: string;
  nodeLabel: string;
  rules: BehaviorRule[];
  availableTargets: { id: string; label: string }[];
  onChange: (nodeId: string, rules: BehaviorRule[]) => void;
}

export default function BehaviorEditor({ nodeId, nodeLabel, rules, availableTargets, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addRule = () => {
    const r = makeRule();
    onChange(nodeId, [...rules, r]);
    setExpandedId(r.id);
  };

  const removeRule = (id: string) => onChange(nodeId, rules.filter((r) => r.id !== id));

  const updateRule = (id: string, patch: Partial<BehaviorRule>) => {
    onChange(nodeId, rules.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const updateAction = (id: string, field: "then" | "else", patch: Partial<RuleAction>) => {
    onChange(
      nodeId,
      rules.map((r) =>
        r.id === id
          ? { ...r, [field]: r[field] ? { ...r[field]!, ...patch } : { action: "forward", ...patch } }
          : r
      )
    );
  };

  if (!nodeId) {
    return (
      <aside className="behavior-editor behavior-editor-empty">
        <p>Select a node to edit its behavior rules.</p>
      </aside>
    );
  }

  return (
    <aside className="behavior-editor">
      <div className="be-header">
        <span className="be-title">Rules: {nodeLabel}</span>
        <button className="be-add-btn" onClick={addRule} title="Add rule">
          <Plus size={14} /> Add
        </button>
      </div>

      {rules.length === 0 && (
        <p className="be-empty">No rules yet. Click "Add" to define behavior.</p>
      )}

      <div className="be-rules">
        {rules.map((rule) => (
          <div key={rule.id} className={`be-rule ${expandedId === rule.id ? "be-rule-open" : ""}`}>
            <div className="be-rule-summary" onClick={() => setExpandedId(expandedId === rule.id ? null : rule.id)}>
              <ChevronDown size={13} className="be-chevron" />
              <span className="be-rule-trigger">{rule.trigger}</span>
              {rule.condition && (
                <span className="be-rule-cond">
                  if {rule.condition.property} {rule.condition.operator} {String(rule.condition.value)}
                </span>
              )}
              <span className="be-rule-then">→ {rule.then.action}</span>
              <button className="be-delete-btn" onClick={(e) => { e.stopPropagation(); removeRule(rule.id); }}>
                <Trash2 size={12} />
              </button>
            </div>

            {expandedId === rule.id && (
              <div className="be-rule-body">
                {/* Trigger */}
                <div className="be-field">
                  <label>Trigger</label>
                  <select value={rule.trigger} onChange={(e) => updateRule(rule.id, { trigger: e.target.value as TriggerType })}>
                    {TRIGGERS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                {/* Condition */}
                <div className="be-section-label">Condition (optional)</div>
                <div className="be-row">
                  <input
                    className="be-input"
                    placeholder="property (e.g. cache.hit)"
                    value={rule.condition?.property ?? ""}
                    onChange={(e) => updateRule(rule.id, { condition: { ...rule.condition, property: e.target.value, operator: rule.condition?.operator ?? "==", value: rule.condition?.value ?? "" } })}
                  />
                  <select
                    value={rule.condition?.operator ?? "=="}
                    onChange={(e) => updateRule(rule.id, { condition: { ...rule.condition!, operator: e.target.value as OperatorType } })}
                  >
                    {OPERATORS.map((op) => <option key={op}>{op}</option>)}
                  </select>
                  <input
                    className="be-input"
                    placeholder="value"
                    value={rule.condition?.value !== undefined ? String(rule.condition.value) : ""}
                    onChange={(e) => updateRule(rule.id, { condition: { ...rule.condition!, value: e.target.value } })}
                  />
                  {rule.condition && (
                    <button className="be-clear-btn" onClick={() => updateRule(rule.id, { condition: undefined })}>✕</button>
                  )}
                </div>

                {/* Then action */}
                <ActionEditor
                  label="Then"
                  action={rule.then}
                  availableTargets={availableTargets}
                  onChange={(patch) => updateAction(rule.id, "then", patch)}
                />

                {/* Else action */}
                <div className="be-section-label">
                  Else (optional)
                  {!rule.else && (
                    <button className="be-add-else" onClick={() => updateAction(rule.id, "else", { action: "reject" })}>+ else</button>
                  )}
                </div>
                {rule.else && (
                  <ActionEditor
                    label="Else"
                    action={rule.else}
                    availableTargets={availableTargets}
                    onChange={(patch) => updateAction(rule.id, "else", patch)}
                    onRemove={() => updateRule(rule.id, { else: undefined })}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

function ActionEditor({
  label,
  action,
  availableTargets,
  onChange,
  onRemove,
}: {
  label: string;
  action: RuleAction;
  availableTargets: { id: string; label: string }[];
  onChange: (patch: Partial<RuleAction>) => void;
  onRemove?: () => void;
}) {
  const needsTarget = ["forward", "respond", "retry", "split", "load_balance", "rate_limit", "transform", "merge"].includes(action.action);
  const needsMax = action.action === "retry";
  const needsWait = action.action === "merge";
  const needsRate = action.action === "rate_limit";
  const needsStrategy = action.action === "load_balance";

  return (
    <div className="be-action">
      <div className="be-action-header">
        <span className="be-action-label">{label}</span>
        {onRemove && <button className="be-clear-btn" onClick={onRemove}>✕</button>}
      </div>
      <div className="be-row">
        <select value={action.action} onChange={(e) => onChange({ action: e.target.value as ActionType, to: undefined })}>
          {ACTIONS.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>

      {needsTarget && (
        <div className="be-field">
          <label>Target node(s)</label>
          <select
            value={Array.isArray(action.to) ? action.to[0] ?? "" : action.to ?? ""}
            onChange={(e) => onChange({ to: e.target.value })}
          >
            <option value="">— select —</option>
            {availableTargets.map((t) => (
              <option key={t.id} value={t.id}>{t.label} ({t.id})</option>
            ))}
          </select>
        </div>
      )}

      {needsMax && (
        <div className="be-field">
          <label>Max attempts</label>
          <input type="number" min={1} max={10} value={action.maxAttempts ?? 3}
            onChange={(e) => onChange({ maxAttempts: Number(e.target.value) })} />
        </div>
      )}

      {needsWait && (
        <div className="be-field">
          <label>Wait for (N inputs)</label>
          <input type="number" min={2} max={10} value={action.waitFor ?? 2}
            onChange={(e) => onChange({ waitFor: Number(e.target.value) })} />
        </div>
      )}

      {needsRate && (
        <div className="be-field">
          <label>Rate limit (req/s)</label>
          <input type="number" min={1} value={action.rateLimit ?? 1}
            onChange={(e) => onChange({ rateLimit: Number(e.target.value) })} />
        </div>
      )}

      {needsStrategy && (
        <div className="be-field">
          <label>Strategy</label>
          <select value={action.strategy ?? "round-robin"}
            onChange={(e) => onChange({ strategy: e.target.value as "round-robin" | "random" })}>
            <option value="round-robin">Round-robin</option>
            <option value="random">Random</option>
          </select>
        </div>
      )}

      <div className="be-field">
        <label>Edge label</label>
        <input className="be-input" placeholder="label on edge during sim"
          value={action.edgeLabel ?? ""}
          onChange={(e) => onChange({ edgeLabel: e.target.value })} />
      </div>
    </div>
  );
}
