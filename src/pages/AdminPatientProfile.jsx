import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import PreviousAppointments from '../components/AdminPatientProfile/PreviousAppointments';
import ExpectedAppointments from '../components/AdminPatientProfile/ExpectedAppointments';
import PatientInfo from '../components/AdminPatientProfile/PersonalInfo';
import { getOnePatient } from '../redux/reducers/patient.reducer';
import AdminMedicalHistory from '../components/AdminPatientProfile/AdminMedicalHistory';
import DoctorMedicalHistory from '../components/AdminPatientProfile/DoctorMedicalHistory';

const AdminPatientProfile = () => {
  const step = useSelector((state) => state.step.admin_patient_step);
  const patient = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  const isDoctor =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'doctor';

  const isAdmin =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'admin';

  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let patientId;

  urlId.includes('?')
    ? (patientId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (patientId = urlId);

  const patientData = patient?.single_data?.data;

  React.useEffect(() => {
    dispatch(getOnePatient(patientId));
  }, []);

  return (
    <div>
      {/* {patient?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
          <Loader />
        </Box>
      )} */}
      {step === 0 && !patient?.loading && <PatientInfo />}
      {step === 1 && !patient?.loading && <ExpectedAppointments />}
      {step === 2 && !patient?.loading && <PreviousAppointments />}
      {step === 3 && !patient?.loading && isDoctor && <DoctorMedicalHistory />}
      {step === 4 && !patient?.loading && isAdmin && <AdminMedicalHistory />}
    </div>
  );
};

export default AdminPatientProfile;
