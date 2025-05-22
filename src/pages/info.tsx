import React, { useEffect, useState } from "react";
import Card2 from "../components/card2";
import Sidebar from "../components/sidebar";
import "./info.css";
import Header from "../components/header";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const allMemes = data.data.memes;

        // Fisher-Yates Shuffle
        for (let i = allMemes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allMemes[i], allMemes[j]] = [allMemes[j], allMemes[i]];
        }

        setMemes(allMemes.slice(0, 12));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="sid-container">
      <Header />
      <Sidebar />
      <section className="section">
        <div style={{ padding: "1rem", marginTop: "8rem" }}>
          <h1>Memes</h1>
          <p>This page shows random trending memes from the Imgflip API.</p>

          {loading ? (
            <p>Loading memes...</p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "flex-start",
                alignContent: "center",
                justifyContent: "flex-start",

                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {memes.map((meme) => (
                <Card2 key={meme.id} title={meme.name} imageUrl={meme.url} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Info;
