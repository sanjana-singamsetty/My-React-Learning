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
import Homeland from "./components/land";
import Network from "./pages/network";
import Fullstack from "./pages/Fullstack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homeland />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Information" element={<Info />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/test" element={<Testing />} />
        <Route path="/network" element={<Network />} />
        <Route path="/fullstack" element={<Fullstack />} />
        <Route path="/view" element={<MdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
