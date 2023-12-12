import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import FormComponent from '../form/form.jsx';
import PostItem from '../postItem/postItem.jsx';
import './container.scss';

import LoginButton from '../../../lib/auth0/login.js';
import LogoutButton from '../../../lib/auth0/logout.js';
import Profile from '../profile/profile.jsx';

function Container() {
  // initial fetch of data to be displayed
  const { data, loading, error } = useFetch('/getBurns');

  // populate with burns after fetch is successful
  // is there a way to make this faster?
  const allItems = [];
  if (!loading && data !== null) {
    // iterate to create a new <PostItem > component for each entry
    for (let i = 0; i < data.length; i++) {
      allItems.push(
        <PostItem
          comment={data[i].message}
          key={i}
          id={data[i].id}
          onDelete={() => handleDelete(i)}
        />
      );
    }
  }
  return (
    <div className="container">
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <Profile></Profile>
      <h2>Say Something Behind Your Friend's Back</h2>
      <FormComponent />
      <div className="burn-entries">{allItems}</div>
    </div>
  );
}

export default Container;
