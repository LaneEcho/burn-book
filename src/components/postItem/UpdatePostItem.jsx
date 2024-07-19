import React, { useState, useEffect } from 'react';
import './postItem.scss';
import { useFetchBurn } from '../../hooks/fetchQuery.jsx';

function UpdatePostItem({ id, open }) {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const { isLoading, error, data } = useFetchBurn(id);

  // useEffect to handle data changes
  useEffect(() => {
    if (!isLoading && !error && data) {
      setComment(data.message);
    }
  }, [data, isLoading, error]);

  // update function
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      let res = await fetch(`getBurns/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: comment,
        }),
      });

      let resJson = await res.json();

      if (res.status === 200) {
        setMessage('Girl on Girl Crime Updated');
        open();
      } else {
        setMessage('Error occurred in the patch request');
      }
    } catch (err) {
      console.log(err);
      setMessage(
        "Fetch didn't happen - Error occurred fetching data in patch request"
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator
  }

  if (error) {
    return <div>Error fetching data {error}</div>; // Handle error state
  }

  return (
    <div className="update-post">
      <form onSubmit={handleUpdate}>
        <label htmlFor="text">Update</label>
        <input
          type="text"
          id="text"
          value={comment} // Bind input value to fetched comment
          onChange={(e) => setComment(e.target.value)} // Handle input change
          placeholder="Enter your update"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdatePostItem;
