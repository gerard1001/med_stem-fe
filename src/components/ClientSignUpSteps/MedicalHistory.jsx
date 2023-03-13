import { Box, Button, Divider, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';
import * as IoIcons from 'react-icons/io5';
import { med_info } from '../../utils/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoList } from '../../redux/reducers/info.reducer';
import { Controller, useFormContext } from 'react-hook-form';
import Loader from '../Loader/Loader';
import BackButton from '../BackButton';
import LoadingButton from '../LoadingButton';

const MedicalHistory = ({}) => {
  const [showDetails, setShowDetails] = React.useState(false);

  const { control, register, getValues, setValue } = useFormContext();

  const med_info = useSelector((state) => state.info);

  const spec_med_info = med_info?.data?.data?.filter(
    (values) => values.info_type == 'special'
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfoList());
  }, []);

  // const spec_med_info = med_info?.filter(
  //   (values) => values.info_type === 'special'
  // );

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
      {med_info?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
          <Loader />
        </Box>
      )}
      {!med_info?.loading && (
        <Box className="md:px-2">
          {spec_med_info?.map((values, idx) => (
            <Box key={values.info_description}>
              <Box key={values.info_id} className="block">
                <FormControl
                  id="form-control"
                  sx={{ marginTop: 3 }}
                  variant="standard"
                >
                  <FormLabel id="demo-error-radios">
                    {values.info_name}
                  </FormLabel>
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
                      style={{ background: '#e7e7e7', borderRadius: '10px' }}
                      size="medium"
                    />
                  )}
                />
              </Box>
              <Divider sx={{ marginTop: 3 }} />
            </Box>
          ))}
        </Box>
      )}
      <Box className="relative flex items-center mt-12 justify-between">
        <BackButton className="w-fit left-5" onClick={handleBack} />
        <LoadingButton
          className="px-10"
          variant="contained"
          onClick={handleNext}
        >
          Continue
        </LoadingButton>
        <Box className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 right-5 text-[16px]">
          4/5
        </Box>
      </Box>
    </>
  );
};

export default MedicalHistory;
