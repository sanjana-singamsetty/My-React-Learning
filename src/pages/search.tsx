import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import { Search } from "lucide-react";
import { cardData } from "../components/data";
import { Nodedata } from "../components/node-data";
import { TestData } from "../components/Testdata";
import { cardData2 } from "../components/date3";
import { dbdata } from "../components/Dbdata";
import { cardData3 } from "../components/data4";
import "./search.css";

const allTopics = [
  ...cardData.map((d) => ({ ...d, category: "React", color: "#8b5cf6" })),
  ...Nodedata.map((d) => ({ ...d, category: "Node", color: "#10b981" })),
  ...TestData.map((d) => ({ ...d, category: "Testing", color: "#f97316" })),
  ...cardData2.map((d) => ({ ...d, category: "Networking", color: "#f59e0b" })),
  ...dbdata.map((d) => ({ ...d, category: "Database", color: "#06b6d4" })),
  ...cardData3.map((d) => ({ ...d, category: "Fullstack", color: "#3b82f6" })),
];

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.subtitle || "").toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-header">
          <div className="page-header-icon" style={{ background: "rgba(139,92,246,0.1)" }}>
            <Search size={26} color="#8b5cf6" />
          </div>
          <div>
            <h1 className="page-title">Search</h1>
            <p className="page-desc">Find any topic across all categories</p>
          </div>
        </div>

        {/* Search input */}
        <div className="search-input-wrap">
          <Search size={20} className="search-icon-inner" />
          <input
            className="search-input"
            type="text"
            placeholder="Search React, hooks, MongoDB, JWT..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery("")}>✕</button>
          )}
        </div>

        {/* Results */}
        {query.trim() && (
          <p className="search-count">
            {results.length} result{results.length !== 1 ? "s" : ""} for <strong>"{query}"</strong>
          </p>
        )}

        {results.length > 0 && (
          <div className="card-grid">
            {results.map((item, i) => (
              <Card
                key={i}
                title={item.title}
                subtitle={item.subtitle}
                content=""
                color={item.color}
                badgeLabel={item.category}
                onClick={() => navigate(`/view?file=${encodeURIComponent(item.filepath)}`)}
              />
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="search-empty">
            <p>No results for <strong>"{query}"</strong></p>
            <p className="search-empty-sub">Try a different keyword — React, hooks, HTTP, JWT, DNS...</p>
          </div>
        )}

        {!query.trim() && (
          <div className="search-hints">
            <p className="hints-label">Try searching for</p>
            <div className="hints-grid">
              {["useState", "MongoDB", "JWT", "DNS", "Express", "Redux"].map((h) => (
                <button key={h} className="hint-chip" onClick={() => setQuery(h)}>{h}</button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
