import React from "react";
import "./mufasa.css";
import Spline from "@splinetool/react-spline";

export default function Mufasa() {
  return (
    <div className="mufasa-container">
      <div className="animation">
        <Spline scene="https://prod.spline.design/i8eNphGELT2tDQVT/scene.splinecode" />
      </div>
      <div className="mufasa-wrapper">
        {/* Heading */}
        <div className="mufasa-header">
          <h1>
            Welcome to <span>Quickie</span>
          </h1>
          <p>
            A simple crisp overview of topics like <strong>React</strong>,{" "}
            <strong>Node.js</strong>, and <strong>DataBases</strong>.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mufasa-cards">
          <div className="mufasa-card">
            <div className="icon">✨</div>
            <h2>A very Quick Rampl</h2>
            <p>
              This page brings essential topics right to your fingertips —
              offering a concise and clear overview of key concepts in React and
              the MERN stack.
            </p>
          </div>

          <div className="mufasa-card">
            <div className="icon">🎨</div>
            <h2>Syntax and Rules </h2>
            <p>
              This page breaks down the core syntax and fundamental rules of
              React and MERN stack development. It offers straightforward
              explanations and best practices to help you write clean,
              efficient, and maintainable code.
            </p>
          </div>

          <div className="mufasa-card">
            <div className="icon">🚀</div>
            <h2>Learn by Doing</h2>
            <p>
              Each page is crafted to help you master core frontend topics —
              from routing to state, API integration, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
