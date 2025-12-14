import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleDark: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDark = () => {
    const value = !dark;
    setDark(value);
    localStorage.setItem("darkMode", String(value));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
