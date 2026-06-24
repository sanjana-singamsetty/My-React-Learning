import React from "react";
import Sidebar from "../components/sidebar";
import { Github, Linkedin, Mail, Code2, Server, Database, Network, FlaskConical } from "lucide-react";
import "./portfolio.css";

const skills = [
  { label: "React", color: "#8b5cf6", Icon: Code2 },
  { label: "Node.js", color: "#10b981", Icon: Server },
  { label: "MongoDB", color: "#06b6d4", Icon: Database },
  { label: "Networking", color: "#f59e0b", Icon: Network },
  { label: "Testing", color: "#f97316", Icon: FlaskConical },
];

const Portfolio: React.FC = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="portfolio-content">

        {/* Hero */}
        <div className="portfolio-hero">
          <div className="portfolio-avatar">S</div>
          <div className="portfolio-hero-text">
            <h1 className="portfolio-name">Sanjana Singamsetty</h1>
            <p className="portfolio-role">Full Stack Developer in the Making 🚀</p>
            <p className="portfolio-bio">
              Building Quickie to sharpen my MERN stack skills and document everything I learn.
              Passionate about clean code, great UX, and continuous learning.
            </p>
            <div className="portfolio-links">
              <a
                className="portfolio-link"
                href="https://github.com/sanjana-singamsetty"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                className="portfolio-link"
                href="https://linkedin.com/in/sanjana-singamsetty"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                className="portfolio-link"
                href="mailto:singamsettysanjana04@gmail.com"
              >
                <Mail size={18} /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="portfolio-section">
          <h2 className="section-heading">What I'm Learning</h2>
          <div className="skills-grid">
            {skills.map(({ label, color, Icon }) => (
              <div
                key={label}
                className="skill-card"
                style={{ "--skill-color": color } as React.CSSProperties}
              >
                <div className="skill-icon" style={{ background: `${color}18`, color }}>
                  <Icon size={22} />
                </div>
                <span className="skill-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About this app */}
        <section className="portfolio-section">
          <h2 className="section-heading">About Quickie</h2>
          <div className="about-card">
            <p>
              <strong>Quickie</strong> is my personal dev learning hub — a place where I write concise
              notes on everything I study: React hooks, Node.js servers, MongoDB queries, networking
              protocols, and more.
            </p>
            <p>
              The app is built with <strong>React + TypeScript</strong>, uses <strong>react-router-dom</strong> for
              navigation, renders notes as <strong>Markdown</strong> files with syntax highlighting, and features
              a <strong>Spline 3D</strong> animation on the landing page.
            </p>
            <p>
              Everything you see here — the design system, component architecture, and content — was
              built and written by me as part of my learning journey.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Portfolio;
