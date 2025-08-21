import React from 'react';
import AuthLayout from '../components/ui/layout/AuthLayout';
import ForgotPassword from '../components/auth/ForgotPassword';

export default function PasswordPage() {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
}
