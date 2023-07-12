import React, { Component } from 'react';
import './postItem.scss';

function PostItem(props) {
  return (
    <div className="post-item">
      <h4>{props.comment}</h4>
      <button className="remove-button" onClick={props.onDelete}>
        remove
      </button>
    </div>
  );
}

export default PostItem;
