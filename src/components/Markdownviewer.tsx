import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./md.css";

interface MarkdownViewerProps {
  filePath: string;
}

const formatMarkdownTable = (raw: string): string => {
  const lines = raw.trim().split("\n");
  const output: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("|") && !lines[i].startsWith("|")) {
      lines[i] = "|" + lines[i]; // Ensure lines start with pipe
    }
  }

  const tableRegex = /^\|(.+?)\|$/;

  let i = 0;
  while (i < lines.length) {
    if (tableRegex.test(lines[i])) {
      const tableBlock: string[] = [];

      while (i < lines.length && tableRegex.test(lines[i])) {
        tableBlock.push(lines[i]);
        i++;
      }

      const rows = tableBlock.map((line) =>
        line
          .trim()
          .split("|")
          .map((cell) => cell.trim())
          .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1)
      );

      const colWidths: number[] = [];
      rows.forEach((row) =>
        row.forEach((cell, i) => {
          colWidths[i] = Math.max(colWidths[i] || 0, cell.length);
        })
      );

      const formatted = rows.map((row, idx) => {
        const cells = row.map((cell, i) => cell.padEnd(colWidths[i]));
        return `| ${cells.join(" | ")} |`;
      });

      // Add separator if missing
      if (formatted.length > 1 && !formatted[1].includes("---")) {
        const separator = `| ${colWidths
          .map((w) => "-".repeat(w))
          .join(" | ")} |`;
        formatted.splice(1, 0, separator);
      }

      output.push(...formatted);
    } else {
      output.push(lines[i]);
      i++;
    }
  }

  return output.join("\n");
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ filePath }) => {
  const [content, setContent] = useState<string>("Loading...");

  useEffect(() => {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then((text) => {
        const formatted = formatMarkdownTable(text);
        setContent(formatted);
      })
      .catch(() => setContent("Failed to load markdown file."));
  }, [filePath]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <ReactMarkdown
        components={{
          table: ({ node, ...props }) => (
            <table className="markdown-table" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
