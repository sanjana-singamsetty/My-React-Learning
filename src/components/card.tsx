import React from "react";
import "./card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  content: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, subtitle, content, onClick }) => {
  return (
    <div className="dark-card" onClick={onClick}>
      <h2 className="card-title">{title}</h2>
      {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
    </div>
  );
};

export default Card;
