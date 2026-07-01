export type NodeType =
  | 'client' | 'server' | 'database' | 'cache'
  | 'auth' | 'queue' | 'loadbalancer' | 'cdn' | 'generic'
  | 'microservice' | 'gateway' | 'broker' | 'storage' | 'function' | 'proxy';

export type ActionType =
  | 'forward' | 'respond' | 'reject' | 'cache' | 'queue'
  | 'retry' | 'split' | 'merge' | 'load_balance'
  | 'rate_limit' | 'transform' | 'log';

export type TriggerType = 'on_receive' | 'on_timeout' | 'on_error' | 'on_connect' | 'on_threshold';
export type OperatorType = '==' | '!=' | '>' | '<' | 'contains';

export interface RuleCondition {
  property: string;
  operator: OperatorType;
  value: any;
}

export interface RuleAction {
  action: ActionType;
  to?: string | string[];
  withData?: Record<string, any>;
  delay?: number;
  edgeLabel?: string;
  maxAttempts?: number;
  waitFor?: number;
  rateLimit?: number;
  strategy?: 'round-robin' | 'random';
}

export interface BehaviorRule {
  id: string;
  trigger: TriggerType;
  condition?: RuleCondition;
  then: RuleAction;
  else?: RuleAction;
}

export interface SystemNodeData {
  label: string;
  nodeType: NodeType;
  properties: Record<string, any>;
  behaviors: BehaviorRule[];
  highlighted?: boolean;
  simStatus?: 'idle' | 'active' | 'error';
  onNodeClick?: (nodeId: string, nodeLabel: string, nodeData: SystemNodeData) => void;
  [key: string]: unknown;
}

export interface StimulusPacket {
  type: string;
  path: string;
  from: string;
  data?: Record<string, any>;
}

export interface PacketEvent {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  edgeId: string;
  packet: Record<string, any>;
  edgeLabel?: string;
  action: ActionType;
  simultaneous?: boolean;
}

export type SimStatus = 'idle' | 'running' | 'paused' | 'complete' | 'error';

export interface SimulationState {
  status: SimStatus;
  eventBatches: PacketEvent[][];
  currentBatch: number;
  speed: number;
}

export interface SDContext {
  currentNode: string;
  diagram: string;
  step: number;
  totalSteps: number;
  packet: Record<string, any>;
  ruleTriggered: string;
  history: string[];
}

export interface PrebuiltDiagramDef {
  id: string;
  name: string;
  description: string;
  color: string;
  nodes: any[];
  edges: any[];
  eventBatches: PacketEvent[][];
}
