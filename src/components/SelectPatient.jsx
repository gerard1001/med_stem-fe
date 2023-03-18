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
import { getYear } from 'date-fns';
import { capitalize } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const formatName = ({ first_name = '', last_name = '', birth_date = null }) => {
  return `${capitalize(first_name)} ${capitalize(last_name)} ${getYear(
    new Date(birth_date)
  )} y.`;
};
const formatId = ({ client_id = '' }) => `ID ${client_id}`;

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

function SelectPatient({ selected, setSelected, patients, className }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(selected ? formatId(selected) : '');

  useEffect(() => {
    if (selected) {
      setValue(formatId(selected));
    }
  }, [selected]);

  return (
    <Stack
      direction="row"
      className={clsx('flex-wrap gap-2 items-center', className)}
    >
      <Typography className="font-semibold text-lg opacity-70">
        Select Patient
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
              return patients?.map((patient) => (
                <StyledMenuItem
                  selected={selected?.client_id === patient.client_id}
                  onClick={(e) => {
                    setSelected(patient);
                  }}
                  key={patient.client_id}
                >
                  <ListItemText
                    primary={`${formatId(patient)}, M.D`}
                    secondary={formatName(patient)}
                    classes={{ primary: 'truncate', secondary: 'truncate' }}
                  />
                </StyledMenuItem>
              ));
            }, [patients, selected])}
          </Box>
        </Popper>
      </Box>
    </Stack>
  );
}

export default SelectPatient;
