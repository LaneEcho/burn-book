import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Pages/Feed.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import './App.scss';

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
        <p id="fetch">If you're from Africa, why are you white?</p>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<RouterProvider router={router} />);
