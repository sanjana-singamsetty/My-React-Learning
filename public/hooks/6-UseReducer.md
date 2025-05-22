Great! Let’s break down the `useReducer` hook in React — **a more powerful alternative to `useState`** when you have complex state logic (like multiple actions or nested values).

---

## ✅ What is `useReducer`?

`useReducer` is used to manage **complex state transitions** in a more organized way, similar to Redux-style reducers.

---

## 📦 Syntax:

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

---

## 🔹 Step-by-step Example: Counter

### 1. **Define Initial State**

```tsx
const initialState = { count: 0 };
```

---

### 2. **Create Reducer Function**

```tsx
function reducer(state: typeof initialState, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}
```

---

### 3. **Use in Component**

```tsx
import { useReducer } from "react";

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};
```

---

## 💡 When to Use `useReducer`?

- Complex state transitions
- Multiple related values in one state
- Avoiding prop drilling by using `useReducer + Context`

---

## 🔥 Advanced Example: Form State

```tsx
type State = {
  name: string;
  email: string;
};

type Action =
  | { type: "setName"; payload: string }
  | { type: "setEmail"; payload: string };

const initialState: State = {
  name: "",
  email: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    default:
      return state;
  }
}
```

Then in the component:

```tsx
const [state, dispatch] = useReducer(reducer, initialState);

<input
  type="text"
  placeholder="Name"
  value={state.name}
  onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
/>
<input
  type="email"
  placeholder="Email"
  value={state.email}
  onChange={(e) => dispatch({ type: "setEmail", payload: e.target.value })}
/>
```

---

`useReducer` returns array where is first elkememt is state and secomnd is dispatch
