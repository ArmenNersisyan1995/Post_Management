import { useMemo } from 'react';
import {
  Avatar, Box, Button, CircularProgress, Container, Grid, TextField, Theme,
} from '@mui/material';
import { Formik } from 'formik';
import { useAppSelector } from 'hooks';
import { ProfileData, User } from 'resources/types';
import { RootState } from 'store';
import { profileSchema } from 'resources/scheme';

function Profile() {
  const profile: User = useAppSelector((state: RootState) => state.user).profile as User;
  const { name, surname } = profile;

  const initialValues: ProfileData = useMemo(() => (
    { name: profile.email, surname: profile.surname, email: profile.email }
  ), [profile]);

  return (
    <Container component="main" maxWidth="xs">
      {profile && (
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.light',
            width: 76,
            height: 76,
          }}
          aria-label="recipe"
        >
          {name.charAt(0).concat(surname.charAt(0))}
        </Avatar>
        <Formik
          // TODO
          onSubmit={() => {}}
          initialValues={initialValues}
          validationSchema={profileSchema}
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                >
                  Submit
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
      )}
    </Container>
  );
}

export default Profile;
