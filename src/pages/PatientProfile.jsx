import React from 'react';
import { useSelector } from 'react-redux';
import HomeNavBar from '../components/HomeNavBar';
import PersonaInfo from '../components/PatientProfileSteps/PersonalInfo';
import ContactInfo from '../components/PatientProfileSteps/AccountInfo';
import MedicalHistory from '../components/PatientProfileSteps/MedicalHistory';

const PatientProfile = () => {
  const step = useSelector((state) => state.step);

  return (
    <div>
      <HomeNavBar />
      {step?.step === 0 && <PersonaInfo />}
      {step?.step === 1 && <ContactInfo />}
      {step?.step === 2 && <MedicalHistory />}
    </div>
  );
};

export default PatientProfile;
