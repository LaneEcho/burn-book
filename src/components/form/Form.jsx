import React, { useState, useCallback } from 'react';
import { useTheme } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useAddBurn } from '../../hooks/fetchMutations';
import './form.scss';

// declare a function to debounce
function debounce(callback, waitTime) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    // call the callback in the proper context (this) with the correct arguments (args)
    // callback function is executed in the same context it was originally called from
    timeoutId = setTimeout(() => callback.apply(this, args), waitTime);
  };
}

function FormComponent(props) {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { darkMode } = useTheme();

  const { user } = useAuth();

  const { mutate, isLoading } = useAddBurn();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (comment.trim() !== '') {
      mutate({ message: comment });
      setComment('');
      setDisabled(true);
    } else {
      setDisabled(true);
      alert('Please write a comment');
    }
  };

  // debounced version of handleChange with 400ms delay
  const debouncedHandleChange = useCallback(
    debounce((value) => {
      // submit button becomes active
      if (value.trim() !== '') {
        setDisabled(false);
      } else setDisabled(true);
    }, 400),
    [] // Empty dependency array to ensure the debounce function is created only once
  );

  // update the input field and debounce actions
  const handleChange = (event) => {
    const value = event.target.value;
    // update the input field immediately for user feedback
    setComment(value);
    // debounce the action
    debouncedHandleChange(value);
  };

  // no user
  if (!user) {
    return (
      <div>
        <h4>Log in to comment</h4>
      </div>
    );
  }

  // add component later for visual feedback while waiting for promise to resolve
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`say-something ${darkMode ? 'dark' : ''}`}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Say Something Behind Your Friend's Back:</label>
        <input
          type="text"
          id="text"
          value={comment}
          onChange={handleChange}
          placeholder="You let it out, honey. Put it in the book."
        ></input>
        <button type="submit" className="submit-button" disabled={disabled}>
          submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
