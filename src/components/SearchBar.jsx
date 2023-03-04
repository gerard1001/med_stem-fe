import React from 'react';
import { IconButton, TextField } from '@mui/material';
import * as IoIcons from 'react-icons/io5';

const SearchBar = ({ setSearchQuery }) => (
  <form className="relative w-full h-min">
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="First name, last name or keyword"
      variant="outlined"
      placeholder="Search..."
      sx={{ backgroundColor: '#EDF0F2', width: '100%' }}
    />
    <IconButton
      type="submit"
      aria-label="search"
      sx={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        padding: 0,
        border: '2px solid #797979'
      }}
      className="right-0"
    >
      <IoIcons.IoCloseSharp className="text-[16px] font-bold" />
    </IconButton>
  </form>
);
export default SearchBar;
