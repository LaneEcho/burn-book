import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        style={{
          marginTop: '1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
