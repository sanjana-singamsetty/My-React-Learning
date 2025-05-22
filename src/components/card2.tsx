import React from "react";
import "./card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const Card2: React.FC<CardProps> = ({ title, subtitle, imageUrl, onClick }) => {
  return (
    <div className="dark-card" onClick={onClick}>
      <h2 className="card-title">{title}</h2>
      {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="card-image"
          style={{ width: "600px", height: "600px", borderRadius: "8px" }}
        />
      )}
    </div>
  );
};

export default Card2;
