import React, { Fragment } from 'react';
import {
  Box,
  Button,
  MenuItem,
  InputLabel,
  Select,
  //   FormControl,
  TextField,
  Grid
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import * as IoIcons from 'react-icons/io5';

// Destructuring props
const Password = ({
  handleNext,
  handleBack,
  handleChange,
  formErrors,
  values: {
    first_name,
    last_name,
    email,
    password,
    gender,
    birth_date,
    phone,
    city,
    address_1,
    country,
    id_number,
    marital_status,
    message
  }
}) => {
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const isValid =
    password?.length > 0 && !formErrors.password && password === confirm;

  React.useEffect(() => {
    if (password !== confirm && confirm.length > 0) {
      setHelperText("Passwords don't match");
      setError(true);
    }
    if (password === confirm && confirm.length > 0) {
      setHelperText('Passwords match');
      setError(false);
    }
  });

  const handleSubmit = () => {
    console.log({
      first_name,
      last_name,
      email,
      password,
      gender,
      birth_date,
      phone,
      city,
      address_1,
      country,
      id_number,
      marital_status,
      message
    });
    handleNext();
  };

  return (
    <Fragment className="max-w-[800px]">
      <div className="font-bold ml-[3%]">Password</div>
      <FormControl
        sx={{ margin: 'auto', display: 'block' }}
        error={error}
        variant="standard"
      >
        <Box
          container
          spacing={2}
          noValidate
          className="block w-[100%] mx-auto"
        >
          <Box item className="w-[80%] mx-auto" style={{ margin: 'auto' }}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              name="password"
              placeholder="Password"
              margin="normal"
              value={password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              required
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm password"
              name="confirm"
              placeholder="Confirm password"
              margin="normal"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
              required
              size="small"
            />
            <FormHelperText>{helperText}</FormHelperText>
          </Box>
        </Box>
      </FormControl>
      <div className="relative flex items-center mt-12 justify-center">
        <div
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </div>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          disabled={!isValid}
          style={
            isValid
              ? {
                  background: '#1A4CFF',
                  color: 'white',
                  textTransform: 'capitalize'
                }
              : {
                  background: '#c0c0c0',
                  color: 'white',
                  textTransform: 'capitalize'
                }
          }
          type="submit"
          className={`${
            isValid ? 'bg-[#1A4CFF]' : 'bg-[#c0c0c0]'
          } capitalize text-white`}
        >
          Complete
        </Button>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          5/5
        </div>
      </div>
    </Fragment>
  );
};

export default Password;
