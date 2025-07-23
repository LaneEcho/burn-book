import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

const LinkButton = ({ className, to, children }) => {
  return (
    <Link className={`link-button ${className}`} to={to}>
      {children}
    </Link>
  );
};

export default LinkButton;
