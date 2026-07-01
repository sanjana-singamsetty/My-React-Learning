import React from "react";
import { Monitor, Server, Database, Zap, Shield, List, GitBranch, Globe, Box, Boxes, Layers, Radio, HardDrive, Code, ArrowLeftRight } from "lucide-react";
import { NodeType } from "../../types/system-design";

const PALETTE_ITEMS: { type: NodeType; label: string; color: string; Icon: React.ElementType }[] = [
  { type: "client",       label: "Client",        color: "#6366f1", Icon: Monitor },
  { type: "server",       label: "Server",        color: "#10b981", Icon: Server },
  { type: "database",     label: "Database",      color: "#f59e0b", Icon: Database },
  { type: "cache",        label: "Cache",         color: "#8b5cf6", Icon: Zap },
  { type: "auth",         label: "Auth",          color: "#ef4444", Icon: Shield },
  { type: "queue",        label: "Queue",         color: "#f97316", Icon: List },
  { type: "loadbalancer", label: "Load Balancer", color: "#06b6d4", Icon: GitBranch },
  { type: "cdn",          label: "CDN",           color: "#84cc16", Icon: Globe },
  { type: "generic",      label: "Generic",       color: "#6b7280", Icon: Box },
  { type: "microservice", label: "Microservice",  color: "#7c3aed", Icon: Boxes },
  { type: "gateway",      label: "API Gateway",   color: "#0891b2", Icon: Layers },
  { type: "broker",       label: "Msg Broker",    color: "#d97706", Icon: Radio },
  { type: "storage",      label: "Storage",       color: "#0284c7", Icon: HardDrive },
  { type: "function",     label: "Function",      color: "#db2777", Icon: Code },
  { type: "proxy",        label: "Proxy",         color: "#475569", Icon: ArrowLeftRight },
];

export default function NodePalette() {
  const onDragStart = (e: React.DragEvent, type: NodeType) => {
    e.dataTransfer.setData("application/nodeType", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="node-palette">
      <div className="palette-title">Nodes</div>
      <p className="palette-hint">Drag onto canvas</p>
      <div className="palette-list">
        {PALETTE_ITEMS.map(({ type, label, color, Icon }) => (
          <div
            key={type}
            className="palette-item"
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <Icon size={15} color={color} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
