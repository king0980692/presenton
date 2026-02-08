"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { ThemeDefinition, themeToCSS } from "./theme.schema";

interface ThemeContextType {
  theme: ThemeDefinition | null;
  cssVars: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  cssVars: {},
});

interface ThemeProviderProps {
  theme?: ThemeDefinition | null;
  children: ReactNode;
}

/**
 * ThemeProvider injects theme CSS variables onto a wrapper div.
 * Existing templates use `var(--xxx, fallback)` syntax, so injecting
 * these variables makes them take effect automatically.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const cssVars = useMemo(() => {
    if (!theme) return {};
    return themeToCSS(theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ theme: theme ?? null, cssVars }),
    [theme, cssVars]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
