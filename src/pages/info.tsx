import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Laugh } from "lucide-react";
import "./info.css";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

const Info: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const all = data.data.memes;
        for (let i = all.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [all[i], all[j]] = [all[j], all[i]];
        }
        setMemes(all.slice(0, 12));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(239,68,68,0.1)" }}>
            <Laugh size={26} color="#ef4444" />
          </div>
          <div>
            <h1 className="page-title">Memes</h1>
            <p className="page-desc">Random trending memes — take a break 😄</p>
          </div>
        </div>

        {loading ? (
          <p className="memes-loading">Fetching memes...</p>
        ) : (
          <div className="memes-grid">
            {memes.map((meme) => (
              <div key={meme.id} className="meme-card">
                <img src={meme.url} alt={meme.name} className="meme-img" />
                <p className="meme-name">{meme.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Info;
