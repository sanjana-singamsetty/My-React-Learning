import React, { useState, useCallback, useRef, useEffect } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { useNavigate } from "react-router-dom";
import { GitBranch, Cpu, ArrowLeft } from "lucide-react";
import DiagramCanvas, { DiagramCanvasHandle } from "../components/system-design/DiagramCanvas";
import NodePalette from "../components/system-design/NodePalette";
import BehaviorEditor from "../components/system-design/BehaviorEditor";
import SimulationControls from "../components/system-design/SimulationControls";
import StimulusLauncher from "../components/system-design/StimulusLauncher";
import { SimulationEngine } from "../components/system-design/SimulationEngine";
import { PREBUILT_DIAGRAMS } from "../components/system-design/prebuilt/PrebuiltDiagrams";
import { useSystemDesign } from "../context/SystemDesignContext";
import {
  PacketEvent,
  SimStatus,
  StimulusPacket,
  BehaviorRule,
  PrebuiltDiagramDef,
  SystemNodeData,
} from "../types/system-design";
import "../components/system-design/SystemDesign.css";

// ──────────────────────────────────────────
// Inner component (needs ReactFlowProvider context)
// ──────────────────────────────────────────
function SystemDesignInner() {
  const { setSdContext } = useSystemDesign();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"prebuilt" | "custom">("prebuilt");

  // Pre-built state
  const [selectedDiagram, setSelectedDiagram] = useState<PrebuiltDiagramDef | null>(null);
  const prebuiltCanvasRef = useRef<DiagramCanvasHandle>(null);

  // Custom canvas state
  const customCanvasRef = useRef<DiagramCanvasHandle>(null);
  const [hasCustomNodes, setHasCustomNodes] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<SystemNodeData | null>(null);
  const [showStimulus, setShowStimulus] = useState(false);
  const [customNodeOptions, setCustomNodeOptions] = useState<{ id: string; label: string }[]>([]);

  // Shared simulation state
  const [eventBatches, setEventBatches] = useState<PacketEvent[][]>([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [simStatus, setSimStatus] = useState<SimStatus>("idle");
  const [speed, setSpeed] = useState(1);
  const simTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentEvents = eventBatches[currentBatch - 1] ?? [];
  const activeNodeIds = currentEvents.flatMap((ev) => [ev.fromNodeId, ev.toNodeId]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); simStatus === "running" ? handlePause() : handlePlay(); }
      if (e.code === "ArrowRight") { e.preventDefault(); handleStep(); }
      if (e.code === "KeyR") { e.preventDefault(); handleReset(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simStatus, currentBatch, eventBatches, speed]);

  // ── Auto-advance during play ──
  useEffect(() => {
    if (simStatus !== "running") return;
    const delay = 2000 / speed;

    simTimerRef.current = setTimeout(() => {
      setCurrentBatch((prev) => {
        const next = prev + 1;
        if (next > eventBatches.length) {
          setSimStatus("complete");
          return prev;
        }
        return next;
      });
    }, delay);

    return () => { if (simTimerRef.current) clearTimeout(simTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simStatus, currentBatch, eventBatches.length, speed]);

  // ── Update AI context when batch advances ──
  useEffect(() => {
    if (currentBatch === 0 || currentEvents.length === 0) return;
    const ev = currentEvents[0];
    setSdContext({
      currentNode: ev.toNodeId,
      diagram: selectedDiagram?.name ?? "Custom Diagram",
      step: currentBatch,
      totalSteps: eventBatches.length,
      packet: ev.packet,
      ruleTriggered: ev.edgeLabel ?? ev.action,
      history: eventBatches.slice(0, currentBatch).flatMap((b) => b.map((e) => e.fromNodeId)),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBatch]);

  // ── Sim controls ──
  const handlePlay = () => {
    if (simStatus === "complete") { setCurrentBatch(0); setSimStatus("running"); return; }
    if (simStatus === "idle" && eventBatches.length === 0) return;
    setSimStatus("running");
  };

  const handlePause = () => setSimStatus("paused");

  const handleStep = () => {
    if (simStatus === "running") return;
    setCurrentBatch((prev) => {
      const next = prev + 1;
      if (next > eventBatches.length) { setSimStatus("complete"); return prev; }
      setSimStatus("paused");
      return next;
    });
  };

  const handleReset = () => {
    if (simTimerRef.current) clearTimeout(simTimerRef.current);
    setCurrentBatch(0);
    setSimStatus("idle");
    setSdContext(null);
  };

  // ── Pre-built diagram selection ──
  const selectDiagram = (diagram: PrebuiltDiagramDef) => {
    handleReset();
    setSelectedDiagram(diagram);
    setEventBatches(diagram.eventBatches);
  };

  // ── Custom canvas: stimulus launch ──
  const launchStimulus = (stimulus: StimulusPacket) => {
    handleReset();
    const nodes = customCanvasRef.current?.getNodes() ?? [];
    const edges = customCanvasRef.current?.getEdges() ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const engine = new SimulationEngine(nodes as any, edges);
    const batches = engine.simulate(stimulus);
    setEventBatches(batches);
    setSimStatus(batches.length > 0 ? "paused" : "error");
    setCurrentBatch(0);
  };

  // ── Custom canvas: node clicked ──
  const handleNodeSelect = useCallback((nodeId: string, nodeLabel: string, nodeData: SystemNodeData) => {
    setSelectedNodeId(nodeId);
    setSelectedNodeData(nodeData);

    // Refresh node options list from canvas
    const allNodes = customCanvasRef.current?.getNodes() ?? [];
    setCustomNodeOptions(allNodes.map((n) => ({ id: n.id, label: (n.data as SystemNodeData).label })));

    if (simStatus !== "idle" && currentEvents.length > 0) {
      const ev = currentEvents.find((e) => e.toNodeId === nodeId || e.fromNodeId === nodeId);
      if (ev) {
        setSdContext({
          currentNode: nodeLabel,
          diagram: selectedDiagram?.name ?? "Custom Diagram",
          step: currentBatch,
          totalSteps: eventBatches.length,
          packet: ev.packet,
          ruleTriggered: ev.edgeLabel ?? ev.action,
          history: [],
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simStatus, currentEvents, selectedDiagram, currentBatch, eventBatches.length]);

  // ── Custom canvas: behavior rule edits ──
  const handleRulesChange = useCallback((nodeId: string, rules: BehaviorRule[]) => {
    customCanvasRef.current?.updateNodeBehaviors(nodeId, rules);
    if (nodeId === selectedNodeId && selectedNodeData) {
      setSelectedNodeData({ ...selectedNodeData, behaviors: rules });
    }
  }, [selectedNodeId, selectedNodeData]);

  // Called when user drops a new node — refresh node list
  const handleNodeDrop = useCallback(() => {
    setTimeout(() => {
      const allNodes = customCanvasRef.current?.getNodes() ?? [];
      setHasCustomNodes(allNodes.length > 0);
      setCustomNodeOptions(allNodes.map((n) => ({ id: n.id, label: (n.data as SystemNodeData).label })));
    }, 50);
  }, []);

  return (
    <div className="sd-fullpage">
      {/* Compact top bar — replaces sidebar + page header */}
      <div className="sd-topbar">
        <button className="sd-back-btn" onClick={() => navigate(-1)} title="Back">
          <ArrowLeft size={18} />
        </button>
        <div className="sd-topbar-brand">
          <GitBranch size={17} color="#6366f1" />
          <span className="sd-topbar-title">System Design</span>
        </div>
        <div className="sd-topbar-sep" />
        <div className="sd-topbar-tabs">
          <button
            className={`sd-tab${tab === "prebuilt" ? " sd-tab-active" : ""}`}
            onClick={() => { setTab("prebuilt"); handleReset(); }}
          >
            Pre-built Diagrams
          </button>
          <button
            className={`sd-tab${tab === "custom" ? " sd-tab-active" : ""}`}
            onClick={() => { setTab("custom"); handleReset(); }}
          >
            Custom Canvas
          </button>
        </div>
        <span className="sd-tab-hint">Space = play/pause · → = step · R = reset</span>
      </div>

      <main className="sd-page">

        {/* ── PRE-BUILT TAB ── */}
        {tab === "prebuilt" && (
          <div className="sd-prebuilt">
            <div className="sd-diagram-cards">
              {PREBUILT_DIAGRAMS.map((d) => (
                <button
                  key={d.id}
                  className={`sd-diagram-card${selectedDiagram?.id === d.id ? " sd-diagram-card-active" : ""}`}
                  style={{ borderColor: selectedDiagram?.id === d.id ? d.color : "transparent" }}
                  onClick={() => selectDiagram(d)}
                >
                  <div className="sd-card-dot" style={{ background: d.color }} />
                  <div className="sd-card-text">
                    <span className="sd-card-name">{d.name}</span>
                    <span className="sd-card-desc">{d.description}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedDiagram ? (
              <div className="sd-canvas-area">
                <SimulationControls
                  status={simStatus}
                  currentBatch={currentBatch}
                  totalBatches={eventBatches.length}
                  speed={speed}
                  currentEvents={currentEvents}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onStep={handleStep}
                  onReset={handleReset}
                  onSpeedChange={setSpeed}
                />
                <div className="sd-canvas-wrap">
                  <DiagramCanvas
                    ref={prebuiltCanvasRef}
                    initialNodes={selectedDiagram.nodes}
                    initialEdges={selectedDiagram.edges}
                    resetKey={selectedDiagram.id}
                    activeEventBatch={currentEvents}
                    activeNodeIds={activeNodeIds}
                    onNodeSelect={handleNodeSelect}
                  />
                </div>
              </div>
            ) : (
              <div className="sd-empty-state">
                <Cpu size={40} color="#94a3b8" />
                <p>Select a diagram above to start simulating.</p>
              </div>
            )}
          </div>
        )}

        {/* ── CUSTOM CANVAS TAB ── */}
        {tab === "custom" && (
          <div className="sd-custom">
            <div className="sd-custom-layout">
              <NodePalette />

              <div className="sd-canvas-area sd-canvas-grow">
                <SimulationControls
                  status={simStatus}
                  currentBatch={currentBatch}
                  totalBatches={eventBatches.length}
                  speed={speed}
                  currentEvents={currentEvents}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onStep={handleStep}
                  onReset={handleReset}
                  onSpeedChange={setSpeed}
                  onOpenStimulus={() => setShowStimulus(true)}
                />
                <div
                  className={`sd-canvas-wrap${!hasCustomNodes ? " sd-canvas-empty-overlay" : ""}`}
                  onDrop={handleNodeDrop}
                >
                  <DiagramCanvas
                    ref={customCanvasRef}
                    activeEventBatch={currentEvents}
                    activeNodeIds={activeNodeIds}
                    onNodeSelect={handleNodeSelect}
                  />
                  {!hasCustomNodes && (
                    <div className="sd-canvas-empty-hint">
                      <Cpu size={32} color="#cbd5e1" />
                      <p>Drag nodes from the palette onto this canvas.</p>
                    </div>
                  )}
                </div>
              </div>

              <BehaviorEditor
                nodeId={selectedNodeId ?? ""}
                nodeLabel={selectedNodeData?.label ?? ""}
                rules={selectedNodeData?.behaviors ?? []}
                availableTargets={customNodeOptions.filter((n) => n.id !== selectedNodeId)}
                onChange={handleRulesChange}
              />
            </div>

            <StimulusLauncher
              isOpen={showStimulus}
              nodeOptions={customNodeOptions}
              onLaunch={launchStimulus}
              onClose={() => setShowStimulus(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

// ──────────────────────────────────────────
// Wrapped export — ReactFlowProvider required for useReactFlow
// ──────────────────────────────────────────
export default function SystemDesign() {
  return (
    <ReactFlowProvider>
      <SystemDesignInner />
    </ReactFlowProvider>
  );
}
