import React, { ComponentProps } from 'react';
import { SvgIconComponent } from '@mui/icons-material';

interface IconButtonProps extends ComponentProps<'button'> {
  Icon: SvgIconComponent; // accepts MUI Icon as a prop
}

const IconButton = ({ Icon, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <Icon />
    </button>
  );
};

export default IconButton;
