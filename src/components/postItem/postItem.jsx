import React, { Component } from 'react';
import './postItem.scss';

function PostItem(props) {
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
