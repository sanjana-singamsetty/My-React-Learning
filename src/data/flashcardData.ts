export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  color: string;
}

export const flashcards: Flashcard[] = [
  // ── React Core ──
  { id: "r1", category: "React", color: "#8b5cf6",
    question: "What does useState return?",
    answer: "An array: [state, setState]. The current state value and a function to update it." },
  { id: "r2", category: "React", color: "#8b5cf6",
    question: "What is the virtual DOM?",
    answer: "An in-memory representation of the real DOM. React diffs old vs new and applies the minimal set of updates." },
  { id: "r3", category: "React", color: "#8b5cf6",
    question: "What is reconciliation?",
    answer: "React's algorithm to compare the old and new virtual DOM trees and compute the minimal DOM operations needed." },
  { id: "r4", category: "React", color: "#8b5cf6",
    question: "Why are list keys important?",
    answer: "Keys help React identify which items changed/added/removed, making list re-renders efficient." },
  { id: "r5", category: "React", color: "#8b5cf6",
    question: "What does React.memo do?",
    answer: "Wraps a component to skip re-rendering if props haven't changed (shallow comparison)." },

  // ── React Hooks ──
  { id: "h1", category: "Hooks", color: "#ec4899",
    question: "When does useEffect run?",
    answer: "After every render by default. Pass [] to run once on mount. Pass [dep] to run when dep changes." },
  { id: "h2", category: "Hooks", color: "#ec4899",
    question: "useCallback vs useMemo — difference?",
    answer: "useCallback memoizes a function reference. useMemo memoizes a computed value. Both take a deps array." },
  { id: "h3", category: "Hooks", color: "#ec4899",
    question: "What is useRef used for?",
    answer: "Access DOM elements directly, or persist a mutable value across renders without triggering a re-render." },
  { id: "h4", category: "Hooks", color: "#ec4899",
    question: "How to prevent an infinite loop in useEffect?",
    answer: "Always provide a dependency array. An empty [] runs only on mount. Missing deps cause infinite loops." },
  { id: "h5", category: "Hooks", color: "#ec4899",
    question: "What is useReducer good for?",
    answer: "Complex state logic where next state depends on action type. Alternative to useState with dispatch pattern." },
  { id: "h6", category: "Hooks", color: "#ec4899",
    question: "What problem does useContext solve?",
    answer: "Prop drilling — passes data deep through the tree without manually threading props at every level." },

  // ── Node & Express ──
  { id: "n1", category: "Node", color: "#10b981",
    question: "What is middleware in Express?",
    answer: "Functions with (req, res, next). Execute during the request–response cycle. Call next() to pass control." },
  { id: "n2", category: "Node", color: "#10b981",
    question: "app.use vs app.get — difference?",
    answer: "app.use matches all HTTP methods on a path. app.get only matches GET requests." },
  { id: "n3", category: "Node", color: "#10b981",
    question: "How to define a POST route in Express?",
    answer: "app.post('/path', (req, res) => { const body = req.body; res.json({ success: true }); })" },
  { id: "n4", category: "Node", color: "#10b981",
    question: "What are the 4 REST HTTP verbs and their meanings?",
    answer: "GET = read, POST = create, PUT/PATCH = update, DELETE = delete." },
  { id: "n5", category: "Node", color: "#10b981",
    question: "What does express.json() do?",
    answer: "Middleware that parses incoming JSON request bodies and makes them available on req.body." },

  // ── Database ──
  { id: "d1", category: "Database", color: "#06b6d4",
    question: "How to find all documents in a MongoDB collection?",
    answer: "Model.find({}) returns all. Model.find({ field: value }) filters by condition." },
  { id: "d2", category: "Database", color: "#06b6d4",
    question: "What is an ObjectId in MongoDB?",
    answer: "A 12-byte auto-generated unique identifier stored as the _id field on every document." },
  { id: "d3", category: "Database", color: "#06b6d4",
    question: "How to insert a new document with Mongoose?",
    answer: "const doc = new Model({ field: value }); await doc.save(); — or — await Model.create({ field: value });" },
  { id: "d4", category: "Database", color: "#06b6d4",
    question: "What is a Mongoose schema?",
    answer: "Blueprint that defines the shape and types of documents in a collection before creating a model." },

  // ── Testing & Auth ──
  { id: "t1", category: "Testing", color: "#f97316",
    question: "What is a JWT?",
    answer: "JSON Web Token — a signed, base64url-encoded token with Header.Payload.Signature used for stateless auth." },
  { id: "t2", category: "Testing", color: "#f97316",
    question: "Authentication vs Authorization — difference?",
    answer: "Authentication = verifying who you are (login). Authorization = verifying what you're allowed to do." },
  { id: "t3", category: "Testing", color: "#f97316",
    question: "What is unit testing?",
    answer: "Testing individual functions/components in isolation, with dependencies mocked." },
  { id: "t4", category: "Testing", color: "#f97316",
    question: "What does a CI/CD pipeline do?",
    answer: "Automates build, test, and deploy steps so code is continuously integrated and delivered with confidence." },

  // ── Networking ──
  { id: "net1", category: "Networking", color: "#f59e0b",
    question: "What happens during a TCP 3-way handshake?",
    answer: "SYN → SYN-ACK → ACK. Client initiates, server acknowledges, client confirms. Connection established." },
  { id: "net2", category: "Networking", color: "#f59e0b",
    question: "What is DNS?",
    answer: "Domain Name System — translates human-readable domain names (google.com) into IP addresses." },
  { id: "net3", category: "Networking", color: "#f59e0b",
    question: "HTTP status code groups: 2xx, 4xx, 5xx?",
    answer: "2xx = Success. 4xx = Client error (404 Not Found, 401 Unauthorized). 5xx = Server error." },
  { id: "net4", category: "Networking", color: "#f59e0b",
    question: "What is a subnet mask?",
    answer: "A number that divides an IP address into network and host portions (e.g., 255.255.255.0 = /24)." },
  { id: "net5", category: "Networking", color: "#f59e0b",
    question: "TCP vs UDP — key difference?",
    answer: "TCP is reliable, ordered, connection-based (slower). UDP is fast, connectionless, no delivery guarantee." },
];
