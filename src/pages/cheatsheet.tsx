import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BookMarked } from "lucide-react";
import "./cheatsheet.css";

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  color: string;
}

const snippets: Snippet[] = [
  {
    id: "useState",
    title: "useState",
    description: "Local state with initializer function for lazy init",
    language: "tsx",
    color: "#8b5cf6",
    code: `const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);

// Functional update (safe for prev-state deps)
setCount(prev => prev + 1);

// Lazy initializer (runs once)
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') || '[]'));`,
  },
  {
    id: "useEffect",
    title: "useEffect",
    description: "Side effects — mount, update, cleanup",
    language: "tsx",
    color: "#ec4899",
    code: `// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when userId changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Cleanup (e.g. subscriptions, timers)
useEffect(() => {
  const sub = socket.subscribe(handler);
  return () => sub.unsubscribe();
}, []);`,
  },
  {
    id: "useCallback",
    title: "useCallback & useMemo",
    description: "Memoize functions and computed values",
    language: "tsx",
    color: "#ec4899",
    code: `// Memoize a callback (stable ref across renders)
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize an expensive computed value
const filtered = useMemo(
  () => items.filter(i => i.active),
  [items]
);`,
  },
  {
    id: "useRef",
    title: "useRef",
    description: "DOM access + mutable values without re-render",
    language: "tsx",
    code: `const inputRef = useRef<HTMLInputElement>(null);
const prevValue = useRef(value);

// Focus DOM element
inputRef.current?.focus();

// Track prev value (no re-render)
useEffect(() => {
  prevValue.current = value;
});

<input ref={inputRef} />`,
    color: "#ec4899",
  },
  {
    id: "context",
    title: "Context API",
    description: "Share state without prop drilling",
    language: "tsx",
    color: "#8b5cf6",
    code: `// 1. Create
const ThemeCtx = createContext<Theme>('light');

// 2. Provide
<ThemeCtx.Provider value={theme}>
  {children}
</ThemeCtx.Provider>

// 3. Consume
const theme = useContext(ThemeCtx);

// 4. Custom hook pattern
export const useTheme = () => useContext(ThemeCtx);`,
  },
  {
    id: "express-route",
    title: "Express Routes",
    description: "REST endpoints with error handling",
    language: "javascript",
    color: "#10b981",
    code: `const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST create
router.post('/', async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

// PUT update
router.put('/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  res.json(item);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});`,
  },
  {
    id: "mongoose",
    title: "Mongoose Model",
    description: "Schema definition + common queries",
    language: "javascript",
    color: "#06b6d4",
    code: `const userSchema = new Schema({
  name:  { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Queries
await User.find({ active: true });
await User.findById(id);
await User.findByIdAndUpdate(id, { name: 'new' }, { new: true });
await User.findByIdAndDelete(id);
await User.create({ name: 'Sanjana', email: 'x@x.com' });`,
  },
  {
    id: "jwt",
    title: "JWT Auth",
    description: "Sign and verify JSON Web Tokens",
    language: "javascript",
    color: "#f97316",
    code: `import jwt from 'jsonwebtoken';

// Sign token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};`,
  },
  {
    id: "http-codes",
    title: "HTTP Status Codes",
    description: "Common codes to remember",
    language: "javascript",
    color: "#f59e0b",
    code: `200 OK              // Success
201 Created         // POST success
204 No Content      // DELETE success
301 Moved           // Permanent redirect
400 Bad Request     // Invalid input
401 Unauthorized    // Not authenticated
403 Forbidden       // Authenticated but no permission
404 Not Found       // Resource missing
409 Conflict        // Duplicate / unique constraint
422 Unprocessable   // Validation failed
429 Too Many Req    // Rate limited
500 Internal Error  // Server crash`,
  },
];

const CATS = [
  { label: "All", color: "#8b5cf6" },
  { label: "React", color: "#8b5cf6" },
  { label: "Node", color: "#10b981" },
  { label: "Database", color: "#06b6d4" },
  { label: "Auth", color: "#f97316" },
  { label: "Network", color: "#f59e0b" },
];

const categoryMap: Record<string, string[]> = {
  React: ["useState", "useEffect", "useCallback", "useRef", "context"],
  Node: ["express-route"],
  Database: ["mongoose"],
  Auth: ["jwt"],
  Network: ["http-codes"],
};

export default function CheatsheetPage() {
  const [active, setActive] = useState("All");

  const visible = active === "All"
    ? snippets
    : snippets.filter((s) => categoryMap[active]?.includes(s.id));

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(139,92,246,0.1)" }}>
            <BookMarked size={26} color="#8b5cf6" />
          </div>
          <div>
            <h1 className="page-title">Cheat Sheet</h1>
            <p className="page-desc">Quick reference for syntax you always forget</p>
          </div>
        </div>

        <div className="cs-cats">
          {CATS.map((c) => (
            <button
              key={c.label}
              className={`cs-cat-btn${active === c.label ? " active" : ""}`}
              style={active === c.label ? { background: c.color, borderColor: c.color } : {}}
              onClick={() => setActive(c.label)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="cs-grid">
          {visible.map((s) => (
            <div key={s.id} className="cs-card" style={{ "--cs-color": s.color } as React.CSSProperties}>
              <div className="cs-card-header">
                <span className="cs-title">{s.title}</span>
                <span className="cs-desc">{s.description}</span>
              </div>
              <div className="cs-code">
                <SyntaxHighlighter
                  style={oneLight}
                  language={s.language}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0 0 14px 14px",
                    fontSize: "0.82rem",
                    background: "#f8f6ff",
                    border: "none",
                  }}
                >
                  {s.code}
                </SyntaxHighlighter>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
