import { useState } from 'react';

// this is a hook to toggle a modal but it is not being used (used pre-tanstack query)

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return [isShowing, toggle];
};

export default useModal;
