import React, { Component, useState } from 'react';
import '../form/form.jsx';
import './postItem.scss';
import FormComponent from '../form/form.jsx';

function PostItem(props) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // state for modal
  const [modalState, setModalState] = useState(false);

  // delete function
  const handleDelete = async (event) => {
    // confirm that burn will be deleted (true)
    const result = confirm('Delete this entry?');
    if (result) {
      // in case we need to track if something is loading for UX
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

        // 204 status "No Content" for delete requests
        if (res.status === 204) {
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
  };

  // update function
  const handleUpdate = (event) => {
    // in case we need to track if something is loading for UX
    setLoading(true);
    setModalState(!modalState);
    console.log('modal open');
  };

  return (
    <div className="post-item">
      <p>{props.comment}</p>
      <button className="edit-button" onClick={handleUpdate}>
        edit
      </button>
      <button className="delete-button" onClick={handleDelete}>
        delete
      </button>
      <div className="modal" toggle={modalState.toString()}>
        <div className="form">
          <FormComponent />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
