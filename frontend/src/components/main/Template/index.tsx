import { Outlet } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { useAppSelector, useProfile } from 'hooks';
import AppBar, { drawerHeight, drawerWidth } from 'components/main/AppBar';
import Drawer from 'components/main/Drawer';
import Loading from 'components/shared/Loading';
import { RootState } from 'store';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  overflow: 'hidden',
  flexGrow: 1,
  maxHeight: '100vh',
  marginLeft: 0,
  height: `calc(100% - ${drawerHeight}px)`,
  minHeight: `calc(100% - ${drawerHeight}px)`,
  marginTop: drawerHeight,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppTemplate(props: { children?: ReactNode }) {
  useProfile();
  const userState = useAppSelector((state: RootState) => state.user);
  const { children } = props;
  const { loading, profile } = userState;
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {loading || !profile ? (<Loading />) : (
        <>
          <CssBaseline />
          <AppBar
            open={open}
            onDrawerOpen={handleDrawerOpen}
          />
          <Drawer onDrawerClose={handleDrawerClose} open={open} />
          <Main open={open}>
            {children || <Outlet />}
          </Main>
        </>
      )}
    </Box>
  );
}

export default AppTemplate;

AppTemplate.defaultProps = {
  children: null,
};
