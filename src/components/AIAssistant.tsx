import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Loader } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import "./AIAssistant.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "Quiz me on React hooks",
  "Explain useEffect simply",
  "What should I study next?",
  "Difference between JWT and sessions",
];

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { readCount, recentlyVisited } = useProgress();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const systemPrompt = `You are a friendly, concise study assistant for "Quickie" — a personal dev learning app covering React, Node.js, MongoDB, Testing, and Networking.

User stats:
- Topics read: ${readCount} / 50
- Recently visited: ${recentlyVisited.slice(0, 3).map((r) => r.title).join(", ") || "none yet"}

Guidelines:
- Be encouraging and concise (2-4 sentences max per point)
- For quizzes: ask ONE question at a time, wait for answer, then tell if correct
- For explanations: use analogies and simple language
- For "what should I study next": reference recently visited topics and suggest logical next steps
- Never write huge walls of text`;

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading || !GROQ_API_KEY) return;

    const userMsg: Message = { role: "user", content: msg };
    const updated = [...messages, userMsg];
    setMessages([...updated, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 512,
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...updated.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as any)?.error?.message || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (delta) {
                fullText += delta;
                setMessages([...updated, { role: "assistant", content: fullText + "▌" }]);
              }
            } catch {}
          }
        }
      }

      setMessages([...updated, { role: "assistant", content: fullText }]);
    } catch (err: any) {
      setMessages([
        ...updated,
        { role: "assistant", content: `⚠️ ${err.message || "Couldn't reach AI. Check your Groq key."}` },
      ]);
    }

    setLoading(false);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <button
        className={`ai-fab${isOpen ? " ai-fab-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="AI Study Assistant"
      >
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {isOpen && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <div className="ai-panel-title">
              <Bot size={18} />
              <span>AI Study Assistant</span>
            </div>
            <span className="ai-model-tag">Groq · Llama 3.3</span>
          </div>

          {!GROQ_API_KEY ? (
            <div className="ai-no-key">
              <p>Add your Groq API key to <code>.env</code>:</p>
              <code className="ai-key-hint">REACT_APP_GROQ_API_KEY=gsk_...</code>
              <p>Then restart the dev server.</p>
            </div>
          ) : (
            <>
              <div className="ai-messages">
                {messages.length === 0 && (
                  <div className="ai-welcome">
                    <div className="ai-welcome-icon">🤖</div>
                    <p>Hi! I'm your AI study assistant. Ask me anything about your dev topics.</p>
                    <div className="ai-starters">
                      {STARTERS.map((s) => (
                        <button key={s} className="ai-starter-btn" onClick={() => sendMessage(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                    {m.role === "assistant" && (
                      <div className="ai-msg-avatar"><Bot size={13} /></div>
                    )}
                    <div className="ai-msg-bubble">
                      {m.content === "" && loading
                        ? <Loader size={13} className="ai-spin" />
                        : m.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="ai-input-row">
                <input
                  ref={inputRef}
                  className="ai-input"
                  placeholder="Ask anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                />
                <button
                  className="ai-send-btn"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
