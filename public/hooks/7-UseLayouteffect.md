The `useLayoutEffect` hook in React is similar to `useEffect`, **but it fires synchronously after all DOM mutations and before the browser paints**. This makes it useful for reading layout values (like element dimensions) **and synchronously re-rendering before the browser paints**.

---

## ✅ Syntax:

```tsx
useLayoutEffect(() => {
  // Your logic here
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

---

## 🔍 Difference from `useEffect`

The main difference is **when** the effect runs:

- `useEffect` runs **after** the browser has painted the DOM. It’s great for tasks like data fetching, subscriptions, or logging.
- `useLayoutEffect` runs **synchronously after DOM mutations but before the browser paints**. Use it when you need to measure or modify the DOM and avoid visual flicker.

---

## 🧪 Example 1: Measuring DOM Width

```tsx
import { useLayoutEffect, useRef, useState } from "react";

const LayoutExample = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: "50%", padding: "20px", background: "#e0e0e0" }}
      >
        Resize me
      </div>
      <p>Width: {width}px</p>
    </div>
  );
};
```

---

## 🧠 When to Use `useLayoutEffect`

Use `useLayoutEffect` **only when you must measure or change the DOM before it’s painted**, like:

- Measuring element size or position
- Scroll position
- Avoiding flickers in animations

---

⚠️ **Performance Note:**
`useLayoutEffect` blocks painting, so **don’t use it unless necessary**. In most cases, `useEffect` is sufficient and better for performance.

---

Want a `useLayoutEffect` animation example or real-world use like auto-scroll to bottom?
