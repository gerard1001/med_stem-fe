import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import formValidation from '../../utils/formValidation';
import Success from '../Success';
import FirstStep from './FirstStep';
import FourthStep from './FourthStep';
import Password from './Password';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

// Step titles
const labels = [
  'First Step',
  'Second Step',
  'Third Step',
  'Fourth Step',
  'Password'
];

const StepForm = ({ chooseStatus }) => {
  const [message, setMessage] = React.useState('');
  const chooseMessage = (message) => {
    setMessage(message);
  };

  const initialValues = {
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
    message
  };

  console.log({ initialValues });

  const fieldsValidation = {
    first_name: {
      error: '',
      validate: 'text',
      minLength: 2,
      maxLength: 20
    },
    last_name: {
      error: '',
      validate: 'text',
      minLength: 2,
      maxLength: 20
    },
    id_number: {
      error: '',
      validate: 'number',
      minLength: 10,
      maxLength: 20
    },
    email: {
      error: '',
      validate: 'email'
    },
    password: {
      error: '',
      minLength: 4,
      maxLength: 16,
      validate: 'password'
    },
    gender: {},
    marital_status: {},
    birth_date: {},
    country: {
      error: '',
      validate: 'text',
      maxLength: 20
    },
    address_1: {
      error: '',
      validate: 'text',
      maxLength: 20
    },
    city: {
      error: '',
      validate: 'text',
      minLength: 3,
      maxLength: 20
    },
    phone: {
      error: '',
      validate: 'phone',
      minLength: 5,
      maxLength: 15
    },
    message: {}
  };

  console.log({ message });

  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set values
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));

    // set errors
    const error = formValidation(name, value, fieldsValidation) || '';

    setFormErrors({
      [name]: error
    });
  };

  const HandleSteps = ({ step }) => {
    switch (step) {
      case 0:
        chooseStatus(false);
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      case 1:
        chooseStatus(false);
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      case 2:
        chooseStatus(true);
        return (
          <ThirdStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            chooseMessage={chooseMessage}
            values={formValues}
          />
        );
      case 3:
        chooseStatus(false);
        return (
          <FourthStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
          />
        );
      case 4:
        chooseStatus(false);
        return (
          <Password
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      /* Overview */
      // case 5:
      //   chooseStatus(false);
      //   return (
      //     <Confirm
      //       handleNext={handleNext}
      //       handleBack={handleBack}
      //       values={formValues}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        <Success values={formValues} />
      ) : (
        <>
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
          <HandleSteps step={activeStep} />
        </>
      )}
    </>
  );
};

export default StepForm;
