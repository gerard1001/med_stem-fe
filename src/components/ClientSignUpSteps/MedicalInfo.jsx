import { Box, Button, Divider, Modal, Paper, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io5';
// import { med_info } from '../../utils/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoList } from '../../redux/reducers/info.reducer';
import { Controller, useFormContext } from 'react-hook-form';
import Loader from '../Loader/Loader';
import BackButton from '../BackButton';
import LoadingButton from '../LoadingButton';

const MedicalInfo = ({}) => {
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

  console.log(med_info, '#########');
  console.log(gen_med_info, '@@@@@@@@@@@@@@@@@');

  const {
    control,
    register,
    formState: { errors },
    trigger,
    setValue
  } = useFormContext();

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
                            onClick={(event) => {
                              setShowDetails((state) => ({
                                ...state,
                                // [idx]: !showDetails[idx]
                                [idx]: true
                              }));
                              setClickedIdx(idx);
                            }}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="no"
                            onClick={(event) => {
                              setClickedIdx(idx);
                              setShowDetails((state) => ({
                                ...state,
                                // [idx]: !showDetails[idx]
                                [idx]: false
                              }));
                            }}
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                  <Button
                    disabled={!showDetails[idx]}
                    onClick={() => {
                      setClickedIdx(idx);
                      handleOpenCreateCycle();
                    }}
                    style={
                      showDetails[idx]
                        ? {
                            backgroundColor: '#0093df',
                            color: '#fff',
                            textTransform: 'capitalize'
                          }
                        : {
                            backgroundColor: '#f1f1f1',
                            color: '#000',
                            textTransform: 'capitalize'
                          }
                    }
                    className="bg-primary capitalize text-[#f1f1f1]"
                  >
                    Details
                  </Button>
                </Box>
                <Divider />
                {clickedIdx === idx && (
                  <Modal
                    open={openCreateModal}
                    onClose={handleCloseCreateModel}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box className="absolute w-[90%] max-w-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                      <main className="">
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
                          <div className="absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1 mb-10">
                            <ImIcons.ImCross onClick={handleCloseCreateModel} />
                          </div>
                          {/* <Typography
                        variant="h4"
                        align="center"
                        className="font-bold"
                      >
                        Welcome to Medstem
                      </Typography> */}
                          <Typography
                            variant="h6"
                            align="justify"
                            sx={{ textAlign: 'center' }}
                          >
                            Medical History
                          </Typography>
                          <Typography
                            align="justify"
                            sx={{ textAlign: 'center' }}
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
                                fullWidth
                                label="Description"
                                placeholder="Description"
                                margin="normal"
                                size="small"
                                className="w-[80%]"
                              />
                            )}
                          />

                          <Button
                            onClick={(event) => {
                              handleCloseCreateModel();
                            }}
                            color="primary"
                            style={{
                              backgroundColor: '#0093df',
                              color: '#fff',
                              textTransform: 'capitalize',
                              fontWeight: 'bold',
                              display: 'block',
                              margin: '20px auto',
                              padding: '5px 20px'
                            }}
                            className="hover:bg-black mx-auto"
                          >
                            Submit
                          </Button>
                        </Paper>
                      </main>
                    </Box>
                  </Modal>
                )}
              </div>
            ))}
          </Box>
          <div className="relative flex items-center mt-12 justify-between">
            {/* <Box
              className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
              onClick={handleBack}
            >
              <IoIcons.IoArrowBack />
            </Box>
            <Button
              variant="contained"
              style={{
                background: '#1A4CFF',
                color: 'white',
                textTransform: 'capitalize'
              }}
              type="submit"
              className={`bg-[#1A4CFF] capitalize text-white`}
              onClick={handleNext}
            >
              Continue
            </Button> */}
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
