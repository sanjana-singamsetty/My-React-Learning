---

## 🧠 1. What is Unit Testing?

Unit testing is the practice of **testing the smallest piece of code**—usually a **function** or a **component**—in **isolation**, to verify it does what it's supposed to do.

Think of it like:

> "Does this tiny part of the system work correctly on its own?"

---

## 🧰 2. Key Concepts in Unit Testing

- **Unit**: The smallest testable part (a function, component, method)
- **Test case**: A specific scenario to check a unit’s behavior
- **Assertion**: A statement that checks if a condition is true
- **Mock**: A fake function or data to simulate external dependencies
- **Isolation**: Tests must **not** depend on other tests or external systems
- **Coverage**: How much of your code is actually tested by your tests

---

In unit and integration testing with **React Testing Library (RTL)**, the `screen.getBy*`, `queryBy*`, `findBy*`, and their `All` variants are core ways to **select DOM elements** for assertions and interactions.

---

## 🔍 `screen.getBy*` — Types and Uses

These are **synchronous queries** — they throw an error if the element is **not found immediately**.

### ✅ List of `getBy` Queries:

| Method                 | Returns                                                           | Fails if not found? | Use case                                           |
| ---------------------- | ----------------------------------------------------------------- | ------------------- | -------------------------------------------------- |
| `getByRole`            | One element by [ARIA role](https://www.w3.org/TR/wai-aria/#roles) | Yes                 | Most recommended for accessibility                 |
| `getByLabelText`       | One element by `<label>` text                                     | Yes                 | Forms — inputs, selects                            |
| `getByPlaceholderText` | One element by `placeholder=""`                                   | Yes                 | Inputs                                             |
| `getByText`            | One element by visible text                                       | Yes                 | Buttons, labels, headings                          |
| `getByDisplayValue`    | One element by current value                                      | Yes                 | Prefilled inputs                                   |
| `getByAltText`         | One element by `alt=""`                                           | Yes                 | Images                                             |
| `getByTitle`           | One element by `title=""`                                         | Yes                 | Tooltips, etc.                                     |
| `getByTestId`          | One element by `data-testid=""`                                   | Yes                 | Only if nothing else works (not recommended first) |

---

## 🧪 Example Usage:

```jsx
// Suppose your component renders this:
<input type="text" placeholder="Enter your name" aria-label="Name" />
<button>Submit</button>
```

### 🎯 In your test:

```js
screen.getByPlaceholderText("Enter your name"); // input
screen.getByLabelText("Name"); // same input (accessible)
screen.getByRole("button", { name: /submit/i }); // button
```

---

## 🧑‍🤝‍🧑 `getAllBy*`

| Method         | Returns                         | Use case                          |
| -------------- | ------------------------------- | --------------------------------- |
| `getAllByText` | Array of elements matching text | Multiple buttons or items         |
| `getAllByRole` | Array of elements by role       | e.g., all buttons or all headings |

---

## ❓ `queryBy*` (Non-throwing)

Use when the element **may or may not be in the DOM** (e.g., conditionally rendered):

```js
expect(screen.queryByText("Error")).not.toBeInTheDocument();
```

---

## 🕒 `findBy*` (Async)

Use for **async rendering** — returns a `Promise`.

```js
expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
```

✅ Helpful when DOM updates after a fetch or form submit.

---

## ✅ Cheat Sheet

| Selector Example                           | When to Use                |
| ------------------------------------------ | -------------------------- |
| `getByRole('button', { name: /submit/i })` | Most preferred for buttons |
| `getByLabelText('Email')`                  | For input fields           |
| `getByText(/login/i)`                      | For visible text           |
| `getByTestId('submit-button')`             | Last resort only           |
| `findByText(/success/i)`                   | For async UI changes       |
| `queryByText(/error/i)`                    | To assert absence          |

---

## 📌 Best Practice: Prefer **Accessible Queries**

> **Use `getByRole` and `getByLabelText` first**, because they simulate how users interact with your app (keyboard/screen readers).

---

If you want, I can create a **live test example with all types** or generate a **reference card** you can keep while writing tests.

```

// Hello.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders greeting with the given name', () => {
  render(<Hello name="Sanjana" />);
  const heading = screen.getByText(/hello, sanjana!/i);
  expect(heading).toBeInTheDocument();
});
```

## 🧭 3. How to Think Before Writing a Test

### ✅ Ask these questions:

- **What does this function/component do?** (Intent)
- **What are the inputs?** (Props, function args, events)
- **What should be the outputs or visible effects?**
- **What edge cases might break this?** (Empty input, null, special chars)
- **Does this logic depend on time, network, or other systems?** (Consider mocks)

---

## 🛠️ 4. Basic Steps to Write a Unit Test

### Step 1: Identify the "unit" to test

- A function, class method, or UI component

### Step 2: Think of test cases

Each **test case** should check a specific scenario or behavior.

Example:

```js
// For a sum function
- Should return 5 when adding 2 and 3
- Should return 0 when adding -2 and 2
- Should return correct result for decimal numbers
```

### Step 3: Write the test structure

```js
describe("sum", () => {
  test("adds positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("adds negative and positive numbers", () => {
    expect(sum(-2, 2)).toBe(0);
  });
});
```

---

## 📋 5. Anatomy of a Unit Test (React + Jest example)

```js
test('renders "Hello, Sanjana!" on screen', () => {
  // 1. Arrange (setup data or render component)
  render(<Hello name="Sanjana" />);

  // 2. Act (optional if there's a button click or input change)
  // e.g., fireEvent.click(button)

  // 3. Assert (check the output)
  expect(screen.getByText(/hello, sanjana!/i)).toBeInTheDocument();
});
```

---

## 🎯 6. What Makes a Good Unit Test?

- ✅ **Fast**: Should run in milliseconds
- ✅ **Independent**: Should not rely on or break other tests
- ✅ **Focused**: Should test only one thing
- ✅ **Repeatable**: Should always produce the same result
- ✅ **Clear**: Test name and assertions should describe what’s tested

---

## 🧪 7. What to Test in a React Component?

Here are key things to test in a React component:

- **Rendering:** Does the component display the correct content based on its props or state?
- **Props:** Does the component behave differently when given different props?
- **Events:** Does the component respond correctly to user interactions like clicks or input changes?
- **Edge cases:** What happens if required props are missing, or if empty arrays/objects are passed?
- **Conditional rendering:** Does the component show or hide elements as expected under different conditions?

Example for a list:

```js
// If the list is empty, show "No items"
test("shows fallback for empty list", () => {
  render(<List items={[]} />);
  expect(screen.getByText("No items")).toBeInTheDocument();
});
```

---

## 🧰 8. Tools to Use

### For JavaScript (React):

- **Jest** – Test runner and assertion library
- **React Testing Library** – For testing React components from the user’s perspective
- **Mock Service Worker (MSW)** – For mocking network requests

### For Python:

- `unittest` – Built-in
- `pytest` – Popular, more readable syntax
- `mock` – To fake APIs or database calls

---

## 🧱 9. Types of Tests (and how unit fits in)

- **Unit Test**: Tests a single function or component in isolation. These are very fast and ensure that individual pieces of logic work as expected.
- **Integration Test**: Checks how multiple units (functions, components, or modules) work together. These are a bit slower and help catch issues in the way parts of your system interact.
- **End-to-End (E2E) Test**: Simulates the full user experience, testing the entire application as a user would. These are the slowest but catch issues that only appear when everything is running together.

---

## 💡 10. Mindset: Think Like a User and a Debugger

When testing:

- Imagine a **real person** using your app or feature
- Then imagine a **QA engineer** trying to break your feature

Write tests that simulate real behavior _and_ catch things if they break.

---

Would you like a **checklist** or template to follow every time you write a unit test? Or a breakdown of **React Testing Library best practices**?

Great question! Writing **unit tests for click/data events** means testing user interactions like:

- Clicking buttons
- Typing in inputs
- Selecting from dropdowns
- Submitting forms

We'll cover:

1. ✅ **Setup** (React Testing Library + Jest)
2. 🔨 **Event examples**: click, input
3. 🧠 **How to structure such tests**
4. 🧪 **Mocking callback functions**
5. 💡 **Tips and best practices**

---

## ✅ 1. Setup (React Testing Library)

Make sure you're using:

```bash
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom jest
```

```js
// Add this to your test file or global setup
import "@testing-library/jest-dom";
```

---

## 🧩 2. Sample Component with Click and Input

```jsx
// ClickComponent.jsx
import React, { useState } from "react";

const ClickComponent = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleClick = () => {
    if (name) onSubmit(name);
  };

  return (
    <div>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default ClickComponent;
```

---

## 🧪 3. Test File with Events

```jsx
// ClickComponent.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClickComponent from "./ClickComponent";

test("calls onSubmit with the correct input after button click", async () => {
  const mockSubmit = jest.fn();
  render(<ClickComponent onSubmit={mockSubmit} />);

  // Simulate typing
  const input = screen.getByPlaceholderText("Enter name");
  await userEvent.type(input, "Sanjana");

  // Simulate click
  const button = screen.getByText("Submit");
  await userEvent.click(button);

  // Assert
  expect(mockSubmit).toHaveBeenCalledTimes(1);
  expect(mockSubmit).toHaveBeenCalledWith("Sanjana");
});

test("does not call onSubmit if input is empty", async () => {
  const mockSubmit = jest.fn();
  render(<ClickComponent onSubmit={mockSubmit} />);

  const button = screen.getByText("Submit");
  await userEvent.click(button);

  expect(mockSubmit).not.toHaveBeenCalled();
});
```

---

## 💡 4. Key Things to Learn from This

- `userEvent.type()`: Simulates a user typing in input
- `userEvent.click()`: Simulates button click
- `jest.fn()`: Mocks a function (like a submit handler)
- `expect(fn).toHaveBeenCalledWith(value)`: Validates what data was passed
- `screen.getBy...()`: Queries the DOM like a user would (placeholder, label, text, etc.)

---

## 🧠 5. Best Practices for Event Testing

- 🧪 **Test behavior**, not implementation details.
  - Don't test internal state—test visible outputs and effects.
- 💬 Use user-facing queries like `getByText`, `getByLabelText`, or `getByPlaceholderText`.
- 🧼 Always **cleanup** between tests (React Testing Library handles this automatically).
- 🤖 Use `userEvent` over `fireEvent` for more realistic interactions.

---

### ✅ Summary Checklist for Event Unit Tests

- [ ] Render the component
- [ ] Simulate user input or click using `userEvent`
- [ ] Assert the side effects or UI changes
- [ ] Mock callbacks if needed (like API or parent handlers)
- [ ] Cover edge cases (like empty input, invalid data)

---
