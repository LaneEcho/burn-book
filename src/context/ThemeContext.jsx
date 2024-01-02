import React, { createContext, useContext, useState } from 'react';

// creating instance of context
export const ThemeContext = createContext({ theme: 'light', undefined });

// provider
export const ThemeProvider = ({ children }) => {
  // could also use localstorage to save theme preference
  const [theme, setTheme] = useState('light');

  // function toggleTheme() {
  //   setDarkMode(!darkMode);
  //   document.documentElement.classList.toggle('dark');
  // }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook instead of using useContext(ThemeContext) in the component
export const useTheme = () => useContext(ThemeContext);
