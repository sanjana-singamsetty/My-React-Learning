import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { cardData3 } from "../components/data4";
import { Layers } from "lucide-react";

const Fullstack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(59,130,246,0.1)" }}>
            <Layers size={26} color="#3b82f6" />
          </div>
          <div>
            <h1 className="page-title">Fullstack</h1>
            <p className="page-desc">HTML, and end-to-end concepts</p>
          </div>
        </div>
        <div className="card-grid">
          {cardData3.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              content={""}
              color="#3b82f6"
              badgeLabel="Fullstack"
              filepath={item.filepath}
              onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Fullstack;
