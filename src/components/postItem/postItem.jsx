import React, { Component } from 'react';
import './postItem.scss';

function PostItem(props) {
  // have to make sure we can select by ID
  // write onDelete handler

  // function to hopefully handle delete
  const handleDelete = (index) => {
    const newComments = [...comment];
    newComments.splice(index, 1);
    setComment(newComments);
    console.log('state: ', comment);
  };

  return (
    <div className="post-item">
      <p>{props.comment}</p>
      <button className="remove-button" onClick={props.onDelete}>
        remove
      </button>
    </div>
  );
}

export default PostItem;
