import { Box, Button, Divider, Modal, Paper, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import * as ImIcons from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoList } from '../../redux/reducers/info.reducer';
import BackButton from '../BackButton';
import CloseXButton from '../CloseXButton';
import Loader from '../Loader/Loader';
import LoadingButton from '../LoadingButton';

const MedicalInfo = () => {
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);

  const med_info = useSelector((state) => state.info);

  const gen_med_info = med_info?.data?.data?.filter(
    (values) => values.info_type !== 'special'
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfoList());
  }, []);

  const { control, setValue } = useFormContext();

  const handleNext = () => {
    setValue('activeStep', 3);
  };
  const handleBack = () => {
    setValue('activeStep', 1);
  };
  const handleOpenCreateCycle = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
  };

  return (
    <>
      {' '}
      <div className="font-bold ml-[3%] md:text-center my-3 third-step">
        Medical Information
      </div>
      {med_info?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto ">
          <Loader />
        </Box>
      )}
      {!med_info?.loading && (
        <form>
          <Box className="pr-4">
            {gen_med_info?.map((values, idx) => (
              <div key={values.info_id}>
                <Box className="flex flex-row items-center">
                  <FormControl
                    id="form-control"
                    sx={{
                      my: 1,
                      display: { md: 'flex', xs: 'block' },
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%'
                    }}
                    variant="standard"
                  >
                    <Typography
                      id="demo-error-radios"
                      sx={{ width: '100%', mr: 2 }}
                      className="line-clamp-4"
                    >
                      {values.info_name}
                    </Typography>
                    <Controller
                      control={control}
                      defaultValue="no"
                      name={`info.${values.info_id}.value`}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          aria-labelledby="demo-error-radios"
                          id="demo-radios"
                          row
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
                            onClick={() => {
                              setShowDetails((state) => ({
                                ...state,
                                [idx]: true
                              }));
                              setClickedIdx(idx);
                            }}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="no"
                            onClick={() => {
                              setClickedIdx(idx);
                              setShowDetails((state) => ({
                                ...state,
                                [idx]: false
                              }));
                            }}
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                  <LoadingButton
                    disabled={!showDetails[idx]}
                    onClick={() => {
                      setClickedIdx(idx);
                      handleOpenCreateCycle();
                    }}
                    variant="text"
                    className="capitalize"
                  >
                    Details
                  </LoadingButton>
                </Box>
                <Divider
                  sx={{
                    border: '1px dashed #D9D9D9'
                  }}
                />
                {clickedIdx === idx && (
                  <Modal
                    open={openCreateModal}
                    onClose={handleCloseCreateModel}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box className="absolute w-[90%] max-w-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                      <Paper
                        sx={{
                          padding: {
                            xs: '40px 10% 2px',
                            md: '40px 40px 2px'
                          },
                          maxWidth: '480px',
                          position: 'relative'
                        }}
                      >
                        <CloseXButton onClick={handleCloseCreateModel} />
                        <Typography
                          variant="h6"
                          align="justify"
                          sx={{ textAlign: 'center' }}
                        >
                          Medical History
                        </Typography>
                        <Typography
                          align="justify"
                          sx={{ textAlign: 'center', mb: 3 }}
                        >
                          {values.info_name}
                        </Typography>
                        <Controller
                          control={control}
                          defaultValue=""
                          name={`info.${values.info_id}.details`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              label="Description"
                              placeholder="Description"
                              size="small"
                              fullWidth
                              multiline
                              rows={2}
                              maxRows={4}
                            />
                          )}
                        />

                        <LoadingButton
                          onClick={() => {
                            handleCloseCreateModel();
                          }}
                          style={{
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            display: 'block',
                            margin: '20px auto'
                          }}
                          variant="contained"
                        >
                          Submit
                        </LoadingButton>
                      </Paper>
                    </Box>
                  </Modal>
                )}
              </div>
            ))}
          </Box>
          <div className="relative flex items-center mt-12 justify-between">
            <BackButton className="w-fit left-5" onClick={handleBack} />
            <LoadingButton
              className="px-10"
              variant="contained"
              onClick={handleNext}
            >
              Continue
            </LoadingButton>
            <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 right-5 text-[16px]">
              3/5
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default MedicalInfo;
