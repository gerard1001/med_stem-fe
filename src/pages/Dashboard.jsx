import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import DashboardNavBar from '../components/DashboardNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoList } from '../redux/reducers/info.reducer';
import { getDoctorList } from '../redux/reducers/doctor.reducer';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function Dashboard() {
  const info = useSelector((state) => state.info);
  const doctor = useSelector((state) => state.doctor);
  const department = useSelector((state) => state.department);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfoList());
    dispatch(getDoctorList());
    dispatch(getDepartmentList());
  }, []);
  return (
    <Box>
      <DashboardNavBar />
      {info?.loading && <h1>Loading...</h1>}
      {!info?.loading && (
        <List>
          {doctor?.data?.data?.map((data, idx) => {
            return (
              <ListItem
                key={data.doctor_id}
                // sx={idx % 2 === 0 && { backgroundColor: '#f5f5f5' }}
                className={`${idx % 2 === 0 && 'bg-[#f5f5f5]'}`}
              >
                <img
                  src={data.picture}
                  alt=""
                  className="w-[40px] h-[40px] rounded-[50%]"
                />
                <ListItemText
                  primary={`${data.first_name} ${data.last_name}`}
                  secondary={data.email}
                  className="line-clamp-3"
                />
              </ListItem>
              // <Divider />
            );
          })}
        </List>
      )}
      {/* You will have to rework here and make the sidebars and main content into sections that can be reusable
          Maybe by creating a component that is called page that accept main, rightsidebar, leftsidebar and their function to open or
          close them thenuse this component here.
       */}
      <Outlet />
    </Box>
  );
}

export default Dashboard;
