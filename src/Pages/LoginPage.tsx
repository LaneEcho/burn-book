import React from 'react';
import AuthLayout from '../components/ui/layout/AuthLayout';
import Login from '../components/auth/Login';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
