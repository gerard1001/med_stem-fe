import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import * as IoIcons from 'react-icons/io5';
import { countries } from '../../utils/data';

// Destructuring props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { country, address_1, email, city, phone },
  formErrors
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    country.length > 0 &&
    !formErrors.country &&
    address_1.length > 0 &&
    !formErrors.address_1 &&
    email.length > 0 &&
    !formErrors.email &&
    city.length > 0 &&
    !formErrors.city &&
    phone.length > 0 &&
    !formErrors.phone;
  // const isValid = true;

  return (
    <div className="max-w-[800px]">
      {' '}
      <div className="font-bold ml-[3%]">Contact Information</div>
      <Grid container spacing={2}>
        <Box
          container
          spacing={2}
          noValidate
          className="flex items-start justify-evenly w-[100%]"
        >
          <Box className="block w-[45%]">
            <Grid>
              {/* <Autocomplete
                id="country-select-demo"
                sx={{ padding: 0, minWidth: '220px' }}
                margin="normal"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Country"
                    name="country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password'
                    }}
                    value={country}
                    margin="normal"
                    // onChange={handleChange}
                    onChange={(e) => {
                      const val = e.target.innerText.split(" (");
                      setCountry(val[0]);
                    }}
                    error={!!formErrors.country}
                    helperText={formErrors.country}
                    size="small"
                  />
                )}
              /> */}
              <TextField
                variant="outlined"
                fullWidth
                label="Country"
                name="country"
                placeholder="Enter your country name"
                value={country || ''}
                margin="normal"
                onChange={handleChange}
                error={!!formErrors.country}
                helperText={formErrors.country}
                required
                size="small"
              />
            </Grid>
            <Grid>
              <TextField
                variant="outlined"
                fullWidth
                label="Address 1"
                name="address_1"
                placeholder="Enter your address"
                value={address_1 || ''}
                margin="normal"
                onChange={handleChange}
                error={!!formErrors.address_1}
                helperText={formErrors.address_1}
                required
                size="small"
              />
            </Grid>
            <Grid>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={email || ''}
                margin="normal"
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
                size="small"
              />
            </Grid>
          </Box>
          {/* ************************************************************************* */}
          <Box className="block w-[45%]">
            <Grid>
              <TextField
                variant="outlined"
                fullWidth
                label="City"
                name="city"
                placeholder="Enter your city"
                value={city || ''}
                margin="normal"
                onChange={handleChange}
                error={!!formErrors.city}
                helperText={formErrors.city}
                required
                size="small"
              />
            </Grid>
            <Grid>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Phone number"
                name="phone"
                placeholder="i.e: xxx-xxx-xxxx"
                value={phone || ''}
                onChange={handleChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                margin="normal"
                size="small"
              />
            </Grid>{' '}
          </Box>
        </Box>
      </Grid>
      {/* <div className="flex mt-12 justify-end">
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          color="primary"
          onClick={isValid ? handleNext : null}
        >
          Next
        </Button>
      </div> */}
      <div className="relative flex items-center mt-12 justify-center">
        <Box
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </Box>
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
                  background: '#    ',
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
          2/5
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
