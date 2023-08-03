import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import './form.scss';

function FormComponent() {
  // initialize state - comment is empty string
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Set loading to false by default
  // enable/ disable submit button
  const [disabled, setDisabled] = useState(true);

  // Event handler for form submission
  const handleSubmit = async (event) => {
    const newComment = event.target.elements.comment.value;
    // check if the value is not empty or whitespace, it will not submit if there is
    if (newComment.trim() !== '') {
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
    }
  };

  // event handler for input change
  // need to throttle/ debounce
  const handleChange = (event) => {
    setComment(event.target.value);
    console.log('comment: ', comment);
  };

  // tell the user that the data is loading
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
