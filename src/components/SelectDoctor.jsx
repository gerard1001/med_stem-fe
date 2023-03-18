import {
  Autocomplete,
  Box,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Popper,
  Select,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import clsx from 'clsx';
import { capitalize } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const formatName = ({ first_name = '', last_name = '' }) => {
  const splitLast = last_name.split(' ').filter((item) => item !== '');
  return `${capitalize(first_name)} ${splitLast
    .slice(0, -1)
    .map((item) => item[0])
    .join('. ')} ${splitLast.slice(-1)[0]}`;
};

const StyledMenuItem = styled(MenuItem)(() => ({
  '& .Mui-selected': {
    backgroundColor: '#EEF1F5'
  },
  '& .MuiListItemText-primary': {
    color: '#000',
    // color: '#9DA4AD',
    lineHeight: '16px'
  },
  '& .MuiListItemText-secondary': {
    color: '#6A6F75',
    fontSize: '12px',
    lineHeight: '12px'
  }
}));

function SelectDoctor({ selected, setSelected, doctors, className }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(selected ? formatName(selected) : '');

  useEffect(() => {
    if (selected) {
      setValue(formatName(selected));
    }
  }, [selected]);

  return (
    <Stack
      direction="row"
      className={clsx('flex-wrap gap-2 items-center', className)}
    >
      <Typography className="font-semibold text-lg opacity-70">
        Select Doctor
      </Typography>
      <Box
        className={`h-[35px] max-w-[250px] w-full min-w-[100px] bg-[#E7E7E7] rounded-lg ${
          anchorEl ? 'rounded-b-none' : ''
        } relative`}
      >
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          onBlur={(e) => {
            setTimeout(() => {
              setAnchorEl(null);
            }, [100]);
          }}
          className="w-full h-full appearance-none outline-none m-0 p-3 bg-transparent"
        />
        <Popper
          sx={{ width: '100%', zIndex: 12000, mt: '-50px' }}
          disablePortal
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom"
        >
          <Box className="w-full rounded-b-lg bg-[#e7e7e7] overflow-hidden">
            {useMemo(() => {
              return doctors?.map((doctor) => (
                <StyledMenuItem
                  selected={selected?.doctor_id === doctor.doctor_id}
                  onClick={(e) => {
                    setSelected(doctor);
                  }}
                  key={doctor.doctor_id}
                >
                  <ListItemText
                    primary={`${formatName(doctor)}, M.D`}
                    secondary={
                      doctor.departments[0]?.speciality_name || 'no speciality'
                    }
                    classes={{ primary: 'truncate', secondary: 'truncate' }}
                  />
                </StyledMenuItem>
              ));
            }, [doctors, selected])}
          </Box>
        </Popper>
      </Box>
    </Stack>
  );
}

export default SelectDoctor;
