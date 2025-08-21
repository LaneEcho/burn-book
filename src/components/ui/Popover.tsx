import React, { useState } from 'react';

// come back to this

const Popover = ({ trigger, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleTogglePopover = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="popover-container">
      <div className="popover-trigger" onClick={handleTogglePopover}>
        {trigger}
      </div>
      {isVisible && <div className="popover-content">{content}</div>}
    </div>
  );
};

export default Popover;
