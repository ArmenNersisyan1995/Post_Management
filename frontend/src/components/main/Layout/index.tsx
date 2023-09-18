import { ReactElement, ReactNode } from 'react';
import {
  Grid,
  Theme,
  Slide,
  Hidden,
} from '@mui/material';

// import LogoBlack from 'assets/icons/logo/puzl_logo_black.svg';

export interface LayoutProps {
  form: ReactNode,
  coverImage: string,
  content: ReactElement<any, any>
}

function Layout(props: LayoutProps) {
  const { form, coverImage, content } = props;
  return (
    <Grid
      container
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={(theme: Theme) => ({
        padding: 1,
        backgroundColor: theme.palette.primary.main,
      })}
    >
      <Slide direction="up" in mountOnEnter unmountOnExit timeout={700}>
        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          lg={8}
          container
          style={{ maxWidth: 1100 }}
          sx={(theme: Theme) => ({
            height: 550,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: theme.shadows[10],
            backgroundColor: theme.palette.common.white,
          })}
        >
          <Slide direction="right" in mountOnEnter unmountOnExit timeout={700}>
            <Grid item container xs={12} md={5} p={3}>
              <Grid item xs={12}>{form}</Grid>
            </Grid>
          </Slide>

          <Hidden mdDown>
            <Grid
              item
              container
              md={7}
              p={8}
              sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.5)) , url(${coverImage})`,
              }}
            >
              <Slide direction="left" in mountOnEnter unmountOnExit timeout={700}>
                {content}
              </Slide>
            </Grid>
          </Hidden>
        </Grid>
      </Slide>
    </Grid>
  );
}

export default Layout;
