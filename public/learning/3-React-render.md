React renders by following a **declarative and efficient** process using a **virtual DOM** and **reconciliation** mechanism. Here's a step-by-step breakdown of **how React renders components**:

---

### 🧠 1. **Component Definition**

You write components using JSX or JavaScript/TypeScript functions or classes.

```tsx
const App = () => <h1>Hello, world!</h1>;
```

---

### ⚙️ 2. **ReactDOM.render / createRoot.render**

In older versions:

```tsx
ReactDOM.render(<App />, document.getElementById("root"));
```

In modern React (React 18+):

```tsx
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
```

This tells React:
🔹 "Render the `App` component into this specific DOM node."

---

### 🧩 3. **Virtual DOM Creation**

React:

- Converts JSX into a **virtual DOM** – a lightweight JS object version of the actual DOM.
- Example:

  ```js
  {
    type: 'h1',
    props: { children: 'Hello, world!' }
  }
  ```

---

### 🔁 4. **Reconciliation**

When state or props change:

- React **compares** the new virtual DOM with the old one.
- Finds **what changed** (diffing algorithm).
- Only **updates the real DOM** where necessary — this makes React very efficient.

---

### 🌱 5. **React Updates Real DOM**

React uses:

- `document.createElement`, `setAttribute`, and similar browser APIs
- To **apply changes to the real DOM**

This process is efficient, fast, and avoids full page reloads.

---

### 📸 Summary Diagram (Mental Model):

```
JSX → Virtual DOM → Compare (Reconciliation) → Real DOM Update
```

---
