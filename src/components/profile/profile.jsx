import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    console.log(user.name);
  }

  // may be a better way to write this
  return isAuthenticated ? (
    <div>
      <h3>{`Welcome to North Shore, ${user.name}`}</h3>
    </div>
  ) : (
    <div>
      <h3>{`Welcome to North Shore`}</h3>
    </div>
  );
};

export default Profile;
