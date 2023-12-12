import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import styles from './App.scss';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
