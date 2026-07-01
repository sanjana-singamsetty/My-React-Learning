import React, { createContext, useContext, useState } from "react";
import { SDContext } from "../types/system-design";

interface SystemDesignCtxType {
  sdContext: SDContext | null;
  setSdContext: (ctx: SDContext | null) => void;
}

const SystemDesignCtx = createContext<SystemDesignCtxType>({
  sdContext: null,
  setSdContext: () => {},
});

export function SystemDesignProvider({ children }: { children: React.ReactNode }) {
  const [sdContext, setSdContext] = useState<SDContext | null>(null);
  return (
    <SystemDesignCtx.Provider value={{ sdContext, setSdContext }}>
      {children}
    </SystemDesignCtx.Provider>
  );
}

export function useSystemDesign() {
  return useContext(SystemDesignCtx);
}
