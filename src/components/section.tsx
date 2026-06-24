import React from "react";
import Card from "./card";
import { cardData } from "./data";
import { useNavigate } from "react-router-dom";

const getCardMeta = (subtitle: string = ""): { color: string; label: string } => {
  const lower = subtitle.toLowerCase();
  if (lower.includes("hook")) return { color: "#ec4899", label: "Hook" };
  if (lower.includes("redux")) return { color: "#f97316", label: "Redux" };
  return { color: "#8b5cf6", label: "React" };
};

const Section: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="card-grid">
      {cardData.map((item, index) => {
        const { color, label } = getCardMeta(item.subtitle);
        return (
          <Card
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            content={""}
            color={color}
            badgeLabel={label}
            filepath={item.filepath}
            onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
          />
        );
      })}
    </div>
  );
};

export default Section;
