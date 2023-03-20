import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../axios/axios.instance';
import AdminDoctorAccountPage from '../components/AdminDoctorAccountPage';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const loginData = useSelector((state) => state.user?.loginData);
  const user = useSelector((state) => state.doctor?.single_data?.data);
  const info = {
    family_name: user?.first_name,
    given_name: user?.last_name,
    gender: user?.gender,
    birth_date: user?.birth_date,
    email: user?.email
  };

  const handleUploadImage = async (file, callBack) => {
    try {
      setLoadingUpload(true);
      const formData = new FormData();
      formData.append('picture', file);
      await axiosInstance
        .patch(`/users/doctor/${user?.doctor_id}`, formData)
        .then(() => {
          dispatch(getOneDoctor(user?.doctor_id));
        })
        .finally(() => {
          callBack();
          setLoadingUpload(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleEdit = async (data, setLoading, onClose) => {
    data.first_name = data.family_name;
    data.last_name = data.given_name;
    delete data.family_name;
    delete data.given_name;

    if (user?.email === data.email) {
      delete data.email;
    }

    try {
      setLoading(true);
      await axiosInstance
        .patch(`/users/doctor/${user?.doctor_id}`, data)
        .then(() => {
          dispatch(getOneDoctor(user?.doctor_id)).then(() => {
            onClose();
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const changePassword = async (data, callBack) => {
    try {
      const newData = data;
      delete newData.repeat_new_password;
      setLoadingReset(true);
      await axiosInstance
        .patch(`/users/doctor/reset/${user?.doctor_id}`, newData)
        .then((response) => {
          toast.success(response.data.message);
        })
        .finally(async () => {
          await callBack();
          setLoadingReset(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    loginData?.doctor_id && dispatch(getOneDoctor(loginData?.doctor_id));
  }, [loginData]);

  return (
    <AdminDoctorAccountPage
      info={info}
      image={user?.picture}
      handleEdit={handleEdit}
      uploadImage={handleUploadImage}
      loadingUpload={loadingUpload}
      changePassword={changePassword}
      loadingReset={loadingReset}
    />
  );
};

export default DoctorProfile;
