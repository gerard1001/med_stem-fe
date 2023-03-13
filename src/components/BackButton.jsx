import { Button, useTheme } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router';

function BackButton({ className, onClick, ...rest }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      className={clsx('py-2 rounded-xl', className)}
      onClick={
        onClick ||
        (() => {
          navigate(-1);
        })
      }
      {...rest}
    >
      <svg
        width="30"
        height="16"
        viewBox="0 0 30 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.748989 7.41533C0.358467 7.80585 0.358467 8.43902 0.748989 8.82954L7.11295 15.1935C7.50347 15.584 8.13664 15.584 8.52716 15.1935C8.91769 14.803 8.91769 14.1698 8.52716 13.7793L2.87031 8.12243L8.52716 2.46558C8.91769 2.07506 8.91769 1.44189 8.52717 1.05137C8.13664 0.660842 7.50348 0.660842 7.11295 1.05137L0.748989 7.41533ZM36.3691 7.12244L1.4561 7.12243L1.4561 9.12243L36.3691 9.12244L36.3691 7.12244Z"
          fill={theme.palette.primary.main}
        />
      </svg>
    </Button>
  );
}

export default BackButton;
