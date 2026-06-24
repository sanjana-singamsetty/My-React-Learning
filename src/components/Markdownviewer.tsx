import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, StickyNote, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import "./md.css";

interface MarkdownViewerProps {
  filePath: string;
}

const categoryMap: Record<string, { label: string; color: string; mins: number }> = {
  learning:   { label: "React", color: "#8b5cf6", mins: 5 },
  hooks:      { label: "React Hooks", color: "#ec4899", mins: 6 },
  nodejs:     { label: "Node & Express", color: "#10b981", mins: 7 },
  Database:   { label: "Database", color: "#06b6d4", mins: 5 },
  Testing:    { label: "Testing", color: "#f97316", mins: 6 },
  networking: { label: "Networking", color: "#f59e0b", mins: 5 },
  Fullstack:  { label: "Fullstack", color: "#3b82f6", mins: 8 },
};

const getBreadcrumb = (filePath: string) => {
  const parts = filePath.split("/").filter(Boolean);
  const catKey = parts[0] || "";
  const rawFile = parts[parts.length - 1]?.replace(".md", "") || "";
  const cleanFile = rawFile
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const cat = categoryMap[catKey] || { label: catKey, color: "#8b5cf6", mins: 5 };
  return { category: cat.label, color: cat.color, file: cleanFile, mins: cat.mins };
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ filePath }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState<string>(() => {
    return localStorage.getItem(`quickie-note-${filePath}`) || "";
  });
  const navigate = useNavigate();
  const { markRead } = useProgress();
  const { category, color, file, mins } = getBreadcrumb(filePath);

  useEffect(() => {
    setLoading(true);
    markRead(filePath, file, color);
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.text();
      })
      .then((text) => { setContent(text); setLoading(false); })
      .catch(() => {
        setContent("# Not Found\nCould not load this note.");
        setLoading(false);
      });
  }, [filePath]); // eslint-disable-line react-hooks/exhaustive-deps

  function saveNote(val: string) {
    setNote(val);
    localStorage.setItem(`quickie-note-${filePath}`, val);
  }

  return (
    <div className="md-page">
      {/* Top bar */}
      <div className="md-topbar" style={{ borderBottom: `3px solid ${color}20` }}>
        <button className="md-back-btn" style={{ "--btn-color": color } as React.CSSProperties} onClick={() => navigate(-1)}>
          <ArrowLeft size={15} />
          Back
        </button>
        <div className="md-breadcrumb">
          <span className="bc-cat" style={{ color }}>{category}</span>
          <span className="bc-sep">/</span>
          <span className="bc-file">{file}</span>
        </div>
        <div className="md-topbar-right">
          <span className="md-read-time"><Clock size={12} /> ~{mins} min</span>
          <button
            className={`md-note-btn${noteOpen ? " active" : ""}`}
            onClick={() => setNoteOpen(!noteOpen)}
            style={{ color: noteOpen ? color : undefined }}
            title="Sticky note"
          >
            <StickyNote size={16} />
            {note && <span className="md-note-dot" style={{ background: color }} />}
          </button>
          <div className="bc-dot" style={{ background: color }} />
        </div>
      </div>

      {/* Sticky note panel */}
      {noteOpen && (
        <div className="md-sticky-panel" style={{ borderLeft: `4px solid ${color}` }}>
          <p className="md-sticky-label" style={{ color }}>My Notes</p>
          <textarea
            className="md-sticky-textarea"
            placeholder="Jot down anything about this topic..."
            value={note}
            onChange={(e) => saveNote(e.target.value)}
            rows={6}
          />
        </div>
      )}

      {/* Content */}
      <div className="md-body">
        <div className="md-hero-title" style={{ borderLeft: `5px solid ${color}` }}>
          <p className="md-hero-tag" style={{ color }}>{category}</p>
          <h1 className="md-hero-h1">{file}</h1>
        </div>

        {loading ? (
          <div className="md-loading">Loading...</div>
        ) : (
          <div className="md-content">
            <ReactMarkdown
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: "12px",
                        margin: "1.2rem 0",
                        fontSize: "0.88rem",
                        border: "2px solid #e9e5ff",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="inline-code" {...rest}>{children}</code>
                  );
                },
                table: ({ node, ...props }) => (
                  <table className="markdown-table" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownViewer;
