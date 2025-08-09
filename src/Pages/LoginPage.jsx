import React from 'react';
import AuthLayout from '../components/ui/layout/AuthLayout.jsx';
import Login from '../components/auth/Login.jsx';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
