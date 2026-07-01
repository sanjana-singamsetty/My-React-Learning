import React, { useState } from "react";
import { X, Zap } from "lucide-react";
import { StimulusPacket } from "../../types/system-design";

interface Props {
  isOpen: boolean;
  nodeOptions: { id: string; label: string }[];
  onLaunch: (stimulus: StimulusPacket) => void;
  onClose: () => void;
}

export default function StimulusLauncher({ isOpen, nodeOptions, onLaunch, onClose }: Props) {
  const [type, setType] = useState("GET");
  const [path, setPath] = useState("/api/data");
  const [from, setFrom] = useState(nodeOptions[0]?.id ?? "");

  if (!isOpen) return null;

  const launch = () => {
    if (!from) return;
    onLaunch({ type, path, from });
    onClose();
  };

  return (
    <div className="stimulus-overlay" onClick={onClose}>
      <div className="stimulus-modal" onClick={(e) => e.stopPropagation()}>
        <div className="stimulus-header">
          <div className="stimulus-title">
            <Zap size={16} color="#6366f1" /> Fire Stimulus
          </div>
          <button className="stimulus-close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="stimulus-body">
          <div className="stimulus-field">
            <label>Packet type</label>
            <input value={type} onChange={(e) => setType(e.target.value)} placeholder="GET, POST, QUERY…" />
          </div>
          <div className="stimulus-field">
            <label>Path / key</label>
            <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="/api/users" />
          </div>
          <div className="stimulus-field">
            <label>Origin node</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {nodeOptions.map((n) => (
                <option key={n.id} value={n.id}>{n.label} ({n.id})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="stimulus-footer">
          <button className="stimulus-cancel" onClick={onClose}>Cancel</button>
          <button className="stimulus-launch" onClick={launch} disabled={!from}>
            <Zap size={14} /> Launch
          </button>
        </div>
      </div>
    </div>
  );
}
