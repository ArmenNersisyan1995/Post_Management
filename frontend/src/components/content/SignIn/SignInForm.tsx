import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Theme,
  Typography,
} from '@mui/material';

import { SignInData, User } from 'resources/types';
import { useAppDispatch } from 'hooks';
import { signIn } from 'store/user';
import { routsPatterns } from 'resources/constants';
import { signInSchema } from 'resources/scheme';
import PasswordInput from 'components/shared/PasswordInput';

const initialValues: SignInData = { email: '', password: '' };

function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInCallback = useCallback(
    (values: SignInData, helpers: FormikHelpers<SignInData>) => {
      dispatch(signIn(values)).unwrap().then((profile: User) => {
        helpers.setSubmitting(false);
        localStorage.setItem('profile', JSON.stringify(profile));
        return navigate(routsPatterns.DASHBOARD);
      }).catch(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
        return navigate(routsPatterns.SIGN_IN);
      });
    },
    [],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.dark' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Formik
          onSubmit={signInCallback}
          initialValues={initialValues}
          validationSchema={signInSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container>
                <TextField
                  required
                  color="info"
                  sx={{ marginTop: 3 }}
                  fullWidth
                  name="email"
                  label="Email"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
                <PasswordInput
                  required
                  color="info"
                  sx={{ marginTop: 3 }}
                  fullWidth
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                />
                <Grid item container xs={12} justifyContent="end" mt={1}>
                  <Link to={routsPatterns.SIGN_UP} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={(theme: Theme) => ({ color: theme.palette.info.main, marginLeft: 0.4 })}
                      variant="subtitle2"
                    >
                      Don`t have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={isSubmitting && (
                    <CircularProgress
                      size={18}
                      sx={(theme: Theme) => ({ color: theme.palette.info.contrastText })}
                    />
                  )}
                >
                  Sign In
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default SignInForm;
