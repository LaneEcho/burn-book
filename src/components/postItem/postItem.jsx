import React, { useState } from 'react';
import { useDeleteBurn } from '../../hooks/fetchMutations.jsx';
import UpdatePostItem from './UpdatePostItem.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import '../form/form.jsx';
import './postItem.scss';

function PostItem({ id, comment, username }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { user } = useAuth();

  const { mutate } = useDeleteBurn();

  const handleDelete = (event) => {
    event.preventDefault();

    if (user !== undefined && user.user_metadata.username === username) {
      if (window.confirm('Delete this entry?')) {
        mutate({ id: id });
      }
    }
  };

  // update function
  // modal shows if logged in user matches user
  const handleUpdate = (event) => {
    setLoading(true);

    const username = event.target.parentElement.dataset.user;

    if (user !== undefined && user.user_metadata.username === username) {
      setModalState(!modalState);
    }
    setLoading(false);
  };

  return (
    <div className="post-item" id={id} data-user={username}>
      <p>{comment}</p>
      <p className="username">@{username}</p>

      <>
        <button className="edit-button" onClick={handleUpdate}>
          edit
        </button>
        <button className="secondary-button" onClick={handleDelete}>
          delete
        </button>
      </>

      {modalState && <UpdatePostItem id={id} open={setModalState} />}
    </div>
  );
}

export default PostItem;
