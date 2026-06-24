import React from "react";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import { Nodedata } from "../components/node-data";
import { Server } from "lucide-react";

const About: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(16,185,129,0.1)" }}>
            <Server size={26} color="#10b981" />
          </div>
          <div>
            <h1 className="page-title">Node & Express</h1>
            <p className="page-desc">Server-side JavaScript essentials</p>
          </div>
        </div>
        <div className="card-grid">
          {Nodedata.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              content={""}
              color="#10b981"
              badgeLabel="Node"
              filepath={item.filepath}
              onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default About;
