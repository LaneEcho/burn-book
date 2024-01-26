import React, { useState } from 'react';
import './postItem.scss';

import Popover from '../ui/popover.jsx';
import IconButton from '../ui/IconButton.jsx';

const moreIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    style={{ width: '1.5rem', height: '1.5rem' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

function PostItem(props) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // delete function
  const handleDelete = async (event) => {
    // confirm that burn will be deleted (true)
    const result = confirm('Delete this entry?');
    if (result) {
      // in case we need to track if something is loading for UX
      setLoading(true);

      try {
        let res = await fetch('/getBurns', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: props.id,
          }),
        });

        // 204 status "No Content" for delete requests
        if (res.status === 204) {
          setMessage('Error occurred in the delete request');
        }
      } catch (err) {
        console.log(err);
        setMessage(
          "Fetch didn't happen - Error occurred fetching data in delete request"
        );
      }

      setLoading(false); // Set loading back to false after the API call is completed
    }
  };

  // update function
  const handleUpdate = (event) => {
    // in case we need to track if something is loading for UX
    setLoading(true);
    setModalState(!modalState);
    console.log('modal open');
  };

  const buttonTrigger = (
    <IconButton className="actions" icon={moreIcon}></IconButton>
  );

  const popoverContent = <h2>Fetch</h2>;

  return (
    <div className="post-item">
      <Popover trigger={buttonTrigger} content={popoverContent}></Popover>
      <p>{props.comment}</p>
    </div>
  );
}

export default PostItem;
