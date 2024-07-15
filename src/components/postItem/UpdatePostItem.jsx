import React, { useState, useEffect } from 'react';
import './postItem.scss';
import useFetch from '../../hooks/useFetch.jsx';

function UpdatePostItem(props) {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const { data, loading, error } = useFetch(`/getBurns/${props.id}`);

  // useEffect to handle data changes
  useEffect(() => {
    if (!loading && !error && data) {
      setComment(data.message);
    }
  }, [data, loading, error]);

  // update function
  const handleUpdate = async (event) => {
    event.preventDefault();

    console.log('Update logic here', props.id);

    try {
      let res = await fetch(`getBurns/${props.id}`, {
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
        // close updater - refactor this eventually
        props.open();
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

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator
  }

  if (error) {
    return <div>Error fetching data</div>; // Handle error state
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
