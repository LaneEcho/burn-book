import React, { useState } from 'react';
import PostItem from './PostItem';
import './Form.css';

function FormComponent() {
  // initialize state
  const [comment, setComment] = useState([]);

  //   function that hopefully adds form input to state - event handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.elements.comment.value;
    // check if the value is not empty or whitespace, it will not submit if there is
    if (newComment.trim() !== '') {
      setComment([...comment, newComment]);
      event.target.reset();
    }
  };

  // function to hopefully handle delete
  const handleDelete = (index) => {
    const newComments = [...comment];
    newComments.splice(index, 1);
    setComment(newComments);
    console.log('state: ', comment);
  };

  const allItems = [];
  // iterate to create a new <PostItem > component for each comment -new comments to the front
  for (let i = 0; i < comment.length; i++) {
    allItems.unshift(
      <PostItem comment={comment[i]} key={i} onDelete={() => handleDelete(i)} />
    );
  }

  return (
    <div>
      <div className="say-something">
        <h2>Say Something Behind Your Friend's Back</h2>
        <form onSubmit={handleSubmit} id="comment-form">
          <textarea
            type="text"
            id="comment"
            name="comment"
            placeholder="You let it out, honey. Put it in the book."
          ></textarea>
          {/* <input type="file"></input> */}
          <div id="button-id">
            <button className="button" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
      {allItems}
    </div>
  );
}

export default FormComponent;
