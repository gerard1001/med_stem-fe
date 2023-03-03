import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Confirm from './Confirm';
import Success from './Success';
import PersonalInfo from './PersonalInfo';
import MedicalHistory from './MedicalHistory';
import Password from './Password';
import ContactInfo from './ContactInfo';
import MedicalInfo from './MedicalInfo';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

const labels = [
  'First Step',
  'Second Step',
  'Third Step',
  'Fourth Step',
  'Password',
  'Confirm'
];

const defaultValues = {
  activeStep: 0,
  first_name: '',
  last_name: '',
  id_number: '',
  email: '',
  gender: '',
  marital_status: '',
  birth_date: '',
  country: '',
  address_1: '',
  city: '',
  phone: '',
  password: '',
  info: {}
};

const schema = yup
  .object({
    first_name: yup.string().min(4).max(16).required(),
    last_name: yup.string().min(4).max(16).required(),
    id_number: yup.string().min(8).max(16).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*[\s]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, no space, and be at least 8 characters long.'
      )
      .required(),
    confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passords must match')
      .required(),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Gender must be male or female')
      .required(),
    marital_status: yup
      .string()
      .oneOf(
        ['single', 'married'],
        'Marital status can be only single or married'
      )
      .required(),
    birth_date: yup.date().required(),
    country: yup.string().required(),
    address_1: yup.string().required(),
    city: yup.string().required(),
    phone: yup.string().min(4).max(12).required()
  })
  .required();

const StepForm = ({ getStatus }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { watch, control } = methods;
  const form = watch();

  const activeStep = useWatch({
    name: 'activeStep',
    control
  });

  React.useEffect(() => {
    getStatus(activeStep);
  }, [activeStep]);

  const nav = useNavigate();

  return (
    <FormProvider {...methods}>
      {activeStep === labels.length ? (
        <Success />
      ) : (
        <Box>
          {' '}
          <Box style={{ margin: '30px 0 10px' }}>
            <Typography variant="h4" align="center" className="font-bold">
              Welcome to Medstem
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              style={{ margin: '10px 0' }}
            >
              Already have an account?{' '}
              <span
                className="text-primary font-bold cursor-pointer"
                onClick={() => {
                  nav('/login');
                }}
              >
                Log in
              </span>
            </Typography>
          </Box>
          {activeStep === 0 && <PersonalInfo />}
          {activeStep === 1 && <ContactInfo />}
          {activeStep === 2 && <MedicalInfo />}
          {activeStep === 3 && <MedicalHistory />}
          {activeStep === 4 && <Password />}
          {activeStep === 5 && <Confirm data={form} />}
        </Box>
      )}
    </FormProvider>
  );
};

export default StepForm;
