import { Button, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import Loader from './Loader/Loader';

function LoadingButton({
  children,
  variant = 'contained',
  className,
  loading,
  disabled,
  ...rest
}) {
  return (
    <Button
      variant={variant}
      disabled={loading || disabled}
      className={clsx(
        'rounded-lg font-medium text-[20px] leading-none cursor-pointer',
        className
      )}
      disableElevation
      {...rest}
    >
      {!loading ? (
        <Typography color="white">{children}</Typography>
      ) : (
        <Loader />
      )}
    </Button>
  );
}

export default LoadingButton;
