/* eslint-disable no-nested-ternary */
import { Box, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as CiIcons from 'react-icons/ci';
import * as IoIcons from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import HomeNavBar from '../components/HomeNavBar';
import Loader from '../components/Loader/Loader';
import SearchBar from '../components/SearchBar';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import { getDoctorList } from '../redux/reducers/doctor.reducer';

export const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  return data?.filter(
    (values) =>
      values.first_name.toLowerCase().includes(query.toLowerCase()) ||
      values.last_name.toLowerCase().includes(query.toLowerCase())
  );
};

const FindDoctor = () => {
  const doctors = useSelector((state) => state.doctor);
  const departments = useSelector((state) => state.department);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [moreOPtions, setMoreOptions] = React.useState(false);
  const [allDoctors, setAllDoctors] = React.useState(false);
  const [allSpecialities, setAllSpecialities] = React.useState(false);
  const [hideSearchBox, setHideSearchBox] = React.useState(true);
  const [specialityId, setSpecialityId] = React.useState('');
  const [doctorId, setDoctorId] = React.useState('');

  const filteredData = doctors?.data?.data;

  const dataFiltered = filterData(searchQuery, filteredData);

  const dispatch = useDispatch();

  const nav = useNavigate();

  React.useEffect(() => {
    dispatch(getDoctorList());
    dispatch(getDepartmentList());
  }, []);

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

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset;

      if (scrollTop >= 40) {
        setIsScrolled(true);
      } else if (scrollTop <= 200) {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HomeNavBar>
      <Box className="w-[100%] px-16 md:px-4 max-w-[900px] mx-auto">
        <Box
          className={`${
            false
              ? 'hidden transition-all duration-300 ease-linear'
              : 'inline-block'
          } h-min w-full mx-auto flex flex-col items-start justify-start gap-7`}
        >
          <Typography variant="h6">Find a Doctor</Typography>

          <Box className=" border w-full border-sky-500 rounded-2xl min-h-[100px] p-5">
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
<<<<<<< HEAD
              {allDoctors && !moreOPtions ? (
=======
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
      </Box>{' '}
      {allDoctors && !moreOPtions && (
        <>
          {' '}
          {doctors.loading && (
            <Box className="w-[80px] h-[80px] mx-auto mt-12">
              <Loader />
            </Box>
          )}
          {!doctors.loading && (
            <>
              <Box className="flex flex-col items-end w-full p-0 mx-auto pb-10">
                <List
                  className="max-w-[900px] w-[100%] h-[80vh] pr-4 mx-auto my-10 overflow-auto"
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
                          className="w-[40px] h-[40px] mr-[4%] ml-[3%] rounded-[50%]"
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
                </List>{' '}
>>>>>>> b7a3a51 (Dashboard changes)
                <Button
                  disableRipple
                  sx={{ mt: '16px', color: '#797979', cursor: 'default' }}
                >
                  <Typography>- List all doctors</Typography>
                </Button>
              ) : allSpecialities && !moreOPtions ? (
                <Button
                  disableRipple
                  sx={{ mt: '16px', color: '#797979', cursor: 'default' }}
                >
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
        </Box>{' '}
        {allDoctors && !moreOPtions && (
          <>
            {' '}
            {doctors.loading && (
              <Box className="w-[80px] h-[80px] mx-auto mt-12">
                <Loader />
              </Box>
            )}
            {!doctors.loading && (
              <>
                <Box className="flex flex-col items-end w-full p-0 mx-auto pb-10">
                  <List
                    className="max-w-[900px] w-[100%] h-[80vh] pr-4 mx-auto my-10 overflow-auto"
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
                            className="w-[40px] h-[40px] mr-[4%] ml-[3%] rounded-[50%]"
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
                  </List>{' '}
                  <Button
                    disabled={!doctorId}
                    onClick={() => {
                      nav(`/find_doctor/doctor_page/${doctorId}`);
                    }}
                    sx={{
                      width: '120px',
                      backgroundColor: '#D1D1D1',
                      color: '#000',
                      marginTop: '40px',
                      ...(doctorId && {
                        backgroundColor: '#1A4CFF',
                        color: '#fff',
                        ':hover': {}
                      })
                    }}
                    className={`${
                      doctorId && 'bg-[#1A4CFF]'
                    } capitalize text-white`}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
        {allSpecialities && !moreOPtions && (
          <>
            {' '}
            {departments.loading && (
              <Box className="w-[80px] h-[80px] mx-auto mt-12">
                <Loader />
              </Box>
            )}
            {!departments.loading && (
              <>
                <Box className="flex flex-col items-end w-fit p-0 py-10">
                  <Box
                    className="w-full"
                    sx={{
                      display: 'grid',
                      gap: '30px',
                      gridTemplateColumns: {
                        md: 'repeat(5, minmax(0, 1fr))',
                        sm: 'repeat(3, minmax(0, 1fr))',
                        xs: 'repeat(2, minmax(0, 1fr))'
                      }
                    }}
                  >
                    {departments?.data?.data?.map((data, idx) => {
                      return (
                        <Box
                          key={data.department_id}
                          className="flex flex-col items-center px-5"
                          onClick={() => {
                            setSpecialityId(data.department_id);
                          }}
                        >
                          <Box
                            className={`w-full aspect-square ${
                              specialityId === data.department_id
                                ? 'border-[2px] border-[#0093df]'
                                : 'border-[1px] border-[#0093df]'
                            } bg-[#fefefefe] rounded-xl w-[140px] sm:w-[100px] p-3`}
                            sx={{
                              aspectRatio: '1 / 1'
                            }}
                          >
                            <img
                              src={data.picture}
                              alt=""
                              className="w-full aspect-square"
                            />
                          </Box>
                          <Typography
                            className="line-clamp-2"
                            sx={{
                              fontSize: '15px',
                              textAlign: 'center',
                              mt: 1
                            }}
                          >
                            {data.department_name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                  <Button
                    disabled={!specialityId}
                    onClick={() => {
                      nav(`/find_doctor/speciality/${specialityId}`);
                    }}
                    sx={{
                      width: '120px',
                      backgroundColor: '#D1D1D1',
                      color: '#000',
                      marginTop: '40px',
                      ...(specialityId && {
                        backgroundColor: '#1A4CFF',
                        color: '#fff',
                        ':hover': { backgroundColor: '#1A4CFA' }
                      })
                    }}
                    className={`${
                      specialityId && 'bg-[#1A4CFF]'
                    } capitalize text-white`}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
        {/* {specialityId && allSpecialities && !moreOPtions && (
        <Box className="w-[90%] max-w-[1024px] flex justify-end">
          <Button
            disabled={!specialityId}
            onClick={() => {
              nav(`/speciality/${specialityId}`);
            }}
            sx={
              specialityId
                ? {
                    backgroundColor: '#1A4CFF',
                    color: '#fff',
                    ':hover': { backgroundColor: '#1A4CFA' }
                  }
                : { backgroundColor: '#D1D1D1', color: '#000' }
            }
          >
            Next
          </Button>
        </Box>
      )} */}
      </Box>
    </HomeNavBar>
  );
};

export default FindDoctor;
