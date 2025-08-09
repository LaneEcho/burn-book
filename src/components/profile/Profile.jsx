import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/authContext.jsx';
import './profile.scss';

const Profile = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="profile">
      <Link to={'/login'}>
        <button>Log In</button>
      </Link>
      <button onClick={() => signOut()}>Log Out</button>
      <h3>{`Welcome to North Shore, ${
        user ? user?.user_metadata.username : `Biatch`
      }`}</h3>
    </div>
  );
};

export default Profile;
