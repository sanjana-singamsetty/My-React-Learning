import React from "react";
import { Play, Pause, SkipForward, RotateCcw, Zap } from "lucide-react";
import { SimStatus, PacketEvent } from "../../types/system-design";

interface Props {
  status: SimStatus;
  currentBatch: number;
  totalBatches: number;
  speed: number;
  currentEvents: PacketEvent[];
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (s: number) => void;
  onOpenStimulus?: () => void;
}

export default function SimulationControls({
  status,
  currentBatch,
  totalBatches,
  speed,
  currentEvents,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  onOpenStimulus,
}: Props) {
  const isIdle = status === "idle";
  const isRunning = status === "running";
  const isDone = status === "complete";

  return (
    <div className="sim-controls">
      <div className="sim-controls-left">
        {/* Run stimulus (custom canvas only) */}
        {onOpenStimulus && (
          <button className="sim-btn sim-btn-stimulus" onClick={onOpenStimulus} disabled={isRunning} title="Fire stimulus packet">
            <Zap size={15} /> Stimulus
          </button>
        )}

        <button className="sim-btn" onClick={onReset} title="Reset simulation">
          <RotateCcw size={15} />
        </button>

        {isRunning ? (
          <button className="sim-btn sim-btn-primary" onClick={onPause}>
            <Pause size={15} /> Pause
          </button>
        ) : (
          <button className="sim-btn sim-btn-primary" onClick={onPlay} disabled={isIdle && totalBatches === 0}>
            <Play size={15} /> {isDone ? "Replay" : "Play"}
          </button>
        )}

        <button className="sim-btn" onClick={onStep} disabled={isRunning || isDone} title="Step forward">
          <SkipForward size={15} /> Step
        </button>
      </div>

      <div className="sim-controls-center">
        <div className="sim-progress">
          <span className="sim-step-label">
            {isIdle && totalBatches === 0
              ? "Fire Stimulus to begin"
              : isIdle
              ? "Ready — click Play or Step"
              : isDone
              ? `✓ Complete — ${totalBatches} step${totalBatches !== 1 ? "s" : ""} simulated`
              : `Step ${currentBatch} / ${totalBatches}`}
          </span>
          {totalBatches > 0 && (
            <div className="sim-progress-bar">
              <div
                className="sim-progress-fill"
                style={{ width: `${(currentBatch / totalBatches) * 100}%` }}
              />
            </div>
          )}
        </div>

        {currentEvents.length > 0 && (
          <div className="sim-event-labels">
            {currentEvents.map((ev) => (
              <span key={ev.id} className={`sim-event-badge sim-event-${ev.action}`}>
                <b>{ev.fromNodeId}</b> → {ev.edgeLabel ?? ev.action} → <b>{ev.toNodeId}</b>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="sim-controls-right">
        <label className="sim-speed-label">Speed</label>
        <input
          type="range"
          min={0.25}
          max={3}
          step={0.25}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="sim-speed-slider"
        />
        <span className="sim-speed-val">{speed}×</span>
      </div>
    </div>
  );
}
