import { Autocomplete, styled, TextField } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQueryRedux } from '../redux/reducers/user.reducer';

const StyledAutoComplete = styled(Autocomplete)(() => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#E7E7E7',
    overflow: 'hidden'
  },
  '& .MuiInputBase-root.Mui-focused': {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiPaper-root': {
    backgroundColor: '#E7E7E7'
  },
  '& .MuiPaper-rounded': {
    borderRadius: 0
  }
}));

const SmallSearchBar = ({
  className,
  inputValue,
  setInputValue,
  filteredData
}) => {
  const dispatch = useDispatch();
  const newFilteredData = filteredData?.map((value) => ({
    ...value,
    label: value.label?.split(', ')[0]
  }));
  return (
    <div className={clsx('relative w-full h-max max-w-[300px]', className)}>
      <StyledAutoComplete
        disablePortal
        id="combo-box-demo"
        options={filteredData}
        value={inputValue}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          const name = newInputValue?.split(', ')[0];
          const id = newInputValue?.split(', ')[1];
          setInputValue(name || '');
          dispatch(setSearchQueryRedux(id));
        }}
        sx={{ width: '100%' }}
        // disableClearable
        disableCloseOnSelect
        clearOnBlur
        componentsProps={{
          paper: {
            sx: {
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px'
            },
            // square: true,
            elevation: 0,
            className: 'bg-[#E7E7E7]'
          }
        }}
        renderInput={(params) => {
          const modifiedParams = {
            ...params,
            inputProps: {
              ...params.inputProps,
              value: params.inputProps.value.split(', ')[0]
            }
          };
          return (
            <TextField
              {...modifiedParams}
              id="search-bar"
              className="text"
              variant="outlined"
              placeholder="Select Doctor"
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: '5px 10px',
                  // backgroundColor: '#F5F5F5',
                  borderRadius: '5px'
                },
                '& .MuiFormLabel-root': {
                  top: '-10px'
                },
                '& .MuiInputLabel-root': {
                  top: '-1px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '5px'
                }
              }}
              size="small"
            />
          );
        }}
      />
    </div>
  );
};
export default SmallSearchBar;
