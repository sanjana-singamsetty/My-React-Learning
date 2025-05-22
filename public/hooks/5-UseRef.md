-- allows us to acess DOM elemnts

### ✅ `useRef` Hook in React — Explained with Examples

The `useRef` hook in React is used to:

1. **Access or manipulate DOM elements directly**
2. **Store mutable values** that don't trigger re-renders

---

## 🔧 Basic Syntax

```tsx
const ref = useRef(initialValue);
```

---

## 🔹 1. **Accessing DOM Elements (Common Use)**

```tsx
import { useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus"
      />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
};
```

### ✅ What’s happening?

- `useRef(null)` creates a ref object.
- `ref={inputRef}` links it to the `<input />`.
- You can then call `.focus()` on it.

---

## 🔹 2. **Persist Values Without Re-rendering**

```tsx
import { useEffect, useRef, useState } from "react";

const RenderCounter = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>Rendered: {renderCount.current} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};
```

### ✅ Why use `useRef` here?

- It holds a mutable value (`renderCount`) **without causing re-renders**.

---

## 🔹 3. **Hold Previous Values**

```tsx
const PreviousValue = ({ value }: { value: number }) => {
  const prevValue = useRef<number | undefined>();

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <p>
      Current: {value}, Previous: {prevValue.current}
    </p>
  );
};
```

---

## 🧠 Summary

- **Access DOM elements directly** (e.g., focus an input)
- **Store values between renders** without causing re-renders
- **Keep track of previous values** across renders
- **Avoid unnecessary re-renders** when updating mutable values

---

Want to try an example with buttons, modals, animations, or timers using `useRef`? I can guide you through one!

useRef() only returns one item. It returns an Object called current.

When we initialize useRef we set the initial value: useRef(0).

It's like doing this: const count = {current: 0}. We can access the count by using count.current.

Run this on your computer and try typing in the input to see the application render count increase.
