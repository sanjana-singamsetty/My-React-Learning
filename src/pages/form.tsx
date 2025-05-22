import React from "react";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";

import "./about.css";
import { dbdata } from "../components/Dbdata";

const About: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="sid-container-1">
        <Sidebar />
        <div className="card-grid">
          {dbdata.map((item, index) => (
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

export default About;
