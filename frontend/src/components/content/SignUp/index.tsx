import Grid from '@mui/material/Grid';
import Layout from 'components/main/Layout';
import Loading from 'components/shared/Loading';
import useCheckProfile from 'hooks/checkProfile';
import signUpCover from 'assets/auth_cover.jpg';
import SignUpForm from './SignUpForm';

function SignUp() {
  const { profileStorage } = useCheckProfile();

  return (
    <Grid>
      {profileStorage ? (
        <Loading />
      ) : (
        <Layout
          form={<SignUpForm />}
          coverImage={signUpCover}
          content={(
            <Grid container direction="column" justifyContent="center" pt={18} />
          )}
        />
      )}
    </Grid>
  );
}

export default SignUp;
