import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as IoIcons from 'react-icons/im';
import HomeNavBar from '../components/HomeNavBar';
import StepForm from '../components/Steps/StepForm';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    paddingRight: 10,
    paddingLeft: 10
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '80%',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 100
    }
  },
  layout2: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 100
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3)
    },
    border: '1px solid #0093df',
    borderRadius: 10,
    position: 'relative'
  }
}));

const Form = () => {
  // const [status, setStatus] = React.useState('false');

  // const onThree = (status) => {
  //   setStatus(status);
  // };

  const classes = useStyles();
  const [status, setStatus] = React.useState(false);
  const chooseStatus = (status) => {
    setStatus(status);
  };

  return (
    <div className="">
      <HomeNavBar />
      <main className={`${!status ? classes.layout : classes.layout2} `}>
        <Paper className={classes.paper}>
          <div className="absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1">
            <IoIcons.ImCross />
          </div>
          <StepForm chooseStatus={chooseStatus} />
        </Paper>
      </main>
    </div>
  );
};

export default Form;
