import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    "Home",
    "Node-Exp",
    "Database",
    "Testing",
    "Memes",
    "TO-DO",
  ];
  const menuRoutes = ["/", "/about", "/form", "/test", "/Information", "/todo"];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true); // Track if sidebar is open

  useEffect(() => {
    const index = menuRoutes.findIndex((route) => route === location.pathname);
    setActiveIndex(index);
  }, [location.pathname, menuRoutes]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>MyApp</span>
        <button className="close-btn" onClick={toggleSidebar}>
          ✖
        </button>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={item}
            className={activeIndex === index ? "active" : ""}
            onClick={() => navigate(menuRoutes[index])}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">© 2025 Sanjana</div>
    </div>
  );
};

export default Sidebar;
