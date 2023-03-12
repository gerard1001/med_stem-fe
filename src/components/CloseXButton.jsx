import { IconButton } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { ImCross } from 'react-icons/im';

const CloseXButton = ({ onClick, className = {}, ...props }) => {
  return (
    <IconButton
      onClick={onClick}
      className={clsx(
        'absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1 cursor-pointer',
        className
      )}
      {...props}
    >
      <ImCross />
    </IconButton>
  );
};

export default CloseXButton;
