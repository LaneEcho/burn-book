import React, { useState } from 'react';
import { useDeleteBurn } from '../../hooks/fetchMutations.jsx';
import UpdatePostItem from './UpdatePostItem.jsx';
import '../form/form.jsx';
import './postItem.scss';

function PostItem({ id, comment, username }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { mutate: deleteBurn, isLoading } = useDeleteBurn({
    onSuccess: () => {
      setMessage('Entry successfully deleted');
    },
    onError: (error) => {
      setMessage(`Error deleting entry: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm('Delete this entry?')) {
      deleteBurn({ id: id });
    }
  };

  const handleDelete2 = async (event) => {
    const result = confirm('Delete this entry?');
    if (result) {
      // in case we need to track if something is loading for UX
      // setLoading(true);

      try {
        let res = await fetch('/getBurns', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
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
      <p>{comment}</p>
      <p className="username">@{username}</p>
      <button className="edit-button" onClick={handleUpdate}>
        edit
      </button>
      <button className="delete-button" onClick={handleDelete}>
        delete
      </button>
      {modalState && (
        <div className="modal" toggle={modalState.toString()}>
          <UpdatePostItem id={id} open={setModalState} />
        </div>
      )}
    </div>
  );
}

export default PostItem;
