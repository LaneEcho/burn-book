import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Pages/Feed.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: (
      <div>
        <h1>Sign Up Page</h1>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
