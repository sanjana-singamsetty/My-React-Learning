import React, { useEffect, useState } from "react";
import axios from "axios";
import "./to-do.css";
import Sidebar from "../components/sidebar";

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
    <div className="todo-container">
      <Sidebar />
      <div className="todo-app">
        <h1 className="title">Task Manager</h1>

        <div className="todo-card">
          <div className="todo-input-section">
            <input
              type="text"
              placeholder="What's on your mind?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add</button>
          </div>

          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <span>
                  {todo.completed ? "✅" : "📝"} {todo.text}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ❌
                </button>
              </div>
            ))}
            {todos.length === 0 && <p>No todos yet!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
