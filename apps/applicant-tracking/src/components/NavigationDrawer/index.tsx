'use client';
import React from 'react';
// MUI //
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import NavigationDrawerItem from './NavigationDrawerItem';
import { LOGO_URL, routes } from '@/utils/constants';



export default function NavigationDrawer() {
  // Params for the Drawer
  const drawerWidth = 280;

  // Drawer setup
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
            px: 2,
            justifyContent: 'center',
          }}
        >
          <img
            src={LOGO_URL}
            alt="Hack4Impact UTK logo"
            style={{
              objectFit: 'contain',
              width: '100%',
            }}
          />
        </Box>
        <br />
        {routes.map((route) => {
          return (
            <NavigationDrawerItem
              key={route.text}
              text={route.text}
              route={route.route}
              icon={route.icon}
            />
          );
        })}
      </Box>
    </Drawer>
  );
}

