import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from '../../../lib/auth0/login.js';
import LogoutButton from '../../../lib/auth0/logout.js';

import './profile.scss';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }

  return (
    <div className="profile">
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <h3>{`Welcome to North Shore, ${
        isAuthenticated ? user.name : `friend`
      }`}</h3>
    </div>
  );
};

export default Profile;
