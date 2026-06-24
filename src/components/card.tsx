import React from "react";
import { useProgress } from "../context/ProgressContext";
import "./card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  content: string;
  onClick?: () => void;
  color?: string;
  badgeLabel?: string;
  filepath?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  onClick,
  color = "#8b5cf6",
  badgeLabel,
  filepath,
}) => {
  const { isRead } = useProgress();
  const read = filepath ? isRead(filepath) : false;

  return (
    <div
      className={`dark-card${read ? " is-read" : ""}`}
      onClick={onClick}
      style={{ "--card-color": color } as React.CSSProperties}
    >
      <div className="card-top-bar" />

      <div className="card-header-row">
        {badgeLabel && <span className="card-badge">{badgeLabel}</span>}
        {read && <span className="card-read-check">✓ Read</span>}
      </div>

      <h2 className="card-title">{title}</h2>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <span className="card-arrow">→</span>
    </div>
  );
};

export default Card;
