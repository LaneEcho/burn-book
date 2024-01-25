import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import FormComponent from '../form/form.jsx';
import PostItem from '../postItem/postItem.jsx';
import Profile from '../profile/profile.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './container.scss';

function Container() {
  const { data, loading, error } = useFetch('/getBurns');
  const { darkMode, toggleTheme } = useTheme();

  // allItems is displaying other items on page
  // usually burn entries but could also be errors
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

  console.log(data); // is an array of objects

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
        <Profile></Profile>
        <FormComponent />
        <IconButton onClick={toggleTheme}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </aside>
      <section className={`burn-entries ${darkMode ? 'dark' : ''}`}>
        {loading ? <p>Loading...</p> : allItems}
      </section>
    </div>
  );
}

export default Container;
