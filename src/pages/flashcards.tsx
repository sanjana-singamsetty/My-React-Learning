import React, { useState, useMemo } from "react";
import Sidebar from "../components/sidebar";
import { flashcards, Flashcard } from "../data/flashcardData";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from "lucide-react";
import "./flashcards.css";

const CATEGORIES = ["All", "React", "Hooks", "Node", "Database", "Testing", "Networking"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsPage() {
  const [category, setCategory] = useState("All");
  const [deck, setDeck] = useState<Flashcard[]>(() => shuffle(flashcards));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const filtered = useMemo(() => {
    const base = category === "All" ? flashcards : flashcards.filter((f) => f.category === category);
    return deck.filter((f) => base.some((b) => b.id === f.id));
  }, [category, deck]);

  const card = filtered[index];
  const progress = filtered.length ? Math.round(((index) / filtered.length) * 100) : 0;

  function next(markKnown: boolean) {
    if (!card) return;
    if (markKnown) setKnown((k) => new Set(k).add(card.id));
    setFlipped(false);
    setTimeout(() => {
      if (index + 1 >= filtered.length) setDone(true);
      else setIndex(index + 1);
    }, 180);
  }

  function reshuffleAll() {
    setDeck(shuffle(flashcards));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setDone(false);
  }

  function changeCategory(cat: string) {
    setCategory(cat);
    setIndex(0);
    setFlipped(false);
    setDone(false);
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content fc-page">

        <div className="fc-header">
          <div>
            <h1 className="page-title">Flashcards</h1>
            <p className="page-desc">Flip to reveal answers · Mark what you know</p>
          </div>
          <button className="fc-shuffle-btn" onClick={reshuffleAll} title="Shuffle deck">
            <Shuffle size={16} /> Shuffle
          </button>
        </div>

        {/* Category filter */}
        <div className="fc-cats">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`fc-cat-btn${category === c ? " active" : ""}`}
              onClick={() => changeCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="fc-progress-row">
          <span className="fc-progress-label">{index} / {filtered.length}</span>
          <div className="fc-progress-track">
            <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="fc-known">{known.size} known</span>
        </div>

        {/* Card */}
        {done ? (
          <div className="fc-done">
            <div className="fc-done-emoji">🎉</div>
            <h2>Deck complete!</h2>
            <p>You marked <strong>{known.size}</strong> / {filtered.length} cards as known.</p>
            <button className="fc-restart-btn" onClick={reshuffleAll}>
              <RotateCcw size={16} /> Restart
            </button>
          </div>
        ) : card ? (
          <>
            <div className={`fc-card${flipped ? " fc-flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
              <div className="fc-card-inner">
                <div className="fc-card-front" style={{ borderTop: `4px solid ${card.color}` }}>
                  <span className="fc-cat-tag" style={{ color: card.color, background: `${card.color}18` }}>
                    {card.category}
                  </span>
                  <p className="fc-question">{card.question}</p>
                  <span className="fc-hint">Click to reveal answer</span>
                </div>
                <div className="fc-card-back" style={{ borderTop: `4px solid ${card.color}` }}>
                  <span className="fc-cat-tag" style={{ color: card.color, background: `${card.color}18` }}>
                    Answer
                  </span>
                  <p className="fc-answer">{card.answer}</p>
                </div>
              </div>
            </div>

            {flipped && (
              <div className="fc-actions">
                <button className="fc-btn fc-btn-skip" onClick={() => next(false)}>
                  <ChevronLeft size={18} /> Still learning
                </button>
                <button className="fc-btn fc-btn-know" onClick={() => next(true)}>
                  Got it! <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="fc-done">
            <p>No cards in this category.</p>
          </div>
        )}

      </main>
    </div>
  );
}
