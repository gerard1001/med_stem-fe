import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import * as IoIcons from 'react-icons/io5';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const Confirm = ({ data }) => {
  const { register, trigger, setValue } = useFormContext();

  const handleBack = () => {
    setValue('activeStep', 4);
  };

  const handleNext = () => {
    setValue('activeStep', 6);
  };

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <>
      <List disablePadding className="h-[45vh] overflow-auto">
        <ListItem>
          <ListItemText primary="Family Name" secondary={data.first_name} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Given Name" secondary={data.last_name} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="ID number" secondary={data.id_number} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Marital Status"
            secondary={data.marital_status}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Email Address" secondary={data.email} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Gender" secondary={data.gender} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Date of birth" secondary={data.birth_date} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Country" secondary={data.country} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="City" secondary={data.city} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Address 1" secondary={data.address_1} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Address 1" secondary={data.address_2} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={data.phone.length > 0 ? data.phone : 'Not Provided'}
          />
        </ListItem>

        <Divider />

        {/* <ListItem>
          <ListItemText primary="Info Medicale" secondary={data.} />
        </ListItem> */}
      </List>

      <div className="relative flex items-center mt-12 justify-center">
        <Box
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </Box>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          style={{
            background: '#1A4CFF',
            color: 'white',
            textTransform: 'capitalize'
          }}
          type="submit"
          className="bg-[#1A4CFF] capitalize text-white"
        >
          Complete
        </Button>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 absolute right-5 text-[16px]">
          5/5
        </div>
      </div>
    </>
  );
};

export default Confirm;
