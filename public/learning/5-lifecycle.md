**React Lifecycle Methods** — what they are and when they run — especially in **class components**:

---

## React Lifecycle Methods (Class Components)

Lifecycle methods are special methods you can override in class components to run code at specific points during a component’s life — mounting, updating, and unmounting.

---

### 1. **Mounting Phase**

When the component is created and inserted into the DOM.

- `constructor()`: Runs when the component instance is created. Used to initialize state and bind methods.
- `static getDerivedStateFromProps(props, state)`: Runs before render on mount and update. Used to update state based on props.
- `render()`: Required method that returns JSX to render the UI.
- `componentDidMount()`: Runs after the first render (when the DOM is ready). Used to load data or set up subscriptions.

---

### 2. **Updating Phase**

When component’s props or state change.

- `static getDerivedStateFromProps(props, state)`: Runs before every render on update. Used to sync state with props.
- `shouldComponentUpdate(nextProps, nextState)`: Runs before re-rendering. Used to control whether the component should update (performance optimization).
- `render()`: Renders the UI again with updated data.
- `getSnapshotBeforeUpdate(prevProps, prevState)`: Runs right before changes are applied to the DOM. Used to capture information (like scroll position).
- `componentDidUpdate(prevProps, prevState, snapshot)`: Runs after the DOM updates. Used to perform side-effects (fetch data, update the DOM).

---

### 3. **Unmounting Phase**

When the component is removed from the DOM.

- `componentWillUnmount()`: Runs before the component is destroyed. Used for cleanup (cancel timers, remove listeners).

---

### 4. **Error Handling**

Catch errors during rendering or lifecycle methods.

- `static getDerivedStateFromError(error)`: Runs when an error is thrown. Used to update state for error UI.
- `componentDidCatch(error, info)`: Runs when an error is thrown. Used to log errors or perform side effects.

---

## Lifecycle Flow Summary (Mount → Update → Unmount)

```plaintext
Mounting: constructor() → getDerivedStateFromProps() → render() → componentDidMount()

Updating: getDerivedStateFromProps() → shouldComponentUpdate() → render() → getSnapshotBeforeUpdate() → componentDidUpdate()

Unmounting: componentWillUnmount()
```

---

## Example

```tsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor");
  }

  componentDidMount() {
    console.log("Mounted");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Should update?");
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Updated");
  }

  componentWillUnmount() {
    console.log("Will unmount");
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

---

If you want, I can also explain the **Hooks** equivalents (like `useEffect`) that replace lifecycle methods in function components!
