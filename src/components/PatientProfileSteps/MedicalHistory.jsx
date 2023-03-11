import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { med_info } from '../../utils/dummyData';
import PatientProfileNavigation from './PatientProfileNavigation';

const MedicalHistory = () => {
  const spec_med_info = med_info?.filter(
    (values) => values.info_type === 'special'
  );

  return (
    <div>
      <Box className="w-full">
        <PatientProfileNavigation />
        <Box className="h-[90vh] overflow-auto pb-8 mb-24">
          <Box className="mt-8 mb-5 flex flex-row items-center justify-between">
            <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
              Have you ever had any of the following?
            </Typography>
            <Button
              sx={{
                color: '#fff',
                width: '80px',
                height: '30px',
                color: '#1A4CFF',
                border: '1px solid #1A4CFF',
                borderRadius: '20px',
                ':hover': {
                  backgroundColor: '#fafcfd',
                  border: '1px solid #fff'
                }
              }}
            >
              Edit
            </Button>
          </Box>
          <Box>
            {med_info.map((value) => {
              return (
                <Box
                  className="flex flex-row items-center h-[50px] lg:h-min"
                  key={value.info_id}
                >
                  <FormControl
                    id="form-control"
                    sx={{
                      my: 3,
                      display: { md: 'flex', xs: 'block' },
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%'
                    }}
                    variant="standard"
                  >
                    <Typography
                      id="demo-error-radios"
                      sx={{ width: '100%' }}
                      className="line-clamp-4"
                    >
                      {value.info_name}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      id="demo-radios"
                      row={true}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row'
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        type="submit"
                        label="yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    style={{
                      backgroundColor: '#fafcfd',
                      color: '#000',
                      textTransform: 'capitalize'
                    }}
                    className="capitalize"
                  >
                    Details
                  </Button>
                </Box>
              );
            })}
          </Box>
          <Box>
            <Box className="mt-8 mb-5 flex flex-row items-center justify-between">
              <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
                Other Medical History
              </Typography>
            </Box>
            <Box></Box>
            <Box className="flex flex-col items-start gap-8">
              {spec_med_info.map((value) => {
                return (
                  <Box
                    className="flex flex-col items-start w-[100%]"
                    key={value.info_id}
                  >
                    <Box className="flex flex-row items-center w-[100%] h-[50px] lg:h-min">
                      <FormControl
                        id="form-control"
                        sx={{
                          marginY: 3,
                          display: { md: 'flex', xs: 'block' },
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%'
                        }}
                        variant="standard"
                      >
                        <Typography
                          id="demo-error-radios"
                          sx={{ width: '100%' }}
                          className="line-clamp-4"
                        >
                          {value.info_name}
                        </Typography>
                        <RadioGroup
                          aria-labelledby="demo-error-radios"
                          id="demo-radios"
                          row={true}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row'
                          }}
                          className=""
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            type="submit"
                            label="yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="no"
                          />
                        </RadioGroup>
                      </FormControl>
                      <Button
                        style={{
                          backgroundColor: '#fafcfd',
                          color: '#000',
                          textTransform: 'capitalize'
                        }}
                        className="capitalize"
                      >
                        Details
                      </Button>
                    </Box>
                    <Typography
                      id="demo-error-radios"
                      sx={{ width: '100%' }}
                      className="line-clamp-4"
                    >
                      If Yes please provide details:
                    </Typography>
                    <TextField className="bg-[#E7E7E7] w-[80%]" />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MedicalHistory;
