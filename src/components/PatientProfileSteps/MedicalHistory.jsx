import React from 'react';
import PatientProfileNavigation from './PatientProfileNavigation';
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';

const infos = [
  'Epilepsy, fits, blackouts, fainting turns or unexplained loss of consciousness?',
  'Vertigo, dizziness, giddiness, problems with balance?',
  'Recurrent headache or migraine?',
  'Diseases of the nervous system e.g. neuritis, stroke, multiple sclerosis?',
  'Chest pain, angina, heart disease or breathlessness?',
  'Any visual defect e.g. scotoma, blindness in one eye, reduced visual field, blurred vision, coloured blind?'
];

const MedicalHistory = () => {
  return (
    <div>
      <Box className="w-[80%] mx-auto max-w-[1200px]">
        <PatientProfileNavigation />
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
              ':hover': { backgroundColor: '#a2ccff', border: '1px solid #fff' }
            }}
          >
            Edit
          </Button>
        </Box>
        <Box>
          {infos.map((value) => {
            return (
              <Box className="flex flex-row items-center h-[50px] lg:h-min">
                <FormControl
                  id="form-control"
                  sx={{
                    m: 3,
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
                    {value}
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
                    backgroundColor: '#a2ccff',
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
      </Box>
    </div>
  );
};

export default MedicalHistory;
