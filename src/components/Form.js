import React, { useState } from 'react';
import PostItem from './PostItem';

function FormComponent() {
  // initial state is an empty array of comments
  // const initialState = {
  //   commentList: [],
  // };
  const [comment, setComment] = useState([]);

  //   function that hopefully adds form input to state - event handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.elements.comment.value;
    setComment([...comment, newComment]);
    console.log('state: ', comment);
    console.log('new comment: ', newComment);
    event.target.reset();
  };

  const allItems = [];
  //do an i for loop, loop through every element in comment.commentList
  //each iteration will create a new <PostItem comment={comment.commentList[i]}>, push each new <PostItem> to allItems
  for (let i = 0; i < comment.length; i++) {
    allItems.push(<PostItem comment={comment[i]} key={i} />);
  }

  console.log('all: ', allItems);

  return (
    <div>
      <div className="say-something">
        <h2>Say Something Behind Your Friend's Back</h2>
        <form onSubmit={handleSubmit} id="comment-form">
          <textarea
            type="text"
            // value={comment}
            id="comment"
            name="comment"
            placeholder="You let it out, honey. Put it in the book."
          ></textarea>
          {/* <input type="file"></input> */}
          <div id="button-id">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
      {allItems}
    </div>
  );
}

export default FormComponent;
