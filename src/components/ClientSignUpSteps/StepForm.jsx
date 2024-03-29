import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { subYears } from 'date-fns';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import ContactInfo from './ContactInfo';
import MedicalHistory from './MedicalHistory';
import MedicalInfo from './MedicalInfo';
import Password from './Password';
import PersonalInfo from './PersonalInfo';

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
  address_2: '',
  city: '',
  phone_number: '',
  password: '',
  info: {}
};

const schema = yup
  .object({
    first_name: yup.string().min(4).max(16).required(),
    last_name: yup.string().min(4).max(16).required(),
    id_number: yup.number('Id number must be a number').required(),
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
    birth_date: yup
      .date()
      .typeError('Invalid date')
      .min(subYears(new Date(), 100))
      .max(new Date())
      .required(),
    country: yup.string().required(),
    address_1: yup.string().required(),
    address_2: yup.string().required(),
    city: yup.string().required(),
    phone_number: yup.string().min(4).max(12).required()
  })
  .required();

const StepForm = ({ getStatus }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { control } = methods;

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
      <Box className="h-full w-full">
        <Box style={{ padding: '10px' }}>
          <Typography variant="h4" align="center" className="font-bold">
            Welcome to Medstem
          </Typography>
          <Typography variant="subtitle2" align="center" style={{}}>
            Already have an account?{' '}
            <Box
              component="span"
              className="text-primary font-bold cursor-pointer"
              onClick={() => {
                nav('/login');
              }}
            >
              Log in
            </Box>
          </Typography>
        </Box>
        {activeStep === 0 && <PersonalInfo />}
        {activeStep === 1 && <ContactInfo />}
        {activeStep === 2 && <MedicalInfo />}
        {activeStep === 3 && <MedicalHistory />}
        {activeStep === 4 && <Password />}
        {/* {activeStep === 5 && <Confirm data={form} />} */}
      </Box>
    </FormProvider>
  );
};

export default StepForm;
