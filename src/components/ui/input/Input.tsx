import React, { ChangeEventHandler, ComponentProps, useState } from 'react';
import './input.scss';

interface IputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

const Input = ({
  label,
  type,
  id,
  name,
  placeholder,
  required,
  pattern,
  error,
}: IputProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (_event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  const handleInput = (_event: React.FocusEvent<HTMLInputElement>) => {
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
        onBlur={handleFocus}
        onFocus={handleInput}
      />
      {error && <span>{error}</span>}
    </>
  );
};

export default Input;
