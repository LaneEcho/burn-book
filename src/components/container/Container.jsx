import React, { useState, useEffect } from 'react';
import FormComponent from '../form/Form.jsx';
import PostItem from '../postItem/PostItem.jsx';
import Profile from '../profile/Profile.jsx';
import { useTheme } from '../../context/themeContext.jsx';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './container.scss';
import { useFetchBurns } from '../../hooks/fetchQuery.jsx';

function Container() {
  const { isLoading, error, data } = useFetchBurns();

  const { darkMode, toggleTheme } = useTheme();

  const allItems = [];

  if (error) {
    allItems.push(
      <div className="error">
        <p>We couldn't make fetch happen.</p>
        <p>Try again later.</p>
      </div>
    );
  }

  if (!isLoading && data !== null) {
    for (let i = 0; i < data.length; i++) {
      allItems.push(
        <PostItem
          comment={data[i].message}
          key={i}
          id={data[i].id}
          username={data[i].username}
          onDelete={() => handleDelete(i)}
        />
      );
    }
  }

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      {/* make sidebar a different component */}
      <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
        <Profile></Profile>
        <FormComponent />
        <IconButton onClick={toggleTheme}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </aside>
      <section className={`burn-entries ${darkMode ? 'dark' : ''}`}>
        {isLoading ? <p>Loading...</p> : allItems}
      </section>
    </div>
  );
}

export default Container;
