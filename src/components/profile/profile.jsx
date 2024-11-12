import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './profile.scss';

const Profile = () => {
  const { user } = useAuth();

  console.log(user?.user_metadata.username);

  return (
    <div className="profile">
      <Link to={'/login'}>Log In</Link>
      <h3>{`Welcome to North Shore, ${
        user ? user?.user_metadata.username : `friend`
      }`}</h3>
    </div>
  );
};

export default Profile;
