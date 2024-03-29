import React, { useState, useEffect, useCallback } from 'react';
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

    // do not submit if empty string
    // could also throttle API calls in the future
    if (comment.trim() !== '') {
      // for UX - is the submit loading? Do some visual feedback here...
      setLoading(true);

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
        let resJson = await res.json(); // do we need this line?
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
    }
    // alert so comment is not empty string
    else {
      setDisabled(true);
      alert('Please write a comment');
    }

    // we could just add this as a post item - figure out how to optimize (possible caching?)
    // get request to get whatever we just sent
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

  // add component later for visual feedback while waiting for promise to resolve
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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
