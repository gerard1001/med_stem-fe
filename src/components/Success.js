import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(3)
  },
  title: {
    marginTop: 30
  }
}));

const Success = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h4" align="center">
        You were successfully registered to MedStem!
      </Typography>
      <Typography component="p" align="center" className={classes.title}>
        Check your inbox to verify your email.
      </Typography>
    </Box>
  );
};

export default Success;
