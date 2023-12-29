import React, { createContext, useContext, useState } from 'react';

// creating instance of context
export const ThemeContext = createContext();

// provider
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook instead of using useContext(ThemeContext) in the component
export const useTheme = () => useContext(ThemeContext);
