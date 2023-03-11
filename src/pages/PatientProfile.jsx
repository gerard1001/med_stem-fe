import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import { useSelector } from 'react-redux';
import PersonaInfo from '../components/PatientProfileSteps/PersonalInfo';
import ContactInfo from '../components/PatientProfileSteps/AccountInfo';
import MedicalHistory from '../components/PatientProfileSteps/MedicalHistory';

const PatientProfile = () => {
  const step = useSelector((state) => state.step.profile_step);

  return (
    <div>
      {/* <HomeNavBar /> */}
      {step === 0 && <PersonaInfo />}
      {step === 1 && <ContactInfo />}
      {step === 2 && <MedicalHistory />}
    </div>
  );
};

export default PatientProfile;
