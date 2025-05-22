---
# How to use React Router in React with TypeScript
---

## 1. Install React Router packages

```bash
npm install react-router-dom
```

If you want type definitions explicitly (mostly auto-included nowadays):

```bash
npm install --save-dev @types/react-router-dom
```

---

## 2. Basic setup

Here’s a minimal example with **React Router v6** (latest version):

```tsx
// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

// Home component
const Home: React.FC = () => <h2>Home Page</h2>;

// About component
const About: React.FC = () => <h2>About Page</h2>;

// User component with route param
const User: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // type the route params here!
  return <h2>User ID: {id}</h2>;
};

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        {/* Navigation links */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/user/42">User 42</Link>
      </nav>

      {/* Routes declaration */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

## Explanation:

- **`BrowserRouter`**: Wraps your app to enable routing with clean URLs.
- **`Routes`**: Contains all your route definitions (replaced the older `Switch`).
- **`Route`**: Defines a path and the component to render at that path.
- **`Link`**: Used to navigate without page reload.
- **`useParams`**: Hook to access URL parameters (like `id` in `/user/:id`). Notice the generic `<{ id: string }>` for typing.

---

## Tips for TS + React Router:

- Always type `useParams` when you expect route params to avoid `any`.
- Use `Navigate` component to redirect programmatically.
- For nested routes, use `<Outlet />` inside parent components.
- You can also use `useNavigate` hook to navigate imperatively.

---

## Example of programmatic navigation:

```tsx
import { useNavigate } from "react-router-dom";

const MyComponent: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return <button onClick={goToHome}>Go Home</button>;
};
```

---

If you want, I can help you with nested routes, protected routes (auth), or dynamic routing! Just ask.

Great! In a React + TypeScript app, routes are usually defined inside your `App.tsx` file (or a separate routing file). Here’s a clean breakdown:

---

## ✅ Where to add routes in React (with TypeScript)

### 1. **Main structure – inside `App.tsx`**

```tsx
// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages/components
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

### 2. **Organizing routes better (optional)**

You can also move the route logic into a separate file like `Routes.tsx`:

```tsx
// Routes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
```

Then update `App.tsx`:

```tsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
```

---

### 3. **Where to define your page components**

Typically, put pages inside a `/pages` directory:

```
src/
├── App.tsx
├── Routes.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── NotFound.tsx
```

Each file exports a component:

```tsx
// pages/Home.tsx
const Home: React.FC = () => <h1>Home Page</h1>;
export default Home;
```

---

### 4. **Navigate between routes**

Use `<Link>` from `react-router-dom`:

```tsx
import { Link } from "react-router-dom";

<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

Or use `useNavigate()` to redirect programmatically:

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/about");
```

---

Want help setting up **nested routes**, **protected routes**, or **lazy loading**? Let me know and I’ll show you how!
