import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './context/authContext.jsx';
import Feed from './Pages/Feed.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import ForgotPasswordPage from './Pages/PasswordPage.jsx';
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
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgotpassword',
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
