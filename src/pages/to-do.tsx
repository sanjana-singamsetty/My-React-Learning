import React, { useEffect, useState } from "react";
import axios from "axios";
import "./to-do.css";
import Sidebar from "../components/sidebar";
import { ListTodo } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Base API URL
  const API_URL = "http://localhost:5100/api/todos";

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

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

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(139,92,246,0.1)" }}>
            <ListTodo size={26} color="#8b5cf6" />
          </div>
          <div>
            <h1 className="page-title">TO-DO</h1>
            <p className="page-desc">Track your tasks and goals</p>
          </div>
        </div>
        <div className="todo-page-content">
          <div className="todo-app">
            <div className="todo-card">
              <div className="todo-input-section">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                />
                <button onClick={handleAddTodo}>Add</button>
              </div>
              <div className="todo-list">
                {todos.map((todo) => (
                  <div key={todo.id} className="todo-item">
                    <span>{todo.completed ? "✅" : "📝"} {todo.text}</span>
                    <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>❌</button>
                  </div>
                ))}
                {todos.length === 0 && <p className="todo-empty">No tasks yet — add one above!</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToDo;
