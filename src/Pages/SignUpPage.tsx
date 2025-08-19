import React from 'react';
import AuthLayout from '../components/ui/layout/AuthLayout';
import SignUp from '../components/auth/Signup';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
