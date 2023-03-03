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
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/reducers/user.reducer';

const Login = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();

  const handleBack = () => {
    history.back();
  };
  return (
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
            onSubmit={() => {
              dispatch(setLoggedIn());
              nav('/patient');
            }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
            >
              Enter
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
