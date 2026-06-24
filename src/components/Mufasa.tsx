import React from "react";
import Spline from "@splinetool/react-spline";
import { Zap, BookOpen, Rocket, ArrowRight, Clock, Layers, BookMarked } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import "./mufasa.css";

const stats = [
  { emoji: "📚", label: "20+ Topics" },
  { emoji: "🗂️", label: "5 Categories" },
  { emoji: "🚀", label: "Always Growing" },
];

const chips = ["React", "Node.js", "MongoDB", "Testing", "Networking"];

const features = [
  {
    Icon: Zap,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    title: "Quick Ramp-up",
    desc: "Essential topics at your fingertips — concise overviews of React and the MERN stack.",
  },
  {
    Icon: BookOpen,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    title: "Syntax & Rules",
    desc: "Core syntax, best practices, and patterns for writing clean, maintainable code.",
  },
  {
    Icon: Rocket,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.1)",
    title: "Learn by Doing",
    desc: "From routing to state, API integration, and more — every page builds real knowledge.",
  },
];

export default function Mufasa() {
  const navigate = useNavigate();
  const { recentlyVisited, readCount, streak } = useProgress();

  return (
    <div className="mufasa-container">
      <div className="mufasa-wrapper">

        {/* Topic chips */}
        <div className="mufasa-chips">
          {chips.map((c) => (
            <span key={c} className="topic-chip">{c}</span>
          ))}
          {streak > 0 && (
            <span className="topic-chip streak-chip">🔥 {streak} day streak</span>
          )}
        </div>

        {/* Hero heading */}
        <div className="mufasa-hero">
          <h1 className="mufasa-heading">
            Welcome to <span className="heading-gradient">Quickie</span>
          </h1>
          <p className="mufasa-subtitle">
            Your personal dev learning companion for{" "}
            <strong>React</strong>, <strong>Node.js</strong>, and{" "}
            <strong>Databases</strong>.
          </p>

          {/* Stats */}
          <div className="mufasa-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat-pill">
                <span>{s.emoji}</span>
                <span>{s.label}</span>
              </div>
            ))}
            {readCount > 0 && (
              <div className="stat-pill stat-pill-read">
                <span>✓</span>
                <span>{readCount} topics read</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mufasa-cta-row">
            <button className="cta-btn" onClick={() => navigate("/home")}>
              Start Exploring <ArrowRight size={18} />
            </button>
            <button className="cta-btn cta-btn-secondary" onClick={() => navigate("/flashcards")}>
              <Layers size={16} /> Flashcards
            </button>
            <button className="cta-btn cta-btn-secondary" onClick={() => navigate("/cheatsheet")}>
              <BookMarked size={16} /> Cheat Sheet
            </button>
          </div>
        </div>

        {/* 3D Animation */}
        <div className="spline-wrapper">
          <Spline scene="https://prod.spline.design/i8eNphGELT2tDQVT/scene.splinecode" />
        </div>

        {/* Recently Visited */}
        {recentlyVisited.length > 0 && (
          <div className="mufasa-section">
            <h2 className="mufasa-section-title">
              <Clock size={18} /> Continue Learning
            </h2>
            <div className="mufasa-recent-grid">
              {recentlyVisited.slice(0, 4).map((item) => (
                <div
                  key={item.filepath}
                  className="mufasa-recent-card"
                  style={{ "--recent-color": item.color } as React.CSSProperties}
                  onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
                >
                  <div className="recent-dot" style={{ background: item.color }} />
                  <span className="recent-title">{item.title}</span>
                  <ArrowRight size={14} className="recent-arrow" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature cards */}
        <div className="mufasa-cards">
          {features.map(({ Icon, color, bg, title, desc }) => (
            <div key={title} className="mufasa-card">
              <div className="feature-icon" style={{ background: bg, color }}>
                <Icon size={22} />
              </div>
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
