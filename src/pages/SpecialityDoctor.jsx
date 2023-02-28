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

const SpecialityDoctor = () => {
  const doctors = useSelector((state) => state.doctor);
  const departments = useSelector((state) => state.department);

  const dispatch = useDispatch();

  const nav = useNavigate();

  React.useEffect(() => {
    dispatch(getDoctorList());
    dispatch(getDepartmentList());
  }, []);

  return (
    <Box>
      {' '}
      <HomeNavBar />
    </Box>
  );
};

export default SpecialityDoctor;
