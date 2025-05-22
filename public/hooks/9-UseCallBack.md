Great! Let's dive into the **`useCallback`** hook in React.

---

## 🔍 What is `useCallback`?

`useCallback` is used to **memoize a function**, so it doesn't get recreated on every render **unless its dependencies change**.

It helps avoid **unnecessary re-renders** of child components that depend on functions passed as props.

---

## ✅ Syntax

```tsx
const memoizedCallback = useCallback(() => {
  // function body
}, [dependencies]);
```

---

## 🧪 Simple Example

```tsx
import React, { useState, useCallback } from "react";

const Button = React.memo(
  ({ onClick, children }: { onClick: () => void; children: string }) => {
    console.log("Rendering:", children);
    return <button onClick={onClick}>{children}</button>;
  }
);

const Counter = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const incrementOther = () => setOther((prev) => prev + 1);

  return (
    <div>
      <h2>Count: {count}</h2>
      <Button onClick={increment}>Increment Count</Button>
      <Button onClick={incrementOther}>Increment Other</Button>
    </div>
  );
};

export default Counter;
```

### 🧠 What's Happening?

- The `increment` function is **memoized** with `useCallback`.
- `Button` is wrapped with `React.memo`, so it **only re-renders when its props change**.
- `increment` doesn't change on every render → the button doesn't re-render unnecessarily.

---

## 💡 When to Use `useCallback`

Use it when:

- Passing functions to `React.memo` components
- Functions are defined inside a component and cause re-renders unnecessarily
- Event handlers that don’t need to change

---

## ⚠️ Avoid Overusing

Don’t wrap every function with `useCallback`—only use it when **memoization matters for performance** or avoids unnecessary renders.

---

Want to see an example of `useCallback` in a list or with `useReducer`?

Great question! Understanding the difference between `useMemo` and `useCallback` is key to writing **efficient and clean React code**.

---

## 🔍 TL;DR:

| Hook          | Purpose                       | Returns      |
| ------------- | ----------------------------- | ------------ |
| `useMemo`     | Memoizes **a computed value** | **Value**    |
| `useCallback` | Memoizes **a function**       | **Function** |

---

## 🧠 In Simple Terms:

- `useMemo` → _"Only recalculate this value if its dependencies change."_
- `useCallback` → _"Only recreate this function if its dependencies change."_

---

## ✅ Syntax Comparison

```tsx
// useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

## 📦 Example: When to Use Each

### 🔹 `useMemo` Example:

```tsx
const filteredTodos = useMemo(() => {
  return todos.filter((todo) => todo.completed);
}, [todos]);
```

Here, you're **memoizing the result of a filtering operation**.

---

### 🔹 `useCallback` Example:

```tsx
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);
```

Here, you're **memoizing the function** to prevent it from being re-created on every render.

This is useful when passing to child components using `React.memo`.

---

## 🎯 When to Use

When deciding which hook to use:

- Use **`useMemo`** for memoizing expensive calculations or derived data.
- Use **`useCallback`** for memoizing functions, especially when passing them as props to child components to avoid unnecessary re-renders.
- Avoid using these hooks unless you notice performance issues or unnecessary renders.

---

## ⚠️ Tip

If you find yourself writing:

```tsx
const memoizedFunction = useMemo(() => () => doSomething(), [dep]);
```

👎 That’s a sign you **should be using `useCallback` instead**.

---

L
