# 🌐 What Is an API Call?

An API (Application Programming Interface) call is a way for a client (like your frontend app) to request data from or send data to a server.

---

## ✅ Common HTTP Methods

### 1. **GET**

- **Purpose:** Retrieve data from the server.
- **Example Use Case:** Fetching a list of users.

```ts
fetch("https://api.example.com/users")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

### 2. **POST**

- **Purpose:** Send data to the server to create a new resource.
- **Example Use Case:** Submitting a form.

```ts
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John",
    email: "john@example.com",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

### 3. **PUT**

- **Purpose:** Replace an existing resource with new data.
- **Example Use Case:** Updating user profile information.

```ts
fetch("https://api.example.com/users/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Updated John",
  }),
});
```

### 4. **PATCH**

- **Purpose:** Partially update an existing resource.
- **Example Use Case:** Changing just the email of a user.

```ts
fetch("https://api.example.com/users/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "newemail@example.com",
  }),
});
```

### 5. **DELETE**

- **Purpose:** Remove a resource from the server.
- **Example Use Case:** Deleting a user.

```ts
fetch("https://api.example.com/users/1", {
  method: "DELETE",
});
```

---

## 🛠 Tools for API Calls

- **JavaScript/TypeScript:** Native `fetch()`, `axios`
- **Postman or Insomnia:** For manual API testing
- **React Query / SWR:** For managing API calls in React apps

---

## 📦 Bonus: Axios Example

```ts
import axios from "axios";

axios
  .post("https://api.example.com/users", {
    name: "Alice",
    email: "alice@example.com",
  })
  .then((res) => console.log(res.data));
```

---

# 🧱 Setting Up a Node.js + Express Server

You can create a Node.js + Express server in your project (React or full-stack). Here’s how to structure and start:

## 📁 Folder Structure (Full-stack App)

```
my-project/
├── client/           ← React frontend (optional)
│   └── src/
├── server/           ← Node.js + Express backend
│   └── server.js
├── package.json
```

You can use separate `package.json` files for client and server (monorepo-style), or a single combined one.

---

## 🚀 Steps to Add a Server

### 1. Create a `server/` Folder

```bash
mkdir server
cd server
npm init -y
npm install express cors
```

### 2. Add `server.js`

Create `server/server.js`:

```js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
```

### 3. Run the Server

From the `server/` directory:

```bash
node server.js
```

### 4. Connect Frontend to Backend

From your frontend (React), make requests to:

```
http://localhost:5000/api/todos
```

If you’re using **Create React App**, add a `proxy` to skip CORS config:

In `client/package.json`:

```json
"proxy": "http://localhost:5000"
```

Now you can do:

```ts
fetch("/api/todos"); // without full URL
```

---

## 🧠 TypeScript Tip

If you're using TypeScript, rename `server.js` to `server.ts` and install types:

```bash
npm install typescript ts-node @types/node @types/express --save-dev
```

---

# ⚡️ Express Server with TypeScript

## 1. Create a `server/` Folder

```bash
mkdir server
cd server
npm init -y
npm install express cors
npm install -D typescript ts-node-dev @types/express @types/node @types/cors
```

## 2. Set Up TypeScript Config

In `server/`, run:

```bash
npx tsc --init
```

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
```

## 3. Create Server File

Create `server/src/index.ts`:

```ts
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];

app.get("/api/todos", (_req: Request, res: Response) => {
  res.json(todos);
});

app.post("/api/todos", (req: Request, res: Response) => {
  const newTodo: Todo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch("/api/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/api/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
```

## 4. Add Script to `server/package.json`

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
}
```

Run the server:

```bash
npm run dev
```

---

## 📂 Final Folder Structure

```
my-project/
├── client/           ← Your React app
│   └── ...
├── server/
│   ├── src/
│   │   └── index.ts
│   └── tsconfig.json
│   └── package.json
```

---

# 🛠 Why Do We Need These Tools?

## 1. **Express.js**

- **What is it?**  
  A lightweight, flexible web framework for Node.js to build servers and APIs quickly.
- **Why use it?**  
  Simplifies handling HTTP requests, routing, and middleware.

## 2. **CORS (Cross-Origin Resource Sharing)**

- **What is it?**  
  A browser security feature that restricts cross-origin HTTP requests.
- **Why do we need it?**  
  Allows your frontend (on a different port/domain) to access your backend API.

## 3. **Middleware: `express.json()`**

- **What is it?**  
  Middleware to parse incoming JSON payloads.
- **Why use it?**  
  Automatically parses JSON request bodies and assigns them to `req.body`.

## 4. **Node.js**

- **What is it?**  
  JavaScript runtime for running JS on the server.
- **Why use it?**  
  Enables full-stack development with a single language.

---

# 🔍 Understanding `express.json()`

## What is `express.json()`?

- Built-in Express middleware to parse incoming requests with JSON payloads.
- Converts raw JSON in the request body into a JavaScript object and assigns it to `req.body`.

## Why do you need it?

- Without it, `req.body` is `undefined` for JSON requests.
- With it, you can easily access and use data sent from the client.

## How to use it?

```ts
app.use(express.json());
```

## Example

```ts
app.post("/api/todos", (req, res) => {
  console.log(req.body);
  // With express.json(), this will be the parsed object from JSON body
  const { text, completed } = req.body;
});
```

---

**Before `express.json()`:**  
`req.body` is `undefined` or raw text.

**After `express.json()`:**  
`req.body` is a parsed JavaScript object.

---

Perfect — let’s walk through this code **line by line**, clearly and visually, so you know exactly what every part is doing. I’ll explain **React hooks**, **API calls**, and **JSX rendering** like you're building it with me step by step.

---

## 🔄 1. **Imports and Setup**

```tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./to-do.css";
```

### ✅ What this does:

- `useState`: lets you store data (like todos and input value).
- `useEffect`: runs code **once when the page loads** (like fetching todos).
- `axios`: makes API calls (GET, POST, DELETE).
- `to-do.css`: your styles for the app.

---

## 🧠 2. **Todo Type Definition**

```ts
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

### ✅ What this does:

Defines the structure of a todo:

- `id`: unique identifier
- `text`: the todo content (like "Learn React")
- `completed`: whether it's done

TypeScript will now expect todos to look like this object.

---

## 🧠 3. **Component Starts**

```tsx
const ToDo: React.FC = () => {
```

This declares your React Functional Component called `ToDo`.

---

## 📦 4. **State Variables**

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [newTodo, setNewTodo] = useState("");
```

### ✅ What this does:

- `todos`: stores the array of all your todos
- `newTodo`: holds the text from the input box

`useState` makes them reactive — changing their values will re-render the app.

---

## 🌐 5. **Base API URL**

```tsx
const API_URL = "http://localhost:5100/api/todos";
```

Where you send and receive todo data (from your Express backend).

---

## ⏱️ 6. **Fetch Todos on Page Load**

```tsx
useEffect(() => {
  fetchTodos();
}, []);
```

This runs **only once** when the component is mounted (like `componentDidMount` in class components).

---

## 🌐 7. **Function to Fetch Todos**

```tsx
const fetchTodos = async () => {
  try {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
```

### ✅ What it does:

- Calls the backend API to **GET** todos
- Stores the response data in `todos` state using `setTodos`

---

## ➕ 8. **Add Todo Function**

```tsx
const handleAddTodo = async () => {
  if (!newTodo.trim()) return;
  try {
    const res = await axios.post(API_URL, {
      text: newTodo,
      completed: false,
    });
    setTodos((prev) => [...prev, res.data]);
    setNewTodo("");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
```

### ✅ What it does:

- Sends a **POST** request to backend with new todo
- On success, adds it to the existing `todos` array using `...prev`
- Clears the input field

---

## ❌ 9. **Delete Todo Function**

```tsx
const handleDeleteTodo = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
```

### ✅ What it does:

- Sends a **DELETE** request to backend for that todo
- Locally filters out the deleted todo from the `todos` array to update UI

---

## 🧱 10. **Rendering JSX UI**

```tsx
return (
  <div className="todo-container">
    <div className="todo-app">
      <h1 className="title">🌸 My Todo App</h1>
```

This sets up the main structure and title.

---

## 📝 11. **Todo Input Field + Add Button**

```tsx
<div className="todo-input-section">
  <input
    type="text"
    placeholder="What's on your mind?"
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
  />
  <button onClick={handleAddTodo}>Add</button>
</div>
```

### ✅ What it does:

- Controlled input field: updates `newTodo` state on typing
- Clicking **Add** calls `handleAddTodo()` to save it

---

## 📃 12. **Display Todos List**

```tsx
<div className="todo-list">
  {todos.map((todo) => (
    <div key={todo.id} className="todo-item">
      <span>
        {todo.completed ? "✅" : "📝"} {todo.text}
      </span>
      <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  ))}
  {todos.length === 0 && <p>No todos yet!</p>}
</div>
```

### ✅ What it does:

- Loops through all todos and displays each with:

  - ✅ or 📝 icon (based on `completed`)
  - Delete button ❌

- If there are no todos, it shows `"No todos yet!"`

---

## ✅ 13. **Export the Component**

```tsx
export default ToDo;
```

This lets you use the `ToDo` component anywhere in your app.

---

## 📌 Final Summary

- `useState`: Store todos + input text
- `useEffect`: Fetch todos on page load
- `axios.get`: Load todos from backend
- `axios.post`: Add new todo
- `axios.delete`: Delete a todo
- `.map()`: Render list of todos
- `.filter()`: Remove deleted todo from the UI

---

Would you like me to show how to add ✅ toggle (mark complete) or deploy the app with Vercel + Render?
