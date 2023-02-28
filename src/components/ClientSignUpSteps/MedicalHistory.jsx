import { Box, Button, Divider, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';
import * as IoIcons from 'react-icons/io5';
import mason from '../../utils/mson';
import { Controller, useFormContext } from 'react-hook-form';

const MedicalHistory = ({}) => {
  const [showDetails, setShowDetails] = React.useState(false);

  const { control, register, getValues, setValue } = useFormContext();

  const valueToDisplay = mason?.filter(
    (values) => values.info_description !== ''
  );

  const handleNext = () => {
    setValue('activeStep', 4);
  };

  const handleBack = () => {
    setValue('activeStep', 2);
  };

  return (
    <>
      {' '}
      <div className="font-bold ml-[3%] md:text-center">
        Other Medical History
      </div>
      {valueToDisplay.map((values, idx) => (
        <Box key={values.info_description}>
          <Box key={values.info_id} className="block">
            <FormControl
              id="form-control"
              sx={{ marginTop: 3 }}
              variant="standard"
            >
              <FormLabel id="demo-error-radios">{values.info_name}</FormLabel>
              <Controller
                name={`info.${values.info_id}.value`}
                defaultValue="no"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    aria-labelledby="demo-error-radios"
                    id="demo-radios"
                    sx={{ display: 'flex', alignItems: 'center' }}
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
                      onClick={() => {
                        setShowDetails(() => ({
                          ...showDetails,
                          [idx]: false
                        }));
                      }}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Controller
              control={control}
              defaultValue=""
              name={`info.${values.info_id}.details`}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label=""
                  placeholder=""
                  margin="normal"
                  style={{ background: '#e7e7e7' }}
                  size="medium"
                />
              )}
            />
          </Box>
          <Divider sx={{ marginTop: 3 }} />
        </Box>
      ))}
      <Box className="relative flex items-center mt-12 justify-center">
        <Box
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </Box>
        <Button
          onClick={handleNext}
          variant="contained"
          style={{
            background: '#1A4CFF',
            color: 'white',
            textTransform: 'capitalize'
          }}
          type="submit"
          className={`bg-[#1A4CFF] capitalize text-white`}
        >
          Continue
        </Button>
        <Box className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          4/5
        </Box>
      </Box>
    </>
  );
};

export default MedicalHistory;
