### 📦 The Complete Code

**Common UI Components and Their Purpose:**

- **Card**: Displays a box with a title, content, image, etc.
- **Button**: Triggers actions (e.g., submit, open modal)
- **Input**: Lets users enter text
- **Form**: Wraps multiple input fields
- **Slider**: Select value by sliding
- **Dropdown / Select**: Choose one option from a list
- **Modal / Dialog**: Pop-up for alerts, forms, etc.
- **Navbar**: Top navigation bar with links
- **Sidebar**: Side menu (often collapsible)
- **Accordion**: Expand/collapse content sections
- **Tabs**: Switch between sections (like Profile / Settings)
- **Tooltip**: Shows help text on hover
- **Toast / Snackbar**: Temporary popup messages

```tsx
import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section
    style={{
      padding: "1rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      margin: "1rem 0",
    }}
  >
    <h2>{title}</h2>
    <div>{children}</div>
  </section>
);

export default Section;
```

---

### 🧠 Step-by-Step Explanation

#### 1. **`import React from "react";`**

- This brings in the **React library**, which is required to use JSX (`<h2>`, `<div>`, etc.) and create components.

#### 2. **`interface SectionProps { ... }`**

This defines the **props (inputs)** your component expects:

- `title` (`string`): The heading text of the section
- `children` (`React.ReactNode`): The JSX/HTML content inside the section

✅ This ensures **type safety**: if someone uses `<Section />` without a title or with bad types, TypeScript will warn them.

---

#### 3. **`const Section: React.FC<SectionProps> = ({ title, children }) => (...)`**

This is your actual **React component**:

- `React.FC<SectionProps>`:
  - `FC` means _Function Component_.
  - It also tells TypeScript: “This component will receive props of type `SectionProps`.”
- `({ title, children })`: Destructures the props directly.

---

#### 4. **`<section style={...}>...</section>`**

This is the JSX that the component returns:

- **`<section>`**: A semantic HTML element representing a section of content.
- The `style={...}` block adds inline CSS:
  - Padding, border, rounded corners, margin
- Inside it:
  - `<h2>{title}</h2>`: Displays the `title` prop
  - `<div>{children}</div>`: Renders whatever you pass between the `<Section>` tags

---

### 💡 Example Usage

```tsx
<Section title="About Me">
  <p>I’m Sanjana, a web developer and ML enthusiast.</p>
</Section>
```

**This will render as:**

```html
<section style="...">
  <h2>About Me</h2>
  <div>
    <p>I’m Sanjana, a web developer and ML enthusiast.</p>
  </div>
</section>
```

---

### ✅ Why Use This Pattern?

- Clean and **reusable component**
- Strong **type safety**
- Easy to style or extend
- Supports any nested content using `children`

---

Let me know if you’d like to:

- Add Tailwind instead of inline styles
- Make the section collapsible
- Add animations or hover effects

I can show that next!

Great question! Here's what **`children: React.ReactNode`** means in React with TypeScript:

---

### What is `children`?

- In React, **`children`** is a special prop that represents any **nested elements or content** you place inside a component’s opening and closing tags.

Example:

```tsx
<Section>
  <p>This is some content inside Section.</p>
</Section>
```

Here, `<p>...</p>` is the **children** of `Section`.

---

### What is `React.ReactNode`?

- `React.ReactNode` is a **TypeScript type** that represents **anything React can render**.
- It includes:
  - JSX elements (`<div>`, `<p>`, custom components)
  - Strings or numbers (`"Hello"`, `123`)
  - Arrays of React nodes
  - `null`, `undefined`, or `boolean` (which render nothing)

---

### Why use `children: React.ReactNode` in props?

When you want your component to accept **any valid React content inside**, you type the `children` prop as `React.ReactNode`.

---

### Example

```tsx
interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

// Usage:
<Card>
  <h2>Title</h2>
  <p>Some description here.</p>
</Card>;
```

---

### Summary

- **`children`**: A special prop in React that represents any nested content placed between a component’s opening and closing tags.
- **`React.ReactNode`**: A TypeScript type that covers anything React can render—JSX elements, strings, numbers, arrays, `null`, `undefined`, or `boolean`.

---

If you want, I can explain with a demo or show alternatives!

Before React 16.8, Class components were the only way to track state and lifecycle on a React component. Function components were considered "state-less".

With the addition of Hooks, Function components are now almost equivalent to Class components. The differences are so minor that you will probably never need to use a Class component in React.

Even though Function components are preferred, there are no current plans on removing Class components from React.

Sure! Here’s a clear overview of **class components in React**, including how they work with TypeScript:

---

## What Are Class Components in React?

Class components are one of the two ways to write React components (the other being function components). They use ES6 classes and extend `React.Component`.

They were the **standard before React Hooks** came out, and they can manage state and lifecycle methods.

---

## Basic Structure of a React Class Component

```tsx
import React, { Component } from "react";

interface Props {
  message: string;
}

interface State {
  count: number;
}

class MyClassComponent extends Component<Props, State> {
  // Initialize state
  state: State = {
    count: 0,
  };

  // Event handler method
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // The render method returns JSX
  render() {
    return (
      <div>
        <h1>{this.props.message}</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default MyClassComponent;
```

---

## Explanation

- `class MyClassComponent extends Component<Props, State>`: Creates a class component typed with props and state.
- `state: State`: Initializes the component’s state.
- `this.props`: Accesses the props passed from the parent.
- `this.state`: Accesses the component’s local state.
- `this.setState()`: Updates the component’s state and triggers a re-render.
- `render()`: Must return the JSX UI that will be rendered.

---

## When to Use Class Components?

- Working with **older codebases** that haven’t migrated to Hooks
- When you want to use lifecycle methods like `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`
- But today, **function components + hooks** are preferred for new React apps because they are simpler and cleaner.

---

## Lifecycle Methods Example

```tsx
class Timer extends React.Component<{}, { seconds: number }> {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
```

---

## Summary

**Comparison: Class Components vs Function Components**

- **Syntax**:

  - Class components use ES6 classes and extend `React.Component`.
  - Function components are plain functions, often using hooks.

- **State Management**:

  - Class components manage state with `this.state` and update it using `this.setState()`.
  - Function components use the `useState` hook for state management.

- **Lifecycle Methods**:

  - Class components use built-in lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.
  - Function components use the `useEffect` hook to handle side effects and lifecycle events.

- **Usage Today**:
  - Class components are mostly used in legacy codebases or special cases.
  - Function components are recommended for new development due to their simplicity and flexibility.

---

If you want, I can help convert a function component to a class component or vice versa!
