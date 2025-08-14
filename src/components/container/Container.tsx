import React from 'react';
import { useTheme } from '../../context/themeContext';
import { useFetchBurns } from '../../hooks/fetchQuery.jsx';
import FormComponent from '../form/Form.jsx';
import PostItem from '../postItem/PostItem';
import Profile from '../profile/Profile.jsx';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './container.scss';

function Container() {
  const { isLoading, error, data } = useFetchBurns();

  const { darkMode, toggleTheme } = useTheme();

  const allItems: any[] = []; // TODO: Fix type or handle error better

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
