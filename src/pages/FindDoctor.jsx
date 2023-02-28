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

const SearchBar = ({ setSearchQuery }) => (
  <form className="relative w-full h-min">
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Last name, speciality or keyword"
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

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data?.filter((values) => values?.toLowerCase().includes(query));
  }
};

const FindDoctor = () => {
  const doctors = useSelector((state) => state.doctor);
  const departments = useSelector((state) => state.department);
  const [searchQuery, setSearchQuery] = React.useState('');
  const dataFiltered = filterData(searchQuery, data);
  const [moreOPtions, setMoreOptions] = React.useState(false);
  const [allDoctors, setAllDoctors] = React.useState(false);
  const [allSpecialities, setAllSpecialities] = React.useState(false);
  const [hideSearchBox, setHideSearchBox] = React.useState(true);
  const [specialityId, setSpecialityId] = React.useState('');

  const dispatch = useDispatch();

  const nav = useNavigate();

  React.useEffect(() => {
    dispatch(getDoctorList());
    dispatch(getDepartmentList());
  }, []);

  console.log(doctors?.data?.data);

  const data = doctors?.data?.data?.map((values) => {
    return values.first_name;
  });

  const toggleSearchOptions = () => {
    setMoreOptions((value) => !value);
  };

  const toggleSeeAllDoctors = () => {
    setAllDoctors(true);
    setMoreOptions(false);
    setAllSpecialities(false);
  };

  const toggleSeeSpecialities = () => {
    setAllDoctors(false);
    setMoreOptions(false);
    setAllSpecialities(true);
  };

  React.useEffect(() => {
    var lastScrollTop = 0;
    window.addEventListener(
      'scroll',
      () => {
        var st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
          setHideSearchBox(true);
        } else if (st < lastScrollTop) {
          setHideSearchBox(true);
        }
        lastScrollTop - st <= 0 ? 0 : st;
      },
      true
    );
  }, []);

  console.log({ dataFiltered });
  return (
    <Box>
      {' '}
      <HomeNavBar />
      <Box
        className={`${
          !hideSearchBox
            ? 'hidden transition-all duration-300 ease-linear'
            : 'flex'
        } h-min  w-fit flex flex-col items-start justify-start mx-auto gap-7`}
      >
        <Typography variant="h6">Find a Doctor</Typography>

        <Box className="w-[80vw] mx-auto max-w-[800px] border border-sky-500 rounded-2xl min-h-[100px] p-5">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Box className="flex flex-row items-center">
            <Button
              color="black"
              sx={{ mt: '16px' }}
              onClick={toggleSearchOptions}
            >
              <Box
                sx={{
                  padding: 0,
                  border: '2px solid #797979',
                  borderRadius: '50%',
                  marginRight: '8px'
                }}
              >
                <AiIcons.AiOutlinePlus className="text-[16px] font-bold " />
              </Box>
              <Typography>More search options </Typography>
            </Button>
            {allDoctors && !moreOPtions ? (
              <Button disableRipple sx={{ mt: '16px', color: '#797979' }}>
                <Typography>- List all doctors</Typography>
              </Button>
            ) : allSpecialities && !moreOPtions ? (
              <Button disableRipple sx={{ mt: '16px', color: '#797979' }}>
                <Typography>- Search by speciality</Typography>
              </Button>
            ) : (
              ''
            )}
          </Box>
          {moreOPtions && (
            <Box className="flex flex-row items-center gap-4">
              <Button
                color="black"
                sx={{ mt: '16px' }}
                onClick={() => {
                  toggleSearchOptions();
                  toggleSeeAllDoctors();
                }}
              >
                <Box
                  sx={{
                    marginRight: '8px'
                  }}
                >
                  <IoIcons.IoMedkitOutline className="text-[18px] font-bold " />
                </Box>
                <Typography>List all doctors</Typography>
              </Button>
              <Button
                color="black"
                sx={{ mt: '16px' }}
                onClick={() => {
                  toggleSearchOptions();
                  toggleSeeSpecialities();
                }}
              >
                <Box
                  sx={{
                    marginRight: '8px'
                  }}
                >
                  <CiIcons.CiStethoscope className="text-[20px] font-bold " />
                </Box>
                <Typography>search by speciality</Typography>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {allDoctors && !moreOPtions && (
        <List
          className="max-w-[640px] w-[90%] px-10 mx-auto h-[90vh] my-10 overflow-auto"
          sx={{ marginX: 'auto', marginTop: 5 }}
        >
          {doctors?.data?.data?.map((data, idx) => {
            const dpt = data.departments
              ? data.departments[0]?.department_name
              : 'Crap';
            console.log(data.department, '****&*&*&*&*');
            return (
              <ListItem
                key={data.doctor_id}
                className={`border border-x-zinc-400 rounded-md my-4`}
              >
                <img
                  src={data.picture}
                  alt=""
                  className="w-[40px] h-[40px] mr-4 rounded-[50%]"
                />
                <ListItemText
                  primary={`${data.first_name} ${data.last_name}, M.D - ${data.speciality}`}
                  secondary={`Total experience (years): ${data.experience_years},  Cost per appointment: ${data.cost_per_appointment}$`}
                  className="line-clamp-3"
                />
              </ListItem>
            );
          })}
        </List>
      )}
      {allSpecialities && !moreOPtions && (
        <Box
          className="max-w-[1024px] w-[90%]  mx-auto  my-10"
          sx={{
            marginX: 'auto',
            marginTop: 5,
            display: 'grid',
            gridTemplateColumns: {
              md: 'repeat(5, 1fr)',
              sm: 'repeat(3, 1fr)',
              xs: 'repeat(2, 1fr)'
            }
          }}
        >
          {departments?.data?.data?.map((data, idx) => {
            return (
              <Box
                key={data.department_id}
                className={`flex flex-col items-center px-5`}
                onClick={() => {
                  setSpecialityId(data.department_id);
                }}
              >
                <Box
                  sx={{ aspectRatio: '1/1' }}
                  className={`w-full ${
                    specialityId === data.department_id
                      ? 'bg-[#0f5f6d]'
                      : 'bg-[#d8d8d8]'
                  }  rounded-xl`}
                ></Box>
                <Typography>{data.department_name}</Typography>
              </Box>
            );
          })}
        </Box>
      )}
      {specialityId && allSpecialities && !moreOPtions && (
        <Box className="w-[90%] max-w-[1024px] flex justify-end">
          <Button
            disabled={!specialityId}
            onClick={() => {
              nav(`/speciality/${specialityId}`);
            }}
            sx={
              specialityId
                ? { backgroundColor: '#1A4CFF', color: '#fff' }
                : { backgroundColor: '#D1D1D1', color: '#000' }
            }
          >
            Next
          </Button>
        </Box>
      )}
      <div style={{ padding: 3 }}>
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
      </div>
    </Box>
  );
};

export default FindDoctor;
