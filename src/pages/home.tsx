import React from "react";
import Sidebar from "../components/sidebar";
import Section from "../components/section";
import { Code2 } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(139,92,246,0.1)" }}>
            <Code2 size={26} color="#8b5cf6" />
          </div>
          <div>
            <h1 className="page-title">React</h1>
            <p className="page-desc">Core concepts, hooks, and patterns</p>
          </div>
        </div>
        <Section />
      </main>
    </div>
  );
};

export default Home;
