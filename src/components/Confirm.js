import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import * as IoIcons from 'react-icons/io5';

const Confirm = ({
  handleNext,
  handleBack,
  values: {
    first_name,
    last_name,
    email,
    password,
    gender,
    birth_date,
    phone,
    city,
    address_1,
    country,
    id_number,
    marital_status,
    message
  }
}) => {
  const handleSubmit = () => {
    console.log({
      first_name,
      last_name,
      email,
      password,
      gender,
      birth_date,
      phone,
      city,
      address_1,
      country,
      id_number,
      marital_status,
      message
    });
    handleNext();
  };

  return (
    <>
      <List disablePadding className="h-[45vh] overflow-auto">
        <ListItem>
          <ListItemText primary="Family Name" secondary={first_name} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Given Name" secondary={last_name} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="ID number" secondary={id_number} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Marital Status" secondary={marital_status} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Email Address" secondary={email} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Gender" secondary={gender} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Date of birth" secondary={birth_date} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Country" secondary={country} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="City" secondary={city} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Address 1" secondary={address_1} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={phone.length > 0 ? phone : 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Info Medicale" secondary={message} />
        </ListItem>
      </List>

      <div className="relative flex items-center mt-12 justify-center">
        <div
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </div>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          color="#fff"
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
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          5/5
        </div>
      </div>
    </>
  );
};

export default Confirm;
