import { Box, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import BackButton from '../components/BackButton';
import HomeNavBar from '../components/HomeNavBar';
import Loader from '../components/Loader/Loader';
import LoadingButton from '../components/LoadingButton';
import SearchBar from '../components/SearchBar';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import { getDoctorList } from '../redux/reducers/doctor.reducer';

const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  return data?.filter(
    (values) =>
      values.first_name.toLowerCase().includes(query.toLowerCase()) ||
      values.last_name.toLowerCase().includes(query.toLowerCase())
  );
};

const SpecialityDoctor = () => {
  const doctors = useSelector((state) => state.doctor);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [doctorId, setDoctorId] = React.useState('');

  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let departmentId;

  urlId.includes('?')
    ? (departmentId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (departmentId = urlId);

  const filteredData = doctors?.data?.data?.filter((obj) =>
    obj.departments.some((values) => values.department_id === departmentId)
  );

  const dataFiltered = filterData(searchQuery, filteredData);

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
      <Box className="max-w-[900px] w-[100%] mx-auto px-8 pt-8 flex flex-col gap-7">
        <Stack direction="row" className="items-center gap-3">
          <BackButton to="/find_doctor" />
          <Typography variant="h6">Select Doctor&apos;s speciality</Typography>
        </Stack>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>{' '}
      {doctors?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
          <Loader />
        </Box>
      )}
      {!doctors?.loading && (
        <Box>
          <Box className="flex flex-col items-end p-0 mx-auto pb-10 max-w-[900px] w-[100%]">
            <List
              className="w-full px-8 pb-8 overflow-auto"
              sx={{ marginX: 'auto', marginTop: 1 }}
            >
              {dataFiltered?.map((data) => {
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
                      primary={`${data.first_name} ${
                        data.last_name
                      }, M.D - ${data.departments
                        .map((value) => value.speciality_name)
                        .join(', ')}`}
                      secondary={`Total experience (years): ${data.experience_years},  Cost per appointment: ${data.cost_per_appointment}$`}
                      classes={{ primary: 'truncate' }}
                    />
                  </ListItem>
                );
              })}
              <Stack direction="row-reverse" className="w-full">
                <LoadingButton
                  disabled={!doctorId}
                  onClick={() => {
                    nav(`/find_doctor/appointment/${doctorId}`);
                  }}
                  sx={{
                    width: '120px',
                    marginTop: '40px'
                  }}
                >
                  Next
                </LoadingButton>
              </Stack>
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SpecialityDoctor;
