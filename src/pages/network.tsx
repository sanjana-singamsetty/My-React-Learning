import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { cardData2 } from "../components/date3";
import Card from "../components/card";

const Network: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="sid-container-1">
        <Sidebar />
        <div className="card-grid">
          {cardData2.map((item, index) => (
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

export default Network;
