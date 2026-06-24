import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Code2, Server, Database,
  FlaskConical, Network, Search, User, ChevronLeft, Menu, Sun, Moon,
  Layers, BookMarked, Flame
} from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";
import "./sidebar.css";

const TOTAL_TOPICS = 50;

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/" },
  { label: "React", icon: Code2, route: "/home" },
  { label: "Node & Exp", icon: Server, route: "/about" },
  { label: "Database", icon: Database, route: "/form" },
  { label: "Testing", icon: FlaskConical, route: "/test" },
  { label: "Networking", icon: Network, route: "/network" },
  { label: "Flashcards", icon: Layers, route: "/flashcards" },
  { label: "Cheat Sheet", icon: BookMarked, route: "/cheatsheet" },
  { label: "Search", icon: Search, route: "/search" },
  { label: "About Me", icon: User, route: "/portfolio" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const { readCount, streak } = useProgress();
  const { isDark, toggle } = useTheme();

  const activeIndex = menuItems.findIndex(item => item.route === location.pathname);
  const progressPct = Math.min(100, Math.round((readCount / TOTAL_TOPICS) * 100));

  if (!isOpen) {
    return (
      <button className="sidebar-toggle-btn" onClick={() => setIsOpen(true)}>
        <Menu size={20} />
      </button>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">Q</div>
          <span className="sidebar-name">Quickie</span>
        </div>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <ChevronLeft size={18} />
        </button>
      </div>

      <nav>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className={activeIndex === index ? "active" : ""}
                onClick={() => navigate(item.route)}
              >
                <Icon size={18} className="menu-icon" />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Streak */}
      {streak > 0 && (
        <div className="sidebar-streak">
          <Flame size={15} className="streak-icon" />
          <span className="streak-text">{streak} day streak</span>
        </div>
      )}

      {/* Progress */}
      <div className="sidebar-progress">
        <div className="progress-label">
          <span>Progress</span>
          <span className="progress-count">{readCount} / {TOTAL_TOPICS}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="sidebar-footer">
        <span>© 2025 Sanjana</span>
        <button className="theme-toggle" onClick={toggle} title="Toggle dark mode">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
