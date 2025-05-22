import React from "react";
import Card from "./card";
import { cardData } from "./data";
import "./section.css";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="card-grid">
        {cardData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            content={""}
            onClick={() => {
              navigate(`/view?file=${encodeURIComponent(item.filepath)}`);
              console.log(item.filepath);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Section;
