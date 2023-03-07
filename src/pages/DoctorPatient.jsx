import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Box,
  IconButton,
  Typography,
  Grid
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FiFilter } from 'react-icons/fi';
import { RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

const initialFilterState = {
  name: '',
  email: '',
  phone: ''
};

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '987-654-3210'
  },
  {
    id: 3,
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    phone: '555-555-5555'
  }
];

const DoctorPatient = () => {
  const [filter, setFilter] = useState(initialFilterState);
  const [globalFilter, setGlobalFilter] = useState('');
  const [search, setSearch] = useState(false);
  const [columnFilter, setColumnFilter] = useState(false);
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleGlobalChange = (event) => {
    setGlobalFilter(event.target.value);
  };

  const globalFilteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      item.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
      item.phone.toLowerCase().includes(globalFilter.toLowerCase())
  );

  console.log({ globalFilteredData });

  const filteredData = data.filter((row) => {
    const nameMatch = row.name
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const emailMatch = row.email
      .toLowerCase()
      .includes(filter.email.toLowerCase());
    const phoneMatch = row.phone
      .toLowerCase()
      .includes(filter.phone.toLowerCase());
    return nameMatch && emailMatch && phoneMatch;
  });

  return (
    <Box className="w-[80%] md:w-[98%] mx-auto py-10">
      <Box
        className="w-[100%] border border-[#71A9F7]
] flex flex-col justify-between py-3 px-2 my-3"
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography className="">Total Patients (102)</Typography>
          </Grid>
          <Grid item xs>
            {search && (
              <Box className="w-[1/3]">
                <TextField
                  size="small"
                  name="name"
                  label="Global filter"
                  variant="outlined"
                  value={globalFilter}
                  onChange={handleGlobalChange}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs>
            <Box className="flex items-center gap-4 w-[1/3]">
              <IconButton
                onClick={() => {
                  setSearch(true);
                  setColumnFilter(false);
                }}
              >
                <RiSearchLine />
              </IconButton>
              <IconButton>
                <RiSortDesc />
              </IconButton>
              <IconButton
                onClick={() => {
                  setSearch(false);
                  setColumnFilter(true);
                }}
              >
                <FiFilter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box clasName="flex flex-row flex-wrap items-center w-[100%]"></Box>
        <Box>
          {!search && columnFilter && (
            <Box className="flex items-center my-1 gap-1 py-2 min-w-[100%] overflow-x-auto">
              <TextField
                size="small"
                name="name"
                label="Filter by Name"
                variant="outlined"
                value={filter.name}
                className="w-[150px] text-[14px]"
                sx={{ width: '150px', minWidth: '120px' }}
                onChange={handleChange}
              />
              <TextField
                size="small"
                name="name"
                label="Given Name"
                variant="outlined"
                value={filter.name}
                className="w-[150px] text-[14px]"
                sx={{ width: '150px', minWidth: '120px' }}
                onChange={handleChange}
              />
              <TextField
                size="small"
                name="email"
                label="Family Email"
                variant="outlined"
                value={filter.email}
                className="w-[150px] text-[14px]"
                sx={{ width: '150px', minWidth: '120px' }}
                onChange={handleChange}
              />
              <TextField
                size="small"
                name="email"
                label="Gender"
                variant="outlined"
                value={filter.email}
                className="w-[150px] text-[14px]"
                sx={{ width: '150px', minWidth: '120px' }}
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  sx={{
                    fontSize: '12px',
                    width: '170px',
                    minWidth: '140px',
                    height: 'min-content',
                    '& .MuiInputBase-input': {
                      height: '9px'
                    }
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
                <DatePicker
                  label="Last Appointment"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  sx={{
                    fontSize: '12px',
                    width: '170px',
                    minWidth: '140px',
                    height: 'min-content',
                    '& .MuiInputBase-input': {
                      height: '9px'
                    }
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
                <DatePicker
                  label="Next Appointment"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  sx={{
                    fontSize: '12px',
                    width: '170px',
                    minWidth: '140px',
                    height: 'min-content',
                    '& .MuiInputBase-input': {
                      height: '9px'
                    }
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          )}
        </Box>
      </Box>
      <Box className="w-[100%] border border-[#71A9F7] p-2 mt-4">
        <TableContainer component={Paper}>
          <Table className="" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            {!search ? (
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      <BsThreeDots className="w-min mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {globalFilteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      <BsThreeDots className="w-min mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DoctorPatient;
