import React, { Component } from 'react';

function PostItem(props) {
  return (
    <div className="post-item">
      <h4>{props.comment}</h4>
      <button className="button remove-button" onClick={props.onDelete}>
        remove
      </button>
    </div>
  );
}

export default PostItem;
