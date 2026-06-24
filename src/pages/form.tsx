import React from "react";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import { dbdata } from "../components/Dbdata";
import { Database } from "lucide-react";

const Form: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(6,182,212,0.1)" }}>
            <Database size={26} color="#06b6d4" />
          </div>
          <div>
            <h1 className="page-title">Database</h1>
            <p className="page-desc">MongoDB, JSON, and data models</p>
          </div>
        </div>
        <div className="card-grid">
          {dbdata.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              content={""}
              color="#06b6d4"
              badgeLabel="MongoDB"
              filepath={item.filepath}
              onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Form;
