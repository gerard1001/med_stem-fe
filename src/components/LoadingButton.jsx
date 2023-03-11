import { Button } from '@mui/material';
import React from 'react';
import Loader from './Loader/Loader';

function LoadingButton({ children, loading, disabled, ...rest }) {
  return (
    <Button disabled={loading || disabled} {...rest}>
      {!loading ? children : <Loader />}
    </Button>
  );
}

export default LoadingButton;
