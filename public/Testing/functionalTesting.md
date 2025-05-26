### ✅ **Functional Testing — Explained Simply**

**Functional testing** is a type of **black-box testing** where you check whether a system, feature, or component behaves according to the **functional requirements**.

---

## 📌 **Definition:**

> Functional testing verifies **what** the system does — not **how** it does it.

---

## 🧠 Imagine this:

You built a **login feature**. Functional testing checks:

- Can a user enter username and password?
- Does it validate wrong credentials?
- Does it redirect correctly on success?

You don’t care **how** the authentication is coded internally — only that it **works** as expected.

---

## 🛠️ Functional Testing Checks:

- **Inputs:** For example, typing into a login form.
- **Outputs:** Receiving a success or error message.
- **Behavior:** The login button becomes disabled after being clicked.
- **Flow:** The process from form submission to API call, then redirect or error message.
- **User experience:** The correct screen appears when clicking a link.

---

## 🧪 Example (Frontend Functional Test with React Testing Library):

```jsx
test("logs in successfully with correct credentials", async () => {
  render(<LoginForm />);

  await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "password123");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});
```

✔️ This tests the **functionality** of the login feature from a user’s point of view.

---

## 🧪 Example (Backend Functional Test with Supertest):

```js
test("returns 200 and token on successful login", async () => {
  const res = await request(app)
    .post("/api/login")
    .send({ email: "test@example.com", password: "password123" });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();
});
```

✔️ This tests if the backend **function** (login) behaves correctly when given valid input.

---

## ✅ Functional Test vs Other Types

- **Unit Testing:** Checks individual functions or components in isolation (e.g., `sum(2,3)` returns `5`).
- **Integration Testing:** Verifies multiple modules or components working together (e.g., API fetch to DB to response).
- **Functional Testing:** Ensures system behavior matches user requirements (e.g., login form works correctly).
- **End-to-End (E2E) Testing:** Tests the entire app flow across frontend and backend (e.g., user signs up, logs in, buys a product).

---

## 🏁 Summary:

- **🎯 Focus:** User-facing behavior.
- **🔍 Approach:** Black-box (don’t test internals).
- **🧪 Goal:** Verify features do what they are supposed to.
- **✅ Tools:**
  - Frontend: RTL, Cypress
  - Backend: Supertest, Postman, Jest

---

Want an example of how to write **functional tests in a CI/CD pipeline** or **how they relate to user stories in agile development**?
