import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { ImCross } from 'react-icons/im';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  setLoggedIn,
  loginUser,
  getUsersAction
} from '../redux/reducers/user.reducer';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const userInfo = JSON.parse(localStorage.getItem('userLoginData'))?.user;

const Login = () => {
  const userData = useSelector((state) => state.user);
  const [userType, setUserType] = React.useState(null);
  const nav = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  React.useEffect(() => {
    setUserType(userData?.loginData?.data?.data?.user);
  }, [userData]);

  // const userType = userData?.loginData?.data?.data?.user;
  const status = userData?.loginData?.status;
  console.log(userData, '!!!!!!!!!!!!!!');
  console.log(userType, '!!!!!!!TYPE!!!!!!!');

  const onSubmit = ({ email, password }) => {
    dispatch(
      loginUser({
        email,
        password
      })
    );
    // userInfo ? nav('/patient') : doctorInfo ? nav('/doctor') : nav('/');

    console.log(userData, '!!!!!!!!!!!!!!');
    console.log(userType, '@@@@');

    console.log(userType, '####');

    // status === 201
    //   ? reset({
    //       email: '',
    //       password: ''
    //     })
    //   : null;
  };

  if (userType?.role_id === 3) {
    nav('/patient');
  }
  if (userType?.role_id === 2) {
    nav('/doctor');
  }
  if (userType?.role_id === 1) {
    nav('/dashboard');
  }
  const handleBack = () => {
    history.back();
  };
  return (
    <>
      <Box className="absolute w-fit max-w-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            border: '1px solid #797979',
            borderRadius: '10px',
            py: 8,
            position: 'relative'
          }}
        >
          <CssBaseline />
          <div
            className="absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1"
            onClick={handleBack}
          >
            <ImCross />
          </div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h6" fontWeight="700">
              Enter MedStem
            </Typography>
            <Typography variant="subtitle1">
              You don't have an account?{' '}
              <span
                className="text-primary font-bold cursor-pointer"
                onClick={() => {
                  nav('/signup');
                }}
              >
                Register
              </span>
            </Typography>
            <Box
              component="form"
              sx={{ mt: 1 }}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              // onSubmit={() => {
              //   dispatch(setLoggedIn());
              //   nav('/patient');
              // }}
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className={`bg-[#1A4CFF] capitalize text-white`}
              >
                Enter
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
