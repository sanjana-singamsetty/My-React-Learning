import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { cardData2 } from "../components/date3";
import Card from "../components/card";
import { Network } from "lucide-react";

const NetworkPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(245,158,11,0.1)" }}>
            <Network size={26} color="#f59e0b" />
          </div>
          <div>
            <h1 className="page-title">Networking</h1>
            <p className="page-desc">Protocols, DNS, IP addressing, and TCP/IP</p>
          </div>
        </div>
        <div className="card-grid">
          {cardData2.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              content={""}
              color="#f59e0b"
              badgeLabel="Network"
              filepath={item.filepath}
              onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NetworkPage;
