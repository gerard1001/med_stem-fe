import { Box, Button, Divider, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';
import * as IoIcons from 'react-icons/io5';
import mason from '../../utils/mson';

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
          <form key={values.info_id} className="block">
            <FormControl
              id="form-control"
              sx={{ marginTop: 3 }}
              error={error}
              variant="standard"
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
                    setShowDetails((state) => ({
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
          <Divider sx={{ marginTop: 3 }} />
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
          onClick={handleNext}
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
          4/5
        </div>
      </div>
    </>
  );
};

export default FourthStep;
