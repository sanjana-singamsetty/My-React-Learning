import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Info from "./pages/info";
import Form from "./pages/form";
import About from "./pages/about";
import ToDo from "./pages/to-do";
import MdPage from "./components/md";
import Testing from "./pages/Testing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Information" element={<Info />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/test" element={<Testing />} />
        <Route path="/view" element={<MdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
