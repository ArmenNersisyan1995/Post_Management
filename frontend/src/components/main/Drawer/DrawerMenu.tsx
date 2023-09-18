import { ReactNode } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Theme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';

import { routsPatterns } from 'resources/constants';

interface MenuItems {
  text: string,
  icon: ReactNode,
  path: string,
}

const menuItems: MenuItems[] = [
  {
    text: 'Profile',
    icon: <AccountCircleIcon />,
    path: '/profile',
  },
  {
    text: 'Posts',
    icon: <DescriptionIcon />,
    path: routsPatterns.DASHBOARD,
  },
];

function DrawerMenu() {
  const navigate = useNavigate();
  const handleClickMenuItem = (path: string) => navigate(path);
  const matches = useMatches();
  const location = useLocation();

  return (
    <Paper>
      <List>
        {menuItems.map((item) => {
          const isActive = matches?.find((routMatch) => (
            routMatch?.pathname === item.path && item.path === location.pathname
          ));
          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={(theme: Theme) => ({
                backgroundColor: isActive ? theme.palette.primary.light : 'unset',
              })}
            >
              <ListItemButton onClick={() => handleClickMenuItem(item?.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

export default DrawerMenu;
