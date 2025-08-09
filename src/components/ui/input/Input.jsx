import React, { useState } from 'react';
import './input.scss';

const Input = ({
  label,
  type,
  id,
  name,
  placeholder,
  required,
  pattern,
  error,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleInput = (e) => {
    setFocused(false);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        className="inputField" // come back to style
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        onChange={onchange}
        onBlur={handleFocus}
        onFocus={handleInput}
      />
      {isInvalid && <span>{error}</span>}
    </>
  );
};

export default Input;
