import React, { useState, useRef, useEffect } from "react";
import { Palette, X, Trash2, Download } from "lucide-react";
import "./PaintWidget.css";

const COLORS = [
  "#1a1a2e", "#ec4899", "#8b5cf6", "#10b981",
  "#f97316", "#f59e0b", "#06b6d4", "#3b82f6",
  "#ef4444", "#ffffff",
];

const PaintWidget: React.FC = () => {
  const [pos, setPos] = useState({ x: 24, y: window.innerHeight - 90 });
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("#1a1a2e");
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);

  /* ── Drag logic ── */
  const handleFabMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragMoved.current = false;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setIsDragging(true);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      dragMoved.current = true;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 56, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 56, e.clientY - dragOffset.current.y)),
      });
    };
    const onUp = () => {
      if (isDragging && !dragMoved.current) setIsOpen(true);
      setIsDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  /* ── Canvas init ── */
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !canvasRef.current) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }, 40);
    return () => clearTimeout(t);
  }, [isOpen]);

  /* ── Drawing ── */
  const getXY = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    lastPoint.current = getXY(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d")!;
    const p = getXY(e);
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineWidth = isEraser ? brushSize * 4 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPoint.current = p;
  };

  const endDraw = () => { isDrawing.current = false; };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  const savePNG = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.download = "quickie-sketch.png";
    a.href = canvasRef.current.toDataURL("image/png");
    a.click();
  };

  return (
    <>
      {/* Floating draggable button */}
      <div
        className={`paint-fab${isDragging ? " dragging" : ""}`}
        style={{ left: pos.x, top: pos.y }}
        onMouseDown={handleFabMouseDown}
        title="Open Sketchpad (drag to move)"
      >
        <Palette size={22} />
      </div>

      {/* Drawing panel */}
      {isOpen && (
        <div className="paint-overlay" onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div className="paint-panel">
            <div className="paint-toolbar">
              <div className="paint-colors">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    className={`color-dot${color === c && !isEraser ? " active" : ""}`}
                    style={{
                      background: c,
                      border: c === "#ffffff" ? "2px solid #ccc" : "2px solid transparent",
                    }}
                    onClick={() => { setColor(c); setIsEraser(false); }}
                  />
                ))}
              </div>

              <div className="paint-divider" />

              <div className="brush-wrap">
                <span className="brush-label">Size</span>
                <input
                  type="range" min={1} max={24} value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="brush-slider"
                />
                <span className="brush-val">{brushSize}</span>
              </div>

              <div className="paint-divider" />

              <button
                className={`tool-btn${isEraser ? " active" : ""}`}
                onClick={() => setIsEraser((p) => !p)}
                title="Eraser"
              >⬜</button>

              <button className="tool-btn" onClick={clearCanvas} title="Clear canvas">
                <Trash2 size={15} />
              </button>

              <button className="tool-btn save-btn" onClick={savePNG} title="Save as PNG">
                <Download size={15} />
              </button>

              <div style={{ flex: 1 }} />

              <button className="tool-btn close-paint" onClick={() => setIsOpen(false)} title="Close">
                <X size={15} />
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={920}
              height={540}
              className="paint-canvas"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaintWidget;
