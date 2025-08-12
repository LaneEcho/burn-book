import React from 'react';
import AuthLayout from '../components/ui/layout/AuthLayout.jsx';
import ForgotPassword from '../components/auth/ForgotPassword.jsx';

export default function PasswordPage() {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
}
