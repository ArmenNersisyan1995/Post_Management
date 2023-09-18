import Grid from '@mui/material/Grid';
import Loading from 'components/shared/Loading';
import Layout from 'components/main/Layout';
import useCheckProfile from 'hooks/checkProfile';
import signInCover from 'assets/auth_cover.jpg';
import SignInForm from './SignInForm';

function SignIn() {
  const { profileStorage } = useCheckProfile();

  return (
    <Grid>
      {profileStorage ? (
        <Loading />
      ) : (
        <Layout
          form={<SignInForm />}
          coverImage={signInCover}
          content={(
            <Grid container direction="column" justifyContent="center" pt={18} />
          )}
        />
      )}
    </Grid>
  );
}

export default SignIn;
