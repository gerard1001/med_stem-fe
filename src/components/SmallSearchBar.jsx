import React from 'react';
import { IconButton, TextField, Autocomplete } from '@mui/material';
import * as IoIcons from 'react-icons/io5';

const SmallSearchBar = ({ setSearchQuery, filteredData }) => {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  // console.log({ value, inputValue });
  return (
    <form className="relative w-full h-min max-w-[300px] my-10">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={filteredData ? filteredData : []}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setSearchQuery(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="search-bar"
            className="text"
            label="Search doctor"
            variant="outlined"
            placeholder="Search..."
            sx={{ backgroundColor: '#EDF0F2', width: '100%' }}
            size="small"
          />
        )}
      />
    </form>
  );
};
export default SmallSearchBar;
