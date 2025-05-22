import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5100;

app.use(cors());
app.use(express.json());

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
app.get("/", (_req, res) => {
  res.send("✅ Server is running!");
});

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
