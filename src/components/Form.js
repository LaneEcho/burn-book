import React, { useState } from 'react';
import PostItem from './PostItem';

function FormComponent() {
  // state hook initialized to empty array
  const [comment, setComment] = useState([]);

  // function that hopefully adds form input to state - event handler

  return (
    <div>
      <div className="say-something">
        <h2>Say Something Behind Your Friend's Back</h2>
        <form action="" id="comment-form">
          <textarea
            type="text"
            // value={comment}
            id="comment"
            name="comment"
            placeholder="Ms. Norbury is a PUSHER, a SAD OLD DRUG PUSHER."
          ></textarea>
          {/* <input type="file"></input> */}
          <div id="button-id">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
      <PostItem />
    </div>
  );
}

export default FormComponent;
