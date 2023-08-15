import React, { Component, useState } from 'react';
import './postItem.scss';

function PostItem(props) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // delete function
  const handleDelete = async (event) => {
    // confirm that burn will be deleted (true)
    const result = confirm('Delete this entry?');
    if (result) {
      console.log(props.id);
      //Logic to delete the item
      setLoading(true);

      try {
        let res = await fetch('/getBurns', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: props.id,
          }),
        });
        let resJson = await res.json(); // do we need this line?
        if (res.status === 201) {
          setMessage('Girl on Girl Crime Erased');
        } else {
          setMessage('Error occurred in the delete request');
        }
      } catch (err) {
        console.log(err);
        setMessage(
          "Fetch didn't happen - Error occurred fetching data in delete request"
        );
      }

      setLoading(false); // Set loading back to false after the API call is completed
    }
    // else {
    //   setDisabled(true);
    //   alert('Please write a comment');
    // }
  };

  return (
    <div className="post-item">
      <p>{props.comment}</p>
      <button className="edit-button" onClick={null}>
        edit
      </button>
      <button className="delete-button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}

export default PostItem;
