import React, { Component } from 'react';

function PostItem(props) {
  return (
    <div className="post-item">
      <h4>{props.comment}</h4>
    </div>
  );
}

export default PostItem;
