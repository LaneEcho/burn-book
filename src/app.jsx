import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Feed.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />,
  },
  {
    path: '/login',
    element: <div>this is login page</div>,
  },
]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
