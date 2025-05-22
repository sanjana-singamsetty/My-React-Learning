React **events** are how you handle user interactions like clicks, typing, form submissions, etc., just like with JavaScript — but using a consistent, cross-browser **synthetic event system**.

---

## 🔹 How React Events Work

- React wraps native DOM events in a **SyntheticEvent**, which normalizes behavior across browsers.
- You pass event handlers as props using camelCase (e.g., `onClick` instead of `onclick`).
- You use JSX functions like this:

```tsx
<button onClick={handleClick}>Click me</button>
```

---

## 🔸 Common React Events

- **Mouse Events:** `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave`
- **Keyboard Events:** `onKeyDown`, `onKeyUp`
- **Form Events:** `onChange`, `onSubmit`
- **Focus Events:** `onFocus`, `onBlur`

---

## 🔹 Example: Button Click

```tsx
const ButtonComponent = () => {
  const handleClick = () => {
    alert("Button was clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

---

## 🔸 Example: Input Change

```tsx
const InputComponent = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
};
```

---

## 🔹 Using Event Types in TypeScript

- **Form submit:** `React.FormEvent<HTMLFormElement>`
- **Input change:** `React.ChangeEvent<HTMLInputElement>`
- **Button click:** `React.MouseEvent<HTMLButtonElement>`

---

## 🔸 Summary

- React events use `camelCase` syntax.
- They are consistent across all browsers using `SyntheticEvent`.
- TypeScript gives you full type safety with proper event types.

Let me know if you'd like an example app using several event types!
