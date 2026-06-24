import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface RecentItem {
  filepath: string;
  title: string;
  color: string;
  visitedAt: number;
}

interface ProgressCtx {
  isRead: (fp: string) => boolean;
  markRead: (fp: string, title?: string, color?: string) => void;
  readCount: number;
  streak: number;
  recentlyVisited: RecentItem[];
  isDueForReview: (fp: string) => boolean;
  getCategoryProgress: (filepaths: string[]) => number;
}

const ProgressContext = createContext<ProgressCtx>({
  isRead: () => false,
  markRead: () => {},
  readCount: 0,
  streak: 0,
  recentlyVisited: [],
  isDueForReview: () => false,
  getCategoryProgress: () => 0,
});

const STORAGE_KEY = "quickie-read";
const STREAK_KEY = "quickie-streak";
const LAST_VISIT_KEY = "quickie-last-visit";
const READ_TIMES_KEY = "quickie-read-times";
const RECENT_KEY = "quickie-recent";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadStreak(): number {
  try { return parseInt(localStorage.getItem(STREAK_KEY) || "0", 10) || 0; }
  catch { return 0; }
}

function updateStreak(current: number): number {
  const today = todayStr();
  const last = localStorage.getItem(LAST_VISIT_KEY) || "";
  if (last === today) return current;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const next = last === yesterday ? current + 1 : 1;
  localStorage.setItem(STREAK_KEY, String(next));
  localStorage.setItem(LAST_VISIT_KEY, today);
  return next;
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readSet, setReadSet] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
    catch { return new Set<string>(); }
  });

  const [readTimes, setReadTimes] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem(READ_TIMES_KEY) || "{}"); }
    catch { return {}; }
  });

  const [streak, setStreak] = useState<number>(() => {
    const s = loadStreak();
    return updateStreak(s);
  });

  const [recentlyVisited, setRecentlyVisited] = useState<RecentItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    const s = loadStreak();
    setStreak(updateStreak(s));
  }, []);

  const markRead = useCallback((fp: string, title?: string, color?: string) => {
    const now = Date.now();

    setReadSet((prev) => {
      if (prev.has(fp)) return prev;
      const next = new Set(prev);
      next.add(fp);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });

    setReadTimes((prev) => {
      const next = { ...prev, [fp]: now };
      localStorage.setItem(READ_TIMES_KEY, JSON.stringify(next));
      return next;
    });

    if (title) {
      setRecentlyVisited((prev) => {
        const filtered = prev.filter((r) => r.filepath !== fp);
        const next = [
          { filepath: fp, title, color: color || "#8b5cf6", visitedAt: now },
          ...filtered,
        ].slice(0, 8);
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
        return next;
      });
    }

    setStreak((s) => updateStreak(s));
  }, []);

  const isRead = useCallback((fp: string) => readSet.has(fp), [readSet]);

  const isDueForReview = useCallback(
    (fp: string) => {
      const t = readTimes[fp];
      if (!t) return false;
      return Date.now() - t > 3 * 24 * 60 * 60 * 1000;
    },
    [readTimes]
  );

  const getCategoryProgress = useCallback(
    (filepaths: string[]) => {
      if (!filepaths.length) return 0;
      const read = filepaths.filter((fp) => readSet.has(fp)).length;
      return Math.round((read / filepaths.length) * 100);
    },
    [readSet]
  );

  return (
    <ProgressContext.Provider
      value={{ isRead, markRead, readCount: readSet.size, streak, recentlyVisited, isDueForReview, getCategoryProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
