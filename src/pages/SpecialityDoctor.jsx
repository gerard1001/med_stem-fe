import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctorList } from '../redux/reducers/doctor.reducer';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import { Typography, Box, IconButton, TextField, Button } from '@mui/material';
import * as CiIcons from 'react-icons/ci';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';
import HomeNavBar from '../components/HomeNavBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader/Loader';

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data?.filter(
      (values) =>
        values.first_name.toLowerCase().includes(query.toLowerCase()) ||
        values.last_name.toLowerCase().includes(query.toLowerCase())
    );
  }
};

const SpecialityDoctor = () => {
  const doctors = useSelector((state) => state.doctor);
  const departments = useSelector((state) => state.department);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [doctorId, setDoctorId] = React.useState('');
  const [selectedDoctor, setSelectedDoctor] = React.useState('');

  let urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let departmentId;

  urlId.includes('?')
    ? (departmentId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (departmentId = urlId);

  const filteredData = doctors?.data?.data?.filter((obj) =>
    obj.departments.some((values) => values.department_id === departmentId)
  );

  const data = filteredData?.map((values) => {
    return `${values.first_name} ${values.last_name}`;
  });

  const dataFiltered = filterData(searchQuery, filteredData);
  console.log({ departmentId });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDoctorList());
    dispatch(getDepartmentList());
  }, []);

  const nav = useNavigate();
  return (
    <Box>
      {' '}
      <HomeNavBar />
      <Box className="w-[80%] md:w-[100%] mx-auto max-w-[800px] p-5">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>{' '}
      {doctors?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
          <Loader />
        </Box>
      )}
      {!doctors?.loading && (
        <Box>
          <Box className="flex flex-col items-end w-fit p-0 mx-auto pb-10">
            <List
              className="max-w-[640px] w-[100%] px-5 mx-auto mb-5 overflow-auto"
              sx={{ marginX: 'auto', marginTop: 5 }}
            >
              {dataFiltered?.map((data, idx) => {
                return (
                  <ListItem
                    key={data.doctor_id}
                    className={`shadow-sm border hover:bg-[#EDF0F2] rounded-md my-4 cursor-pointer ${
                      doctorId === data.doctor_id &&
                      'border-[2px] border-[#0093df]'
                    }`}
                    onClick={() => {
                      setDoctorId(data.doctor_id);
                    }}
                  >
                    <img
                      src={data.picture}
                      alt=""
                      className="w-[40px] h-[40px] mr-4 rounded-[50%]"
                    />
                    <ListItemText
                      primary={`${data.first_name} ${data.last_name}, M.D - ${data.speciality}`}
                      secondary={`Total experience (years): ${data.experience_years},  Cost per appointment: ${data.cost_per_appointment}$`}
                    />
                  </ListItem>
                );
              })}
            </List>
            <Button
              disabled={!doctorId}
              onClick={() => {
                nav(`/doctor_page/${doctorId}`);
              }}
              sx={{
                width: '120px',
                backgroundColor: '#D1D1D1',
                color: '#000',
                marginTop: '40px',
                ...(doctorId && {
                  backgroundColor: '#1A4CFF',
                  color: '#fff',
                  ':hover': { backgroundColor: '#1A4CFA' }
                })
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
      {/* <div style={{ padding: 3 }}>
        {dataFiltered?.map((d, idx) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: 'normal',
              fontSize: 20,
              color: 'blue',
              margin: 1,
              width: '250px',
              BorderColor: 'green',
              borderWidth: '10px'
            }}
            key={idx}
          >
            {d}
          </div>
        ))}
      </div> */}
    </Box>
  );
};

export default SpecialityDoctor;
