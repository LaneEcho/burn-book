import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
