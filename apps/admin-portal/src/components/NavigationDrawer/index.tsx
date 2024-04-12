'use client';

import React from 'react';
// MUI
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import NavigationDrawerItem from './NavigationDrawerItem';
import { useMediaQuery, useTheme } from '@mui/material';

export default function NavigationDrawer() {
  const drawerWidth = 280;
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

  // Setting up Drawer
  return (
    <Drawer
      variant={isNotMobile ? 'permanent' : 'temporary'}
      open={isNotMobile}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
      }}
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
