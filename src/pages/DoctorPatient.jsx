import { useEffect, useState } from 'react';
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
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { FiFilter } from 'react-icons/fi';
import { RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientList } from '../redux/reducers/patient.reducer';
import formatArray from '../utils/formatArray';
import { useNavigate } from 'react-router';

const styles = {
  container: {
    marginTop: '16px'
  },
  filter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '16px'
  },
  tableHeader: {
    fontWeight: 'bold'
  }
};

const MyTable = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.data.data);
  const [filterFirstName, setFilterFirstName] = useState('');
  const [filterLastName, setFilterLastName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterId, setFilterId] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterBirthDate, setFilterBirthDate] = useState('');
  const [filterPrevAppointment, setFilterPrevAppointment] = useState('');
  const [filterNextAppointment, setFilterNextAppointment] = useState('');

  const [globalFilter, setGlobalFilter] = useState('');

  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [search, setSearch] = useState(false);
  const [columnFilter, setColumnFilter] = useState(false);

  useEffect(() => {
    dispatch(getPatientList());
  }, []);

  const handleGlobalChange = (event) => {
    setGlobalFilter(event.target.value);
  };

  console.log({ patients });

  const chaos = formatArray(patients);

  console.log({ chaos });

  const filteredData = chaos?.filter(
    ({
      firstName,
      lastName,
      email,
      id,
      gender,
      birthDate,
      nextAppointments,
      prevAppointments
    }) => {
      if (
        !filterFirstName &&
        !filterLastName &&
        !filterId &&
        !filterEmail &&
        !filterGender &&
        !filterNextAppointment &&
        !filterPrevAppointment &&
        !filterBirthDate
      ) {
        return true;
      }
      if (
        filterFirstName &&
        firstName.toLowerCase().includes(filterFirstName.toLowerCase())
      ) {
        return true;
      }
      if (
        filterLastName &&
        lastName.toLowerCase().includes(filterLastName.toLowerCase())
      ) {
        return true;
      }
      if (
        filterGender &&
        gender.toLowerCase().includes(filterGender.toLowerCase())
      ) {
        return true;
      }
      if (
        filterEmail &&
        email.toLowerCase().includes(filterEmail.toLowerCase())
      ) {
        return true;
      }
      if (
        filterId &&
        JSON.stringify(id).toLowerCase().includes(filterId.toLowerCase())
      ) {
        return true;
      }
      if (
        filterBirthDate &&
        JSON.stringify(birthDate)
          .toLowerCase()
          .includes(format(new Date(filterBirthDate), 'dd-MM-yyyy'))
      ) {
        return true;
      }
      if (
        filterNextAppointment &&
        JSON.stringify(nextAppointments)
          .toLowerCase()
          .includes(format(new Date(filterNextAppointment), 'dd/MM/yyyy'))
      ) {
        return true;
      }
      if (
        filterPrevAppointment &&
        JSON.stringify(prevAppointments)
          .toLowerCase()
          .includes(format(new Date(filterPrevAppointment), 'dd/MM/yyyy'))
      ) {
        return true;
      }
      return false;
    }
  );

  const globalFilteredData = chaos?.filter(
    ({
      firstName,
      lastName,
      id,
      birthDate,
      prevAppointments,
      nextAppointments
    }) =>
      firstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
      lastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
      birthDate.toLowerCase().includes(globalFilter.toLowerCase()) ||
      prevAppointments.toLowerCase().includes(globalFilter.toLowerCase()) ||
      nextAppointments.toLowerCase().includes(globalFilter.toLowerCase()) ||
      JSON.stringify(id).toLowerCase().includes(globalFilter.toLowerCase())
  );

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortOptionClick = (option) => {
    setSortOrder(option);
    setSortAnchorEl(null);
  };

  const sortedData = filteredData?.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return b.firstName.localeCompare(a.firstName);
    }
  });

  const sortedGlobalData = globalFilteredData?.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return b.firstName.localeCompare(a.firstName);
    }
  });
  const handleReset = () => {
    setFilterFirstName('');
    setFilterLastName('');
    setFilterBirthDate('');
    setFilterPrevAppointment('');
    setFilterNextAppointment('');
    setFilterEmail('');
    setFilterGender('');
    setFilterId('');
  };

  const finalData = search ? sortedGlobalData : sortedData;
  const patientCount = patients?.length || 0;

  const nav = useNavigate();

  return (
    <Box className="p-10 sm:p-3">
      <Box
        className="w-[100%] border border-[#71A9F7]
] flex flex-col justify-between py-3 px-2 my-3 bg-white"
      >
        <Box className="flex flex-row items-center justify-between">
          <Box>
            <Typography className="">
              Total Patients ({patientCount})
            </Typography>
          </Box>
          <Box className="flex items-center">
            {search && (
              <Box className="">
                <TextField
                  size="small"
                  name="name"
                  label="Search..."
                  variant="outlined"
                  value={globalFilter}
                  autoFocus
                  type="search"
                  onChange={handleGlobalChange}
                />
              </Box>
            )}
          </Box>
          <Box>
            <Box className="flex items-center gap-4 ">
              <IconButton
                onClick={() => {
                  setSearch(true);
                  setColumnFilter(false);
                }}
              >
                <RiSearchLine />
              </IconButton>
              <IconButton onClick={handleSortClick}>
                <RiSortDesc />
              </IconButton>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => handleSortOptionClick('asc')}>
                  A to Z
                </MenuItem>
                <MenuItem onClick={() => handleSortOptionClick('desc')}>
                  Z to A
                </MenuItem>
              </Menu>

              <IconButton
                onClick={() => {
                  setSearch(false);
                  setColumnFilter(true);
                }}
              >
                <FiFilter />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {!search && columnFilter && (
          <Box className="flex flex-col gap-2 mt-2">
            <Box className="flex items-center justify-between">
              <Button
                className="bg-[#DCE0E5] border border-[#03234d] rounded-[5px] capitalize text-black"
                disabled
              >
                All Filters
              </Button>
              <Box className="flex items-center gap-2">
                <Button
                  className="border border-[#1f2630] rounded-[5px] capitalize text-black"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  className="bg-[#1A4CFF] capitalize text-white rounded-md"
                  onClick={handleReset}
                >
                  Find
                </Button>
              </Box>
            </Box>
            <Box className="flex flex-nowrap items-center gap-1 min-w-[100%] overflow-x-auto">
              <TextField
                size="small"
                label="ID number"
                variant="outlined"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
                margin="dense"
                className="w-[120px] min-w-[120px]"
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '5px 10px'
                  },
                  '& .MuiFormLabel-root': {
                    top: '-4px'
                  }
                }}
              />
              <TextField
                size="small"
                label="Family name"
                variant="outlined"
                value={filterFirstName}
                onChange={(e) => setFilterFirstName(e.target.value)}
                margin="dense"
                className="w-[120px] min-w-[120px]"
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '5px 10px'
                  },
                  '& .MuiFormLabel-root': {
                    top: '-4px'
                  }
                }}
              />
              <TextField
                size="small"
                label="Given name"
                variant="outlined"
                value={filterLastName}
                onChange={(e) => setFilterLastName(e.target.value)}
                margin="dense"
                className="w-[120px] min-w-[120px]"
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '5px 10px'
                  },
                  '& .MuiFormLabel-root': {
                    top: '-4px'
                  }
                }}
              />
              <TextField
                size="small"
                label="Gender"
                variant="outlined"
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                margin="dense"
                className="w-[120px] min-w-[120px]"
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '5px 10px'
                  },
                  '& .MuiFormLabel-root': {
                    top: '-4px'
                  }
                }}
              />
              <Box className="pt-[3px]">
                <DatePicker
                  label="Birth date"
                  value={filterBirthDate}
                  onChange={(newValue) => setFilterBirthDate(newValue)}
                  sx={{
                    width: '150px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-10px'
                    },
                    '& .MuiButtonBase-root': {
                      paddingY: 0
                    }
                  }}
                />
              </Box>
              <Box className="pt-[3px]">
                <DatePicker
                  label="Last appointment"
                  value={filterPrevAppointment}
                  onChange={(newValue) => setFilterPrevAppointment(newValue)}
                  sx={{
                    width: '200px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-10px'
                    },
                    '& .MuiButtonBase-root': {
                      paddingY: 0
                    }
                  }}
                />
              </Box>
              <Box className="pt-[3px]">
                <DatePicker
                  label="Next appointment"
                  value={filterNextAppointment}
                  onChange={(newValue) => setFilterNextAppointment(newValue)}
                  sx={{
                    width: '200px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-10px'
                    },
                    '& .MuiButtonBase-root': {
                      paddingY: 0
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box className="w-[100%] border border-[#71A9F7] p-2 mt-4 bg-white">
        <TableContainer component={Paper} elevation={0}>
          <Table className="text-[30px]" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  className="text-[17px] md:text-[14px]"
                  style={styles.tableHeader}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  className="text-[17px] md:text-[14px]"
                  style={styles.tableHeader}
                >
                  ID
                </TableCell>
                <TableCell
                  align="left"
                  className="text-[17px] md:text-[14px]"
                  style={styles.tableHeader}
                >
                  Last Appointment
                </TableCell>
                <TableCell
                  align="left"
                  className="text-[17px] md:text-[14px]"
                  style={styles.tableHeader}
                >
                  Next Appointment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalData !== '' ? (
                <>
                  {finalData?.map(
                    ({
                      client_id,
                      id,
                      firstName,
                      lastName,
                      birthDate,
                      nextAppointments,
                      prevAppointments
                    }) => (
                      <TableRow
                        key={client_id}
                        className="cursor-default"
                        onClick={() => {
                          nav(`/dashboard/patient/profile/${client_id}`);
                        }}
                      >
                        <TableCell
                          align="left"
                          className="text-[17px] md:text-[14px]"
                        >{`${firstName} ${lastName}`}</TableCell>
                        <TableCell
                          align="left"
                          className="text-[17px] md:text-[14px]"
                        >
                          {id}
                        </TableCell>
                        <TableCell
                          align="left"
                          className="text-[17px] md:text-[14px]"
                        >
                          {prevAppointments}
                        </TableCell>
                        <TableCell
                          align="left"
                          className="text-[17px] md:text-[14px]"
                        >
                          {nextAppointments}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="text-[17px] md:text-[14px]"
                    >
                      No results found
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MyTable;
