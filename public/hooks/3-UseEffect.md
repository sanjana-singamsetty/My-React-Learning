The `useEffect` Hook allows you to perform side effects in your components.

Some examples of side effects are: fetching data, directly updating the DOM, and using timers.

`useEffect` accepts two arguments: a function (effect) and an optional array of dependencies.

`useEffect(<function>, <dependency>)`
function --- what to run
dependencies when to run

based on class component -- component did mount , component
did update , componentwillunmount

3 variations --- without dependencies, with an empty array, with variables

changes on every runder

### ✅ `useEffect` in React – Simple Explanation

The `useEffect` hook in React is used to **run side effects** in function components — like fetching data, logging, updating the DOM, or setting up timers.

---

### 🔹 Basic Syntax

```tsx
useEffect(() => {
  // ✅ Code to run (side effect)

  return () => {
    // 🧹 Cleanup code (optional)
  };
}, [dependencies]);
```

---

### 🧠 What Are Dependencies?

The second argument (dependency array) controls **when** the effect runs:
The second argument to `useEffect` is the dependency array, which controls **when** the effect runs:

- If you pass an empty array `[]`, the effect runs only once when the component mounts.
- If you pass an array with variables (e.g., `[someValue]`), the effect runs whenever any of those variables change.
- If you omit the array, the effect runs after every render (this is rarely needed).

---

### 💡 Examples

#### 1. ✅ Run Once (on Component Mount)

```tsx
useEffect(() => {
  console.log("Component mounted!");
}, []);
```

---

#### 2. 🔄 Run When a Value Changes

```tsx
useEffect(() => {
  console.log("Counter changed:", count);
}, [count]);
```

---

#### 3. 🌐 Fetch Data from API on Mount

```tsx
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("https://api.example.com");
    const data = await res.json();
    console.log(data);
  };
  fetchData();
}, []);
```

---

#### 4. ⏰ Set and Clear Interval (with Cleanup)

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(interval); // Cleanup on unmount
  };
}, []);
```

---

### 🔍 Summary

- `useEffect` is how you **do things after render**.
- It replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.
- Use the **dependency array** to control when it runs.

---

Sure! Let's look at **3 essential variations** of `useEffect` — these cover almost all common use cases.

---

## ✅ 1. `useEffect` that runs **once on mount**

(like `componentDidMount`)

```tsx
useEffect(() => {
  console.log("✅ Component mounted!");

  // Optional: fetch data or initialize something here
}, []);
```

### 🔹 When does it run?

- Only **once**, when the component is mounted.
- Dependency array is empty: `[]`.

---

## 🔄 2. `useEffect` that runs **when a value changes**

```tsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("🔁 Count changed:", count);
}, [count]);
```

### 🔹 When does it run?

- On **initial render** and **every time `count` changes**.

---

## 🧹 3. `useEffect` with **cleanup**

(like `componentWillUnmount`)

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("⏰ Running every second");
  }, 1000);

  return () => {
    clearInterval(timer);
    console.log("🧹 Timer cleaned up");
  };
}, []);
```

### 🔹 When does it run?

- `setInterval()` starts once.
- Cleanup runs when the component **unmounts** (or before re-running the effect).

---

## 🎯 Summary Table

- **Once on mount:**  
  Use `useEffect(() => {}, [])` to run an effect only on the first render (component mount).

- **On value change:**  
  Use `useEffect(() => {}, [value])` to run an effect whenever `value` changes.

- **With cleanup:**  
  Use `useEffect(() => { return () => {} }, [...])` to perform cleanup when the component unmounts or before the effect runs again.

---

Let me know if you'd like to try these examples in a working component, or explore variations like fetching data or scroll listeners!
