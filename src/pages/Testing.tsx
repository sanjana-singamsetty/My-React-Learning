import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { TestData } from "../components/Testdata";
import { FlaskConical } from "lucide-react";

const Testing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(249,115,22,0.1)" }}>
            <FlaskConical size={26} color="#f97316" />
          </div>
          <div>
            <h1 className="page-title">Testing & Auth</h1>
            <p className="page-desc">JWT, pipelines, and testing strategies</p>
          </div>
        </div>
        <div className="card-grid">
          {TestData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              content={""}
              color="#f97316"
              badgeLabel="Testing"
              filepath={item.filepath}
              onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Testing;
