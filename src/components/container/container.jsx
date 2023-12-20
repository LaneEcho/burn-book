import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import FormComponent from '../form/form.jsx';
import PostItem from '../postItem/postItem.jsx';
import './container.scss';

import Profile from '../profile/profile.jsx';

function Container() {
  // initial fetch of data to be displayed
  const { data, loading, error } = useFetch('/getBurnss');

  // allItems is
  const allItems = [];
  if (error) {
    allItems.push(
      <div className="error">
        <p>We couldn't make fetch happen.</p>
        <p>Try again later.</p>
      </div>
    );
  }
  if (!loading && data !== null) {
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
      <div className="sidebar">
        <Profile></Profile>
        <FormComponent />
      </div>
      <div className="burn-entries">{allItems}</div>
    </div>
  );
}

export default Container;
