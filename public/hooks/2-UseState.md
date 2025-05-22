## ✅ What is `useState`?

`useState` is a React hook that lets you **add state** to a functional component.

---

## 📦 Basic Syntax

```tsx
const [state, setState] = useState(initialValue);
```

---

## 🔹 Example: Counter (TypeScript)

```tsx
import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
    </div>
  );
};

export default Counter;
```

---

## 🧠 TypeScript Notes

Here are some common ways to type state with `useState` in TypeScript:

- **Number:** `useState<number>(0)`
- **String:** `useState<string>("")`
- **Boolean:** `useState<boolean>(false)`
- **Array:** `useState<string[]>([])`
- **Object:** `useState<{ name: string }>({ name: "" })`

---

## 🔄 Update state based on previous value

```tsx
setCount((prev) => prev + 1);
```

This is safer when updating based on the old state.

---

Want examples for handling **form inputs**, **arrays**, or **objects** with `useState`? Just let me know!

Absolutely! Let's break down this code block **line by line** and explain it clearly. This is a very common and useful pattern when working with **forms in React** using `useState`.

---

### 🧩 The Full Code

```tsx
const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

---

### 🔍 What’s Happening?

#### 🔸 `const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => { ... }`

- This defines an event handler function for **`onChange`** on an `<input>` element.
- It will run every time the user types or changes a form field (like a text box).

---

#### 🔸 `const { name, value } = e.target;`

- `e.target` is the DOM element (the input).
- `name` and `value` are its attributes:

  - `name` helps identify which field is being changed (like `"email"` or `"username"`).
  - `value` is the current text the user typed.

**✅ Example:**
If the input is:

```html
<input name="email" value="sanjana@gmail.com" />
```

This line grabs:

```ts
name = "email";
value = "sanjana@gmail.com";
```

---

#### 🔸 `setFormData((prev) => ({ ... }))`

- This updates the state (`formData`) using the **previous state**.
- We use the functional form `setFormData(prev => ...)` to make sure we're working with the latest state (important when multiple updates happen quickly).

---

#### 🔸 `...prev`

- This spreads the **existing fields** in the object.
- Example:

  ```ts
  prev = { name: "Sanjana", email: "test@gmail.com" };
  ```

---

#### 🔸 `[name]: value`

- This updates **just one field** of the form, dynamically.
- It's a computed property name, so if `name = "email"`, it becomes:

```ts
setFormData({
  ...prev,
  email: "new value",
});
```

---

### ✅ Why This Pattern Is Powerful

It lets you update **any field** in a form, even if you have 5+ inputs — all with a single handler function.

---

### 🧠 Visual Example:

Say your form state is:

```ts
formData = { name: "Sanjana", email: "old@example.com" };
```

Then the user types `"new@example.com"` in the input field:

```html
<input name="email" value="new@example.com" />
```

Your function updates the state to:

```ts
formData = { name: "Sanjana", email: "new@example.com" };
```

---

### 💡 Final Note:

Don’t forget to add the `name` attribute on each input so this logic works:

```tsx
<input name="email" value={formData.email} onChange={handleChange1} />
<input name="name" value={formData.name} onChange={handleChange1} />
```

---

Would you like me to show how to do the same thing with a dropdown, checkbox, or radio buttons?
