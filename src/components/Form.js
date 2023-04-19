import React, { Component } from 'react';
import PostItem from './PostItem';

function FormComponent() {
  return (
    <div>
      <div class="say-something">
        <h2>Say Something Behind Your Friend's Back</h2>
        <form action="" id="comment-form">
          <input
            type="text"
            id="comment"
            name="comment"
            placeholder="Ms. Norbury is a PUSHER, a SAD OLD DRUG PUSHER."
          ></input>
          {/* <input type="file"></input> */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <PostItem />
    </div>
  );
}

export default FormComponent;
