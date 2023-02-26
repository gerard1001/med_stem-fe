import * as React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  Modal,
  Paper,
  Divider
} from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@material-ui/core/Typography';
import * as IoIcons from 'react-icons/io5';
import * as ImIcons from 'react-icons/im';
import { mason } from '../../utils/mson';
import { useStyles } from '../../pages/Form';

const FourthStep = ({ values: { message }, handleNext, handleBack }) => {
  const [value, setValue] = React.useState({});
  const [text, setText] = React.useState({});
  const [id, setId] = React.useState({});
  const [description, setDescription] = React.useState('');
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const [error, setError] = React.useState(false);

  const isValid = true;

  const valueToDisplay = mason?.filter(
    (values) => values.info_description !== ''
  );

  return (
    <>
      {' '}
      <div className="font-bold ml-[3%]">Other Medical History</div>
      {valueToDisplay.map((values, idx) => (
        <div>
          <form key={idx} className="block">
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
                    setShowDetails((showDetails) => ({
                      ...showDetails,
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
                    setShowDetails((showDetails) => ({
                      ...showDetails,
                      [idx]: false
                    }));
                    delete text[idx];
                    delete description[idx];
                  }}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              variant="outlined"
              fullWidth
              label=""
              name="description"
              placeholder=""
              margin="normal"
              value={description[Number(values.info_description)]}
              onChange={(event) => {
                setDescription((prev) => ({
                  ...prev,
                  [Number(values.info_description)]: event.target.value
                }));
              }}
              style={{ background: '#e7e7e7' }}
              size="medium"
            />
          </form>
          <Divider />
        </div>
      ))}
      <div className="relative flex items-center mt-12 justify-center">
        <div
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </div>
        <Button
          onClick={handleNext}
          variant="contained"
          disabled={!isValid}
          color="#fff"
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
          4/5
        </div>
      </div>
    </>
  );
};

export default FourthStep;
