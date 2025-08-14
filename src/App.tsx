import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './context/authContext';
import Feed from './Pages/Feed';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ForgotPasswordPage from './Pages/PasswordPage';
import ErrorPage from './Pages/ErrorPage';
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
const root = createRoot(container!);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
