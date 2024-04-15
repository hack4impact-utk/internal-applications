'use client';
import React from 'react';
// MUI
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavigationDrawerItem from './NavigationDrawerItem';

export default function NavigationDrawer() {

  const drawerWidth = 280;
  const isDesktop = useMediaQuery('(min-width:768px)');

  // Make sure nav drawer only shows on Desktop
  if (!isDesktop) {
    return null;
  }

  // Setting up Drawer
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
      }}
      open={true}
    >
      <Box sx={{ width: drawerWidth }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: 2,
            pt: 2,
            justifyContent: 'center',
          }}
        >
          {/* What is being displayed, link to pages */}
          <NavigationDrawerItem text="Dashboard" route="/dashboard" />
          <NavigationDrawerItem text="Events" route="/events" />
          <NavigationDrawerItem text="Members" route="/members" />
          <NavigationDrawerItem text="Projects" route="/projects" />
        </Box>
      </Box>
    </Drawer>
  );
}
