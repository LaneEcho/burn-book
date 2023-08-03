import React, { useState, useEffect, useCallback } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
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

function FormComponent() {
  // initialize state - comment is empty string
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Set loading to false by default
  // enable/ disable submit button
  const [disabled, setDisabled] = useState(true);

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // for UX - is the submit loading?
    setLoading(true);
    // setDisabled(false);

    try {
      let res = await fetch('/getBurns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: comment,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setComment(''); // change comment back to empty string
        setMessage('Girl on Girl Crime Committed'); // tell us entry has been submitted
      } else {
        setMessage('Error occurred in the post request');
      }
    } catch (err) {
      console.log(err);
      setMessage(
        "Fetch didn't happen - Error occurred fetching data in post request"
      );
    }
    setLoading(false); // Set loading back to false after the API call is completed
    setDisabled(true);
  };

  // debounced version of handleChange with 400ms delay
  const debouncedHandleChange = useCallback(
    debounce((value) => {
      // actions to be debounced
      console.log('comment: ', value);
      setDisabled(false);
    }, 400),
    [] // Empty dependency array to ensure the debounce function is created only once
  );

  // update the input field and debounce actions
  const handleChange = (event) => {
    const value = event.target.value;
    // update the input field immediately
    setComment(value);
    // debounce the action
    debouncedHandleChange(value);
  };

  // tell the user that the data is loading - add component later for visual feedback
  if (loading) {
    return <div className="loading">Loading...</div>; // Render a loading state while waiting for the Promise to resolve
  }

  // also may need to fetch upon completion of post

  return (
    <div className="say-something">
      <h2>Say Something Behind Your Friend's Back</h2>
      <form onSubmit={handleSubmit} id="comment-form">
        <input
          type="text"
          value={comment}
          placeholder="You let it out, honey. Put it in the book."
          onChange={handleChange}
        ></input>
        <button type="submit" className="submit-button" disabled={disabled}>
          submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
