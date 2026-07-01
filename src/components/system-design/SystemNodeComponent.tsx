import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Monitor, Server, Database, Zap, Shield, List, GitBranch, Globe, Box, Boxes, Layers, Radio, HardDrive, Code, ArrowLeftRight } from "lucide-react";
import { SystemNodeData, NodeType } from "../../types/system-design";

const TYPE_CONFIG: Record<NodeType, { color: string; bg: string; Icon: React.ElementType }> = {
  client:       { color: "#6366f1", bg: "#eef2ff", Icon: Monitor },
  server:       { color: "#10b981", bg: "#ecfdf5", Icon: Server },
  database:     { color: "#f59e0b", bg: "#fffbeb", Icon: Database },
  cache:        { color: "#8b5cf6", bg: "#f5f3ff", Icon: Zap },
  auth:         { color: "#ef4444", bg: "#fef2f2", Icon: Shield },
  queue:        { color: "#f97316", bg: "#fff7ed", Icon: List },
  loadbalancer: { color: "#06b6d4", bg: "#ecfeff", Icon: GitBranch },
  cdn:          { color: "#84cc16", bg: "#f7fee7", Icon: Globe },
  generic:      { color: "#6b7280", bg: "#f9fafb", Icon: Box },
  microservice: { color: "#7c3aed", bg: "#ede9fe", Icon: Boxes },
  gateway:      { color: "#0891b2", bg: "#ecfeff", Icon: Layers },
  broker:       { color: "#d97706", bg: "#fef3c7", Icon: Radio },
  storage:      { color: "#0284c7", bg: "#e0f2fe", Icon: HardDrive },
  function:     { color: "#db2777", bg: "#fce7f3", Icon: Code },
  proxy:        { color: "#475569", bg: "#f1f5f9", Icon: ArrowLeftRight },
};

export default function SystemNodeComponent({ id, data, selected }: NodeProps) {
  const d = data as SystemNodeData;
  const cfg = TYPE_CONFIG[d.nodeType] ?? TYPE_CONFIG.generic;
  const Icon = cfg.Icon;
  const isActive = d.simStatus === "active";
  const isError = d.simStatus === "error";

  return (
    <div
      className={`sysnode${selected ? " sysnode-selected" : ""}${isActive ? " sysnode-active" : ""}${isError ? " sysnode-error" : ""}`}
      style={{ borderColor: cfg.color, background: cfg.bg }}
      onClick={() => d.onNodeClick?.(id, d.label, d)}
    >
      <Handle type="target" position={Position.Left} className="sysnode-handle" />

      <div className="sysnode-header" style={{ background: cfg.color }}>
        <Icon size={13} color="#fff" />
        <span className="sysnode-type-label">{d.nodeType}</span>
      </div>

      <div className="sysnode-body">
        <span className="sysnode-label">{d.label}</span>

        {Object.keys(d.properties).length > 0 && (
          <div className="sysnode-props">
            {Object.entries(d.properties)
              .slice(0, 2)
              .map(([k, v]) => (
                <span key={k} className="sysnode-prop">
                  {k}: <b>{String(v)}</b>
                </span>
              ))}
          </div>
        )}

        {d.behaviors.length > 0 && (
          <div className="sysnode-rule-badge" style={{ color: cfg.color }}>
            {d.behaviors.length} rule{d.behaviors.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="sysnode-handle" />
    </div>
  );
}
