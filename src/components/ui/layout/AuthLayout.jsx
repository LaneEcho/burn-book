import React from 'react';

const AuthLayout = ({ children }) => {
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
