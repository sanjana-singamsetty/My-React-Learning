import { PrebuiltDiagramDef, PacketEvent } from "../../../types/system-design";
import { MarkerType } from "@xyflow/react";

const ARROW = { type: MarkerType.ArrowClosed, width: 18, height: 18 };

// ──────────────────────────────────────────
// HTTP REQUEST FLOW
// ──────────────────────────────────────────
const httpNodes = [
  { id: "browser", type: "client", position: { x: 60, y: 180 }, data: { label: "Browser", nodeType: "client", properties: { protocol: "HTTPS" }, behaviors: [] } },
  { id: "dns", type: "server", position: { x: 260, y: 80 }, data: { label: "DNS Resolver", nodeType: "server", properties: { type: "UDP/53" }, behaviors: [] } },
  { id: "server", type: "server", position: { x: 460, y: 180 }, data: { label: "App Server", nodeType: "server", properties: { port: 3000 }, behaviors: [] } },
  { id: "cache", type: "cache", position: { x: 660, y: 80 }, data: { label: "Redis Cache", nodeType: "cache", properties: { TTL: "60s" }, behaviors: [] } },
  { id: "db", type: "database", position: { x: 860, y: 180 }, data: { label: "PostgreSQL", nodeType: "database", properties: { port: 5432 }, behaviors: [] } },
];

const httpEdges = [
  { id: "e-br-dns", source: "browser", target: "dns", markerEnd: ARROW, label: "DNS lookup" },
  { id: "e-br-srv", source: "browser", target: "server", markerEnd: ARROW, label: "TCP + HTTP" },
  { id: "e-srv-cache", source: "server", target: "cache", markerEnd: ARROW, label: "cache check" },
  { id: "e-cache-db", source: "cache", target: "db", markerEnd: ARROW, label: "cache miss" },
  { id: "e-db-cache", source: "db", target: "cache", markerEnd: ARROW, label: "DB result" },
  { id: "e-cache-srv", source: "cache", target: "server", markerEnd: ARROW, label: "data ready" },
  { id: "e-srv-br", source: "server", target: "browser", markerEnd: ARROW, label: "200 OK" },
];

const httpEvents: PacketEvent[][] = [
  [{ id: "h1", fromNodeId: "browser", toNodeId: "dns", edgeId: "e-br-dns", packet: { query: "api.example.com" }, edgeLabel: "DNS lookup", action: "forward" }],
  [{ id: "h2", fromNodeId: "browser", toNodeId: "server", edgeId: "e-br-srv", packet: { method: "GET", path: "/api/users" }, edgeLabel: "GET /api/users", action: "forward" }],
  [{ id: "h3", fromNodeId: "server", toNodeId: "cache", edgeId: "e-srv-cache", packet: { key: "users-list" }, edgeLabel: "check cache", action: "forward" }],
  [{ id: "h4", fromNodeId: "cache", toNodeId: "db", edgeId: "e-cache-db", packet: { table: "users", query: "SELECT *" }, edgeLabel: "cache miss → query DB", action: "forward" }],
  [{ id: "h5", fromNodeId: "db", toNodeId: "cache", edgeId: "e-db-cache", packet: { rows: 42 }, edgeLabel: "42 rows returned", action: "respond" }],
  [{ id: "h6", fromNodeId: "cache", toNodeId: "server", edgeId: "e-cache-srv", packet: { rows: 42, cached: true }, edgeLabel: "cached ✓", action: "respond" }],
  [{ id: "h7", fromNodeId: "server", toNodeId: "browser", edgeId: "e-srv-br", packet: { status: 200, body: "[42 users]" }, edgeLabel: "200 OK", action: "respond" }],
];

// ──────────────────────────────────────────
// REACT COMPONENT LIFECYCLE
// ──────────────────────────────────────────
const reactNodes = [
  { id: "mount", type: "client", position: { x: 60, y: 180 }, data: { label: "Mount Trigger", nodeType: "client", properties: { event: "render()" }, behaviors: [] } },
  { id: "render", type: "server", position: { x: 260, y: 80 }, data: { label: "Render Phase", nodeType: "server", properties: { type: "virtual DOM" }, behaviors: [] } },
  { id: "commit", type: "server", position: { x: 460, y: 180 }, data: { label: "Commit Phase", nodeType: "server", properties: { target: "real DOM" }, behaviors: [] } },
  { id: "effect", type: "cache", position: { x: 660, y: 80 }, data: { label: "useEffect", nodeType: "cache", properties: { deps: "[]" }, behaviors: [] } },
  { id: "state", type: "database", position: { x: 860, y: 180 }, data: { label: "State Update", nodeType: "database", properties: { trigger: "setState()" }, behaviors: [] } },
  { id: "unmount", type: "auth", position: { x: 660, y: 280 }, data: { label: "Cleanup / Unmount", nodeType: "auth", properties: { return: "fn()" }, behaviors: [] } },
];

const reactEdges = [
  { id: "re-mt-rn", source: "mount", target: "render", markerEnd: ARROW, label: "initial render" },
  { id: "re-rn-cm", source: "render", target: "commit", markerEnd: ARROW, label: "diff + patch DOM" },
  { id: "re-cm-ef", source: "commit", target: "effect", markerEnd: ARROW, label: "after paint" },
  { id: "re-ef-st", source: "effect", target: "state", markerEnd: ARROW, label: "fetch / setState" },
  { id: "re-st-rn", source: "state", target: "render", markerEnd: ARROW, label: "re-render" },
  { id: "re-ef-um", source: "effect", target: "unmount", markerEnd: ARROW, label: "component removed" },
];

const reactEvents: PacketEvent[][] = [
  [{ id: "r1", fromNodeId: "mount", toNodeId: "render", edgeId: "re-mt-rn", packet: { props: "{name:'Alice'}" }, edgeLabel: "initial render", action: "forward" }],
  [{ id: "r2", fromNodeId: "render", toNodeId: "commit", edgeId: "re-rn-cm", packet: { vdom: "diffed" }, edgeLabel: "diff → patch real DOM", action: "forward" }],
  [{ id: "r3", fromNodeId: "commit", toNodeId: "effect", edgeId: "re-cm-ef", packet: { painted: true }, edgeLabel: "after browser paint", action: "forward" }],
  [{ id: "r4", fromNodeId: "effect", toNodeId: "state", edgeId: "re-ef-st", packet: { fetch: "/api/data" }, edgeLabel: "fetch data → setState", action: "forward" }],
  [{ id: "r5", fromNodeId: "state", toNodeId: "render", edgeId: "re-st-rn", packet: { data: "[...]", rerender: true }, edgeLabel: "state changed → re-render", action: "forward" }],
  [{ id: "r6", fromNodeId: "effect", toNodeId: "unmount", edgeId: "re-ef-um", packet: { cleanup: "cancel fetch" }, edgeLabel: "cleanup fn runs", action: "forward" }],
];

// ──────────────────────────────────────────
// AUTH FLOW — JWT
// ──────────────────────────────────────────
const authNodes = [
  { id: "client", type: "client", position: { x: 60, y: 200 }, data: { label: "Client App", nodeType: "client", properties: { storage: "memory" }, behaviors: [] } },
  { id: "authsrv", type: "auth", position: { x: 300, y: 200 }, data: { label: "Auth Server", nodeType: "auth", properties: { algo: "RS256" }, behaviors: [] } },
  { id: "db2", type: "database", position: { x: 540, y: 80 }, data: { label: "User DB", nodeType: "database", properties: { table: "users" }, behaviors: [] } },
  { id: "apigw", type: "server", position: { x: 540, y: 320 }, data: { label: "API Gateway", nodeType: "server", properties: { port: 443 }, behaviors: [] } },
  { id: "middleware", type: "auth", position: { x: 780, y: 200 }, data: { label: "JWT Middleware", nodeType: "auth", properties: { verify: "public key" }, behaviors: [] } },
  { id: "resource", type: "server", position: { x: 1020, y: 200 }, data: { label: "Protected Route", nodeType: "server", properties: { auth: "required" }, behaviors: [] } },
];

const authEdges = [
  { id: "ae-cl-as", source: "client", target: "authsrv", markerEnd: ARROW, label: "POST /login" },
  { id: "ae-as-db", source: "authsrv", target: "db2", markerEnd: ARROW, label: "verify credentials" },
  { id: "ae-db-as", source: "db2", target: "authsrv", markerEnd: ARROW, label: "user found ✓" },
  { id: "ae-as-cl", source: "authsrv", target: "client", markerEnd: ARROW, label: "JWT token" },
  { id: "ae-cl-gw", source: "client", target: "apigw", markerEnd: ARROW, label: "GET /data + Bearer" },
  { id: "ae-gw-mw", source: "apigw", target: "middleware", markerEnd: ARROW, label: "forward + token" },
  { id: "ae-mw-rs", source: "middleware", target: "resource", markerEnd: ARROW, label: "authorized ✓" },
  { id: "ae-rs-cl", source: "resource", target: "client", markerEnd: ARROW, label: "200 Protected Data" },
];

const authEvents: PacketEvent[][] = [
  [{ id: "a1", fromNodeId: "client", toNodeId: "authsrv", edgeId: "ae-cl-as", packet: { email: "alice@dev.io", password: "***" }, edgeLabel: "POST /login", action: "forward" }],
  [{ id: "a2", fromNodeId: "authsrv", toNodeId: "db2", edgeId: "ae-as-db", packet: { lookup: "alice@dev.io" }, edgeLabel: "verify credentials", action: "forward" }],
  [{ id: "a3", fromNodeId: "db2", toNodeId: "authsrv", edgeId: "ae-db-as", packet: { userId: 42, role: "admin" }, edgeLabel: "user found ✓", action: "respond" }],
  [{ id: "a4", fromNodeId: "authsrv", toNodeId: "client", edgeId: "ae-as-cl", packet: { token: "eyJhbG...", expiresIn: "1h" }, edgeLabel: "JWT token issued", action: "respond" }],
  [{ id: "a5", fromNodeId: "client", toNodeId: "apigw", edgeId: "ae-cl-gw", packet: { path: "/data", bearer: "eyJhbG..." }, edgeLabel: "GET /data + Bearer token", action: "forward" }],
  [{ id: "a6", fromNodeId: "apigw", toNodeId: "middleware", edgeId: "ae-gw-mw", packet: { token: "eyJhbG...", path: "/data" }, edgeLabel: "forward + verify token", action: "forward" }],
  [{ id: "a7", fromNodeId: "middleware", toNodeId: "resource", edgeId: "ae-mw-rs", packet: { userId: 42, role: "admin", authorized: true }, edgeLabel: "authorized ✓", action: "forward" }],
  [{ id: "a8", fromNodeId: "resource", toNodeId: "client", edgeId: "ae-rs-cl", packet: { status: 200, data: "[protected]" }, edgeLabel: "200 Protected Data", action: "respond" }],
];

// ──────────────────────────────────────────
// MICROSERVICES ARCHITECTURE
// ──────────────────────────────────────────
const msNodes = [
  { id: "ms-cl",    type: "client",       position: { x: 60,  y: 220 }, data: { label: "Client App",      nodeType: "client",       properties: { protocol: "HTTPS" },     behaviors: [] } },
  { id: "ms-gw",    type: "gateway",      position: { x: 260, y: 220 }, data: { label: "API Gateway",     nodeType: "gateway",      properties: { port: 443 },             behaviors: [] } },
  { id: "ms-auth",  type: "auth",         position: { x: 460, y: 80  }, data: { label: "Auth Service",    nodeType: "auth",         properties: { algo: "JWT/RS256" },     behaviors: [] } },
  { id: "ms-ord",   type: "microservice", position: { x: 460, y: 220 }, data: { label: "Order Service",   nodeType: "microservice", properties: { lang: "Node.js" },       behaviors: [] } },
  { id: "ms-user",  type: "microservice", position: { x: 460, y: 380 }, data: { label: "User Service",    nodeType: "microservice", properties: { lang: "Go" },            behaviors: [] } },
  { id: "ms-odb",   type: "database",     position: { x: 680, y: 220 }, data: { label: "Orders DB",       nodeType: "database",     properties: { type: "PostgreSQL" },    behaviors: [] } },
  { id: "ms-udb",   type: "database",     position: { x: 680, y: 380 }, data: { label: "Users DB",        nodeType: "database",     properties: { type: "MongoDB" },       behaviors: [] } },
  { id: "ms-brk",   type: "broker",       position: { x: 680, y: 80  }, data: { label: "Message Broker",  nodeType: "broker",       properties: { type: "Kafka" },         behaviors: [] } },
  { id: "ms-notif", type: "function",     position: { x: 900, y: 80  }, data: { label: "Notif Function",  nodeType: "function",     properties: { trigger: "event" },      behaviors: [] } },
];

const msEdges = [
  { id: "me-cl-gw",   source: "ms-cl",   target: "ms-gw",   markerEnd: ARROW, label: "POST /orders" },
  { id: "me-gw-auth", source: "ms-gw",   target: "ms-auth", markerEnd: ARROW, label: "verify JWT" },
  { id: "me-auth-gw", source: "ms-auth", target: "ms-gw",   markerEnd: ARROW, label: "authorized ✓" },
  { id: "me-gw-ord",  source: "ms-gw",   target: "ms-ord",  markerEnd: ARROW, label: "route request" },
  { id: "me-gw-usr",  source: "ms-gw",   target: "ms-user", markerEnd: ARROW, label: "GET /profile" },
  { id: "me-ord-db",  source: "ms-ord",  target: "ms-odb",  markerEnd: ARROW, label: "INSERT order" },
  { id: "me-ord-brk", source: "ms-ord",  target: "ms-brk",  markerEnd: ARROW, label: "order.created" },
  { id: "me-usr-db",  source: "ms-user", target: "ms-udb",  markerEnd: ARROW, label: "SELECT user" },
  { id: "me-brk-fn",  source: "ms-brk",  target: "ms-notif",markerEnd: ARROW, label: "push event" },
];

const msEvents: PacketEvent[][] = [
  [{ id: "m1", fromNodeId: "ms-cl",   toNodeId: "ms-gw",   edgeId: "me-cl-gw",   packet: { method: "POST", path: "/orders" },       edgeLabel: "POST /orders",       action: "forward" }],
  [{ id: "m2", fromNodeId: "ms-gw",   toNodeId: "ms-auth", edgeId: "me-gw-auth", packet: { token: "eyJ..." },                        edgeLabel: "verify JWT",         action: "forward" }],
  [{ id: "m3", fromNodeId: "ms-auth", toNodeId: "ms-gw",   edgeId: "me-auth-gw", packet: { userId: 7, role: "user" },                edgeLabel: "authorized ✓",       action: "respond" }],
  [{ id: "m4", fromNodeId: "ms-gw",   toNodeId: "ms-ord",  edgeId: "me-gw-ord",  packet: { order: { item: "laptop", qty: 1 } },      edgeLabel: "route to Order Svc", action: "forward" },
   { id: "m5", fromNodeId: "ms-gw",   toNodeId: "ms-user", edgeId: "me-gw-usr",  packet: { userId: 7 },                              edgeLabel: "GET /profile",       action: "forward" }],
  [{ id: "m6", fromNodeId: "ms-ord",  toNodeId: "ms-odb",  edgeId: "me-ord-db",  packet: { table: "orders", op: "INSERT" },          edgeLabel: "INSERT order",       action: "forward" },
   { id: "m7", fromNodeId: "ms-user", toNodeId: "ms-udb",  edgeId: "me-usr-db",  packet: { table: "users", op: "SELECT" },           edgeLabel: "SELECT user",        action: "forward" }],
  [{ id: "m8", fromNodeId: "ms-ord",  toNodeId: "ms-brk",  edgeId: "me-ord-brk", packet: { event: "order.created", orderId: 9912 },  edgeLabel: "publish event",      action: "forward" }],
  [{ id: "m9", fromNodeId: "ms-brk",  toNodeId: "ms-notif",edgeId: "me-brk-fn",  packet: { type: "email", to: "user@dev.io" },       edgeLabel: "push notification",  action: "forward" }],
];

// ──────────────────────────────────────────
// EXPORTED DEFINITIONS
// ──────────────────────────────────────────
export const PREBUILT_DIAGRAMS: PrebuiltDiagramDef[] = [
  {
    id: "http",
    name: "HTTP Request Flow",
    description: "From browser to DNS, server, cache, and database — with a full response journey back.",
    color: "#6366f1",
    nodes: httpNodes,
    edges: httpEdges,
    eventBatches: httpEvents,
  },
  {
    id: "react-lifecycle",
    name: "React Component Lifecycle",
    description: "Mount → render → commit → useEffect → state update → re-render → cleanup.",
    color: "#10b981",
    nodes: reactNodes,
    edges: reactEdges,
    eventBatches: reactEvents,
  },
  {
    id: "auth-jwt",
    name: "Auth Flow — JWT",
    description: "Login → token issuance → protected request → JWT middleware → authorized response.",
    color: "#f59e0b",
    nodes: authNodes,
    edges: authEdges,
    eventBatches: authEvents,
  },
  {
    id: "microservices",
    name: "Microservices Architecture",
    description: "Client → API Gateway → Auth + Order + User services → DBs + Kafka broker → serverless notif.",
    color: "#7c3aed",
    nodes: msNodes,
    edges: msEdges,
    eventBatches: msEvents,
  },
];
