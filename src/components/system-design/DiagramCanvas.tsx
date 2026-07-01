import React, { useCallback, useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
  Node,
  Edge,
  EdgeTypes,
  Connection,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import SystemNodeComponent from "./SystemNodeComponent";
import AnimatedPacketEdge from "./AnimatedPacketEdge";
import { SystemNodeData, NodeType, PacketEvent, BehaviorRule } from "../../types/system-design";

const NODE_TYPES: NodeTypes = {
  client: SystemNodeComponent,
  server: SystemNodeComponent,
  database: SystemNodeComponent,
  cache: SystemNodeComponent,
  auth: SystemNodeComponent,
  queue: SystemNodeComponent,
  loadbalancer: SystemNodeComponent,
  cdn: SystemNodeComponent,
  generic: SystemNodeComponent,
  microservice: SystemNodeComponent,
  gateway: SystemNodeComponent,
  broker: SystemNodeComponent,
  storage: SystemNodeComponent,
  function: SystemNodeComponent,
  proxy: SystemNodeComponent,
};

const EDGE_TYPES: EdgeTypes = {
  packet: AnimatedPacketEdge,
};

const ARROW = { type: MarkerType.ArrowClosed, width: 16, height: 16 };

export interface DiagramCanvasHandle {
  getNodes: () => Node[];
  getEdges: () => Edge[];
  updateNodeBehaviors: (nodeId: string, behaviors: BehaviorRule[]) => void;
}

interface Props {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  resetKey?: string; // change to reinitialize canvas (used for pre-built diagram switching)
  activeEventBatch?: PacketEvent[];
  activeNodeIds?: string[];
  onNodeSelect?: (nodeId: string, nodeLabel: string, nodeData: SystemNodeData) => void;
  readOnly?: boolean;
}

const DiagramCanvas = forwardRef<DiagramCanvasHandle, Props>(function DiagramCanvas(
  {
    initialNodes = [],
    initialEdges = [],
    resetKey,
    activeEventBatch = [],
    activeNodeIds = [],
    onNodeSelect,
    readOnly = false,
  },
  ref
) {
  const { screenToFlowPosition } = useReactFlow();
  const dragTypeRef = useRef<NodeType | null>(null);
  const onNodeSelectRef = useRef(onNodeSelect);
  onNodeSelectRef.current = onNodeSelect;

  const makeOnClick = useCallback(
    () => (nId: string, nLabel: string, nData: SystemNodeData) =>
      onNodeSelectRef.current?.(nId, nLabel, nData),
    []
  );

  const enrichInitial = (rawNodes: Node[]) =>
    rawNodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        simStatus: "idle" as const,
        onNodeClick: makeOnClick(),
      } as SystemNodeData,
    }));

  const [nodes, setNodes, onNodesChange] = useNodesState(enrichInitial(initialNodes));
  const initEdge = (e: Edge) => ({
    ...e,
    type: "packet",
    animated: false,
    markerEnd: { ...ARROW, color: "#94a3b8" },
    style: { stroke: "#94a3b8" as string, strokeWidth: 1.5 },
  });

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges.map(initEdge));

  // Expose imperative handle for parent to read nodes/edges and update behaviors
  useImperativeHandle(ref, () => ({
    getNodes: () => nodes,
    getEdges: () => edges,
    updateNodeBehaviors: (nodeId: string, behaviors: BehaviorRule[]) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...(n.data as SystemNodeData), behaviors } as SystemNodeData }
            : n
        )
      );
    },
  }));

  // Reinitialize when resetKey changes (pre-built diagram switch)
  React.useEffect(() => {
    if (resetKey === undefined) return;
    setNodes(enrichInitial(initialNodes));
    setEdges(initialEdges.map(initEdge));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // Sync sim-status highlights
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          simStatus: activeNodeIds.includes(n.id) ? ("active" as const) : ("idle" as const),
          onNodeClick: makeOnClick(),
        } as SystemNodeData,
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNodeIds]);

  // Switch active edges to animated packet edge type with moving dot
  React.useEffect(() => {
    const activeEdgeIds = new Set(activeEventBatch.map((ev) => ev.edgeId).filter(Boolean));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setEdges((eds: any[]) =>
      eds.map((e: any) => {
        const isActive = activeEdgeIds.has(e.id);
        const activeEvent = isActive ? activeEventBatch.find((ev) => ev.edgeId === e.id) : undefined;
        return {
          ...e,
          type: "packet",
          animated: isActive,
          style: {
            stroke: isActive ? "#6366f1" : "#94a3b8",
            strokeWidth: isActive ? 2.5 : 1.5,
          },
          label: isActive ? (activeEvent?.edgeLabel ?? e.label) : e.label,
          markerEnd: {
            ...ARROW,
            color: isActive ? "#6366f1" : "#94a3b8",
          },
        };
      }) as any
    );
  }, [activeEventBatch, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (readOnly) return;
      setEdges((eds) =>
        addEdge(
          initEdge({ ...connection, id: `e-${connection.source}-${connection.target}-${Date.now()}` } as Edge),
          eds
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setEdges, readOnly]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const nodeType = (e.dataTransfer.getData("application/nodeType") || dragTypeRef.current) as NodeType;
      if (!nodeType) return;

      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const id = `${nodeType}-${Date.now()}`;
      setNodes((nds) => [
        ...nds,
        {
          id,
          type: nodeType,
          position,
          data: {
            label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
            nodeType,
            properties: {},
            behaviors: [],
            simStatus: "idle" as const,
            onNodeClick: makeOnClick(),
          } as SystemNodeData,
        },
      ]);
    },
    [screenToFlowPosition, setNodes, makeOnClick]
  );

  const miniMapNodeColor = useMemo(() => {
    const cfg: Record<string, string> = {
      client: "#6366f1", server: "#10b981", database: "#f59e0b",
      cache: "#8b5cf6", auth: "#ef4444", queue: "#f97316",
      loadbalancer: "#06b6d4", cdn: "#84cc16", generic: "#6b7280",
    };
    return (n: Node) => cfg[n.type ?? "generic"] ?? "#6b7280";
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 480 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-right"
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
      >
        <Background gap={20} color="#e2e8f0" />
        <Controls showInteractive={!readOnly} />
        <MiniMap nodeColor={miniMapNodeColor} />
      </ReactFlow>
    </div>
  );
});

export default DiagramCanvas;
export { NODE_TYPES };
