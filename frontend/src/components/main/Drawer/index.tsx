import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Drawer as MuiDrawer, DrawerProps,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerMenu from './DrawerMenu';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface MuiDrawerProps extends DrawerProps {
  onDrawerClose: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function Drawer(props: MuiDrawerProps) {
  const { onDrawerClose, open } = props;
  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          '& .MuiPaper-root': {
            minWidth: 50,
            boxShadow: 'unset',
          },
        },
      }}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerMenu />
    </MuiDrawer>
  );
}

export default Drawer;
