import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import formValidation from '../../utils/formValidation';
import Success from './Success';
import PersonalInfo from './PersonalInfo';
import MedicalHistory from './MedicalHistory';
import Password from './Password';
import ContactInfo from './ContactInfo';
import MedicalInfo from './MedicalInfo';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Step titles
const labels = [
  'First Step',
  'Second Step',
  'Third Step',
  'Fourth Step',
  'Password'
];

const defaultValues = {
  activeStep: 2,
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

// const fieldsValidation = {
//   first_name: {
//     error: '',
//     validate: 'text',
//     minLength: 2,
//     maxLength: 20
//   },
//   last_name: {
//     error: '',
//     validate: 'text',
//     minLength: 2,
//     maxLength: 20
//   },
//   id_number: {
//     error: '',
//     validate: 'number',
//     minLength: 10,
//     maxLength: 20
//   },
//   email: {
//     error: '',
//     validate: 'email'
//   },
//   password: {
//     error: '',
//     minLength: 4,
//     maxLength: 16,
//     validate: 'password'
//   },
//   gender: {},
//   marital_status: {},
//   birth_date: {},
//   country: {
//     error: '',
//     validate: 'text',
//     maxLength: 20
//   },
//   address_1: {
//     error: '',
//     validate: 'text',
//     maxLength: 20
//   },
//   city: {
//     error: '',
//     validate: 'text',
//     minLength: 3,
//     maxLength: 20
//   },
//   phone: {
//     error: '',
//     validate: 'phone',
//     minLength: 5,
//     maxLength: 15
//   },
//   message: {}
// };

const StepForm = ({ chooseStatus }) => {
  // const [message, setMessage] = React.useState('');
  // const chooseMessage = (message) => {
  //   setMessage(message);
  // };
  // const [activeStep, setActiveStep] = useState(0);
  // const [formValues, setFormValues] = useState({});
  // const [formErrors, setFormErrors] = useState({});

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

  console.log({ form });

  useEffect(() => {
    if (activeStep === 2) {
      chooseStatus(true);
    } else {
      chooseStatus(false);
    }
  }, []);

  // Proceed to next step
  // const handleNext = () => setActiveStep((prev) => prev + 1);
  // // Go back to prev step
  // const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // Set values
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));

  //   // set errors
  //   const error = formValidation(name, value, fieldsValidation) || '';

  //   setFormErrors({
  //     [name]: error
  //   });
  // };

  // const Steps = React.memo(({ step }) => {
  //   if (step === 0) {
  //     chooseStatus(false);
  //     return (
  //       <PersonalInfo
  //       handleNext={handleNext}
  //       handleChange={handleChange}
  //       values={formValues}
  //       formErrors={formErrors}
  //       />
  //     );
  //   }

  // switch (step) {
  //   case 0:
  //     chooseStatus(false);
  //     return (
  //       <PersonalInfo
  // handleNext={handleNext}
  // handleChange={handleChange}
  //         values={formValues}
  //         formErrors={formErrors}
  //       />
  //     );
  //   case 1:
  //     chooseStatus(false);
  //     return (
  //       <ContactInfo
  //         handleNext={handleNext}
  //         handleBack={handleBack}
  // handleChange={handleChange}
  //         values={formValues}
  //         formErrors={formErrors}
  //       />
  //     );
  //   case 2:
  //     chooseStatus(true);
  //     return (
  //       <MedicalInfo
  //         handleNext={handleNext}
  //         handleBack={handleBack}
  // handleChange={handleChange}
  //         chooseMessage={chooseMessage}
  //         values={formValues}
  //       />
  //     );
  //   case 3:
  //     chooseStatus(false);
  //     return (
  //       <MedicalHistory
  //         handleNext={handleNext}
  //         handleBack={handleBack}
  // handleChange={handleChange}
  //         values={formValues}
  //       />
  //     );
  //   case 4:
  //     chooseStatus(false);
  //     return (
  //       <Password
  //         handleNext={handleNext}
  //         handleBack={handleBack}
  // handleChange={handleChange}
  //         values={formValues}
  //         formErrors={formErrors}
  //       />
  //     );
  //   case 5:
  //     chooseStatus(false);
  //     return (
  //       <Confirm
  //         handleNext={handleNext}
  //         handleBack={handleBack}
  //         values={formValues}
  //       />
  //     );
  //   default:
  //     break;
  // }
  // });

  return (
    <FormProvider {...methods}>
      {activeStep === labels.length ? (
        // Last Component
        <Success
        // values={formValues}
        />
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
              <span className="text-primary font-bold cursor-pointer">
                Log in
              </span>
            </Typography>
          </Box>
          {/* <Steps step={activeStep} /> */}
          {activeStep === 0 && (
            <PersonalInfo
            // handleNext={handleNext}
            // handleChange={handleChange}
            // values={formValues}
            // formErrors={formErrors}
            />
          )}
          {activeStep === 1 && (
            <ContactInfo
            // handleNext={handleNext}
            // handleBack={handleBack}
            // handleChange={handleChange}
            // values={formValues}
            // formErrors={formErrors}
            />
          )}
          {activeStep === 2 && (
            <MedicalInfo
            // handleNext={handleNext}
            // handleBack={handleBack}
            // handleChange={handleChange}
            // chooseMessage={chooseMessage}
            // values={formValues}
            />
          )}
          {activeStep === 3 && (
            <MedicalHistory
            // handleNext={handleNext}
            // handleBack={handleBack}
            // handleChange={handleChange}
            // values={formValues}
            />
          )}
          {activeStep === 4 && (
            <Password
            // handleNext={handleNext}
            // handleBack={handleBack}
            // handleChange={handleChange}
            // values={formValues}
            // formErrors={formErrors}
            />
          )}
          {activeStep === 5 && (
            <Confirm
            // handleNext={handleNext}
            // handleBack={handleBack}
            // values={formValues}
            />
          )}
        </Box>
      )}
    </FormProvider>
  );
};

export default StepForm;
