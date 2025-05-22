The useContext hook in React is used to share data (like theme, auth, or language settings) across your component tree without having to pass props manually at every level.

- global state
- services
- themes
- user settings

The `useContext` hook in React is used to **share data** (like theme, auth, or language settings) across your component tree **without having to pass props manually at every level**.

---

## ✅ What is Context?

Context provides a **way to pass data** through the component tree **without prop drilling**.

---

## 🔧 Step-by-Step: Using `useContext`

Let’s create a simple `ThemeContext` example.

---

### 🔹 1. Create the Context

```tsx
import React, { createContext } from "react";

export const ThemeContext = createContext("light");
```

---

### 🔹 2. Provide the Context

Wrap your component tree with the `Provider`:

```tsx
import { ThemeContext } from "./ThemeContext";

const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <Home />
    </ThemeContext.Provider>
  );
};
```

---

### 🔹 3. Consume the Context (with `useContext`)

```tsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Home = () => {
  const theme = useContext(ThemeContext);
  return <div>The current theme is: {theme}</div>;
};
```

---

## 💡 Realistic Use Case: Auth Context

```tsx
// AuthContext.tsx
export const AuthContext = createContext({ isLoggedIn: false });
```

```tsx
// App.tsx
<AuthContext.Provider value={{ isLoggedIn: true }}>
  <Profile />
</AuthContext.Provider>
```

```tsx
// Profile.tsx
const { isLoggedIn } = useContext(AuthContext);
```

---

## 📌 Summary

Here are the main hooks and components involved in using context:

- `createContext`: Creates the context object.
- `Provider`: Supplies a value to components.
- `useContext`: Allows access to the context value inside child components.

---

Want help creating your own `ThemeContext`, `AuthContext`, or something like `LanguageContext`? Just say the word!
