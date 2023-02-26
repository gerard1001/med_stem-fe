import { Box, Button, Divider, Modal, Paper, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io5';
// import { useStyles } from '../../pages/Form';
import mason from '../../utils/mson';

const ThirdStep = ({
  chooseMessage,
  values: { message },
  handleNext,
  handleChange,
  handleBack,
  formErrors
}) => {
  const isValid = true;
  const [value, setValue] = React.useState({});
  const [text, setText] = React.useState({});
  const [id, setId] = React.useState({});
  const [description, setDescription] = React.useState('');
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteCycle = (e) => {
    setAnchorEl(null);
  };

  const handleOpenCreateCycle = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
    setValue('yes');
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event, idx) => {
    event.preventDefault();

    console.log(event);
    handleOpenCreateCycle();
    setText((prev) => ({
      ...prev,
      [idx]: event.target.name
    }));
  };

  const variable = [];
  const string = [];

  for (let i = 0; i < Object.keys(text).length; i++) {
    const obj = {};
    const pos = Object.keys(text)[i];
    obj.id = id[pos];
    obj.txt = text[pos];
    obj.descr = description[pos] || '';
    const str = `${obj.id}#%#%${obj.descr}`;
    string.push(str);
    variable.push(obj);
  }

  const msg = string.join('#&#&');

  // const storeData = () => {
  //   localStorage.setItem('InfoMessage', JSON.stringify(message));
  // };

  // const defaultVes = localStorage.getItem('InfoMessage');

  // console.log({ defaultVes });
  // console.log(variable);

  return (
    <>
      {' '}
      <div className="font-bold ml-[3%] third-step">Medical Information</div>
      {/* <Grid noValidate>
        <TextField
          variant="outlined"
          fullWidth
          label="Info medicale"
          name="message"
          placeholder="Enter your address"
          value={message || msg}
          margin="normal"
          onChange={handleChange}
          size="small"
        />
      </Grid> */}
      <form
        onSubmit={(e) => {
          // e.preventDefault();
          handleNext();
          chooseMessage(msg);
          return false;
        }}
        className=""
      >
        {mason.map((values, idx) => (
          <div>
            <form key={values.info_id} className="flex items-center h-[50px]">
              <FormControl
                id="form-control"
                sx={{ m: 3 }}
                error={error}
                variant="standard"
                // style={{ display: 'flex', alignItems: 'center' }}
              >
                <FormLabel id="demo-error-radios">{values.info_name}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  id="demo-radios"
                  name={values.info_name}
                  value={value[idx]}
                  onChange={(event) => {
                    setValue((prev) => ({
                      ...prev,
                      [idx]: event.target.value
                    }));
                  }}
                  sx={{ display: 'flex', alignItems: 'center' }}
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
                      setText((prev) => ({
                        ...prev,
                        [idx]: values.info_name
                      }));
                      setId((prev) => ({
                        ...prev,
                        [idx]: values.info_id
                      }));
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
                      delete text[idx];
                      delete description[idx];
                    }}
                  />
                </RadioGroup>
                {/* <FormHelperText>{helperText}</FormHelperText> */}
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
            </form>
            <Divider />
          </div>
        ))}
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
            Continue
          </Button>
          <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
            3/5
          </div>
        </div>
      </form>
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModel}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="absolute w-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%]">
          <main className="">
            <Paper>
              <div className="absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1">
                <ImIcons.ImCross onClick={handleCloseCreateModel} />
              </div>
              <Typography variant="h4" align="center" className="font-bold">
                Welcome to Medstem
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className="font-bold mt-10"
              >
                Medical History
              </Typography>
              <Typography align="justify" className="text-[16px] mb-10 mt-3">
                {text[clickedIdx]}
              </Typography>

              <TextField
                variant="outlined"
                fullWidth
                label="Description"
                name="description"
                placeholder="Description"
                margin="normal"
                value={description[clickedIdx]}
                onChange={(event) => {
                  setDescription((prev) => ({
                    ...prev,
                    [clickedIdx]: event.target.value
                  }));
                }}
                required
                size="small"
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
        {/* <Box style={{ margin: '30px 0 10px' }}>
          <Typography variant="h4" align="center" className="font-bold">
            Welcome to Medstem
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            style={{ margin: '10px 0' }}
          >
            Already have an account?{' '}
            <span className="text-primary font-bold cursor-pointer">
              Log in
            </span>
          </Typography>
        </Box> */}
      </Modal>
    </>
  );
};

export default ThirdStep;
