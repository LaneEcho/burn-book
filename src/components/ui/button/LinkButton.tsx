import React from 'react';
import { Link } from 'react-router';
import './button.scss';

interface LinkButtonProps {
  className?: string;
  to: string;
  children: React.ReactNode;
}

const LinkButton = ({ className, to, children }: LinkButtonProps) => {
  return (
    <Link className={`link-button ${className}`} to={to}>
      {children}
    </Link>
  );
};

export default LinkButton;
