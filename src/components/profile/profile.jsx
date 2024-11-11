import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './profile.scss';

const Profile = () => {
  const { authUser } = useAuth();

  return (
    <div className="profile">
      <h3>{`Welcome to North Shore, ${authUser ? authUser : `friend`}`}</h3>
    </div>
  );
};

export default Profile;
