used to apply Memoziation
Great! Let’s look at the `useMemo` hook in React.

---

## 🔍 What is `useMemo`?

`useMemo` is a hook that **memoizes the result of a computation** so that it is **only recomputed when its dependencies change**. It's used for **performance optimization**, especially with **expensive calculations or derived data**.

---

## ✅ Syntax

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

---

## 🧪 Simple Example

```tsx
import React, { useState, useMemo } from "react";

const ExpensiveCalc = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  const expensiveValue = useMemo(() => {
    console.log("Calculating...");
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i;
    }
    return total + count;
  }, [count]); // Only re-run when count changes

  return (
    <div>
      <h2>Expensive Calculation Result: {expensiveValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>
    </div>
  );
};

export default ExpensiveCalc;
```

🧠 Even if you click the toggle button, the `expensiveValue` won't recalculate unless `count` changes.

---

## 🧠 When to Use `useMemo`

Use `useMemo` for:

- Expensive computations
- Derived data (e.g. filtered lists, processed arrays)
- Preventing unnecessary re-renders with React.memo
- Memoizing non-primitive values (arrays, objects) to avoid recreation

---

## ⚠️ Don’t Overuse!

If your computation is **not expensive**, don’t bother with `useMemo`. It adds overhead.

---

### Want to see an example of `useMemo` for filtering a list or sorting a table? Just ask!
