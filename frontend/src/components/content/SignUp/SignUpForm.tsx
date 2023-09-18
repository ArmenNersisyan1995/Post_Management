import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import {
  CircularProgress, CssBaseline, TextField, Theme,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import PasswordInput from 'components/shared/PasswordInput';
import { routsPatterns } from 'resources/constants';
import { signUp } from 'store/user';
import { SignUpData } from 'resources/types';
import { useAppDispatch } from 'hooks';
import { signUpSchema } from 'resources/scheme';

const initialValues: SignUpData = {
  name: '', surname: '', email: '', password: '',
};

function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUpCallback = useCallback(
    (values: SignUpData, helpers: FormikHelpers<SignUpData>) => {
      dispatch(signUp(values)).unwrap().then(() => {
        helpers.setSubmitting(false);
        navigate(routsPatterns.DASHBOARD);
      }).catch(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
      });
    },
    [],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.dark' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={signUpCallback}
          validationSchema={signUpSchema}
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
                  name="name"
                  label="Name"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                />
                <TextField
                  required
                  color="info"
                  sx={{ marginTop: 3 }}
                  fullWidth
                  name="surname"
                  label="Surname"
                  onBlur={handleBlur}
                  value={values.surname}
                  onChange={handleChange}
                  helperText={touched.surname && errors.surname}
                  error={touched.surname && Boolean(errors.surname)}
                />
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
                  Sign Up
                </Button>
                <Grid item container xs={12}>
                  <Typography variant="subtitle2" sx={{ display: 'flex' }}>
                    Return to
                    <Link to={routsPatterns.SIGN_IN} style={{ textDecoration: 'none' }}>
                      <Typography
                        sx={(theme: Theme) => ({ color: theme.palette.info.main, marginLeft: 0.4 })}
                        variant="subtitle2"
                      >
                        Sign in
                      </Typography>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>

      </Box>
    </Container>
  );
}

export default SignUpForm;
