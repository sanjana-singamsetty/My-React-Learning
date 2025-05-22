The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.

const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];

### ✅ What is a **default export** in JavaScript/TypeScript?

A **default export** is a way to export **one single value** (function, class, object, etc.) from a module so it can be imported without using curly braces `{}`.

---

### 🔹 Exporting

You define a default export like this:
JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.

```ts
// utils.ts
export default function greet(name: string) {
  return `Hello, ${name}`;
}
```

Or:

```ts
const greet = (name: string) => `Hello, ${name}`;
export default greet;
```

---

### 🔹 Importing a default export

```
import greet from "./utils";

console.log(greet("Sanjana")); // Hello, Sanjana

Notice: ✅ No curly braces needed when importing a default export.

```

JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.
`<div></div>`

---

Before React 16.8, Class components were the only way to track state and lifecycle on a React component. Function components were considered "state-less".

With the addition of Hooks, Function components are now almost equivalent to Class components. The differences are so minor that you will probably never need to use a Class component in React.
