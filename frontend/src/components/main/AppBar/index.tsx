import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, IconButton, Toolbar, Tooltip, Typography,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';

import { useAppDispatch } from 'hooks';
import { routsPatterns } from 'resources/constants';
import { signOut } from 'store/user/thunk';

export const drawerWidth = 240;
export const drawerHeight = 64;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  onDrawerOpen?: MouseEventHandler<HTMLButtonElement> | undefined,
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    height: `${drawerHeight}px`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppBar(props: AppBarProps) {
  const { open, onDrawerOpen } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleExitApp = () => {
    dispatch(signOut()).unwrap().then(() => {
      localStorage.clear();
      navigate(routsPatterns.SIGN_IN);
    });
  };

  return (

    <AppBarStyled position="fixed" open={open}>
      <Toolbar>
        <Grid container>
          <Grid item xs={6} display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" width="max-content">
              Post Management
            </Typography>

          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <Tooltip title="LogOut">
              <IconButton
                color="inherit"
                aria-label="exit app"
                onClick={handleExitApp}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBarStyled>
  );
}

export default AppBar;

AppBar.defaultProps = {
  open: false,
  onDrawerOpen: false,
};
