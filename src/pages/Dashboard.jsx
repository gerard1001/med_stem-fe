import React from 'react';
import DashboardSideBar from '../components/DashboardSideBar';
import { useNavigate, redirect } from 'react-router-dom';

const userInfo = JSON.parse(localStorage.getItem('userLoginData'))?.user;

const Dashboard = () => {
  console.log(userInfo, '*********');
  const nav = useNavigate();

  React.useEffect(() => {
    if (!userInfo || userInfo.role_id !== 1) {
      nav('/login');
    }
  }, []);
  {
    return (
      <div>
        <DashboardSideBar />
      </div>
    );
  }
};

export default Dashboard;
