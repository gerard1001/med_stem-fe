import { Button, Typography } from '@mui/material';
import React from 'react';
import Loader from './Loader/Loader';

function LoadingButton({ children, loading, disabled, ...rest }) {
  return (
    <Button disabled={loading || disabled} {...rest}>
      {!loading ? (
        <Typography color="white">{children}</Typography>
      ) : (
        <Loader />
      )}
    </Button>
  );
}

export default LoadingButton;
