import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Form from "./pages/form";
import About from "./pages/about";
import MdPage from "./components/md";
import Testing from "./pages/Testing";
import Homeland from "./components/land";
import Network from "./pages/network";
import Fullstack from "./pages/Fullstack";
import SearchPage from "./pages/search";
import Portfolio from "./pages/portfolio";
import FlashcardsPage from "./pages/flashcards";
import CheatsheetPage from "./pages/cheatsheet";
import PaintWidget from "./components/PaintWidget";
import AIAssistant from "./components/AIAssistant";
import { ProgressProvider } from "./context/ProgressContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homeland />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form" element={<Form />} />
            <Route path="/test" element={<Testing />} />
            <Route path="/network" element={<Network />} />
            <Route path="/fullstack" element={<Fullstack />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/cheatsheet" element={<CheatsheetPage />} />
            <Route path="/view" element={<MdPage />} />
          </Routes>
          <PaintWidget />
          <AIAssistant />
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
