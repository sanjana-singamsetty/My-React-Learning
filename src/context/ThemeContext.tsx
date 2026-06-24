import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => {} });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("quickie-theme") === "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("quickie-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark((p) => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
