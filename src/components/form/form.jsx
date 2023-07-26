import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import PostItem from '../postItem/postItem.jsx';
import './form.scss';

function FormComponent() {
  // initialize state
  const [comment, setComment] = useState([]);

  const { data, loading, error } = useFetch('/getBurns');

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

  // populate with burns after fetch is successful
  const allItems = [];
  if (!loading && data !== null) {
    // iterate to create a new <PostItem > component for each entry
    for (let i = 0; i < data.length; i++) {
      allItems.push(
        <PostItem
          comment={data[i].message}
          key={i}
          onDelete={() => handleDelete(i)}
        />
      );
    }
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
            <button type="submit" className="submit-button">
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
