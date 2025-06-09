import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { cardData3 } from "../components/data4";

const Fullstack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="sid-container-1">
        <Sidebar />
        <div className="card-grid">
          {cardData3.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Fullstack;
