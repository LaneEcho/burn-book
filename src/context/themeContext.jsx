import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook instead of using useContext(ThemeContext) in the component
export const useTheme = () => useContext(ThemeContext);
