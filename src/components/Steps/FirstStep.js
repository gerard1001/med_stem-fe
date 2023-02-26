import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { Fragment } from 'react';

// Destructuring props
const FirstStep = ({
  handleNext,
  handleChange,
  values: {
    first_name,
    last_name,
    id_number,
    gender,
    birth_date,
    marital_status
  },
  formErrors
}) => {
  // Check if all values are not empty or if there are some error
  const isValid = true;
  // const isValid =
  //   first_name.length > 0 &&
  //   !formErrors.first_name &&
  //   last_name.length > 0 &&
  //   !formErrors.last_name &&
  //   id_number.length > 0 &&
  //   !formErrors.id_number &&
  //   gender.length > 0 &&
  //   marital_status.length > 0 &&
  //   birth_date.length > 0;

  return (
    <Fragment className="max-w-[800px]">
      <div className="font-bold ml-[3%]">Personal Information</div>
      <Box
        container
        spacing={2}
        noValidate
        className="flex items-center justify-evenly w-[100%]"
      >
        <Box className="block w-[45%]">
          <Box item className="w-[100%] min-w-[220px]">
            <TextField
              variant="outlined"
              fullWidth
              label="Family name"
              name="first_name"
              placeholder="Family name"
              margin="normal"
              value={first_name}
              onChange={handleChange}
              error={!!formErrors.first_name}
              helperText={formErrors.first_name}
              required
              size="small"
            />
          </Box>
          <Box item className="w-[100%] min-w-[220px]">
            <TextField
              variant="outlined"
              fullWidth
              label="Given name"
              name="last_name"
              placeholder="Given name"
              margin="normal"
              value={last_name}
              onChange={handleChange}
              error={!!formErrors.last_name}
              helperText={formErrors.last_name}
              required
              size="small"
            />
          </Box>
          <Box item className="w-[100%] min-w-[220px]">
            <TextField
              variant="outlined"
              required
              fullWidth
              label="ID number"
              name="id_number"
              placeholder="i.e: xxx-xxx-xxxx"
              value={id_number}
              onChange={handleChange}
              error={!!formErrors.id_number}
              helperText={formErrors.id_number}
              margin="normal"
              size="small"
            />
          </Box>
        </Box>
        <Box className="block w-[45%]">
          <Box item className="w-[100%] min-w-[220px]">
            <FormControl
              variant="outlined"
              margin="normal"
              className="w-[100%] min-w-[220px]"
              size="small"
            >
              <InputLabel required>Gender</InputLabel>
              <Select
                value={gender}
                label="Gender"
                name="gender"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box item className="w-[100%] min-w-[220px]">
            <TextField
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label="Date of birth"
              name="birth_date"
              type="date"
              defaultValue={birth_date}
              onChange={handleChange}
              margin="normal"
              required
              size="small"
            />
          </Box>
          <Box item className="w-[100%] min-w-[220px]">
            <FormControl
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              margin="normal"
              className="w-[100%] min-w-[220px]"
              size="small"
            >
              <InputLabel
                required
                InputLabelProps={{
                  shrink: true
                }}
              >
                Marital status
              </InputLabel>
              <Select
                value={marital_status}
                label="Marital Status"
                InputLabelProps={{
                  shrink: true
                }}
                name="marital_status"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <div
        style={{ display: 'flex', marginTop: 50, justifyContent: 'center' }}
        className="relative"
      >
        <Button
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
          onClick={isValid ? handleNext : null}
          className={`${
            isValid ? 'bg-[#1A4CFF]' : 'bg-[#c0c0c0]'
          } capitalize text-white`}
        >
          Continue
        </Button>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          1/5
        </div>
      </div>
    </Fragment>
  );
};

export default FirstStep;
