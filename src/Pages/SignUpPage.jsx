import React from 'react';
import AuthLayout from '../components/ui/layout/AuthLayout.jsx';
import SignUp from '../components/auth/Signup.jsx';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
