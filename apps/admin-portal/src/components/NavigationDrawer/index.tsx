import React from 'react';
// MUI 
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system'
import NavigationDrawerItem from './NavigationDrawerItem';

export default function NavigationDrawer() {
   const drawerWidth = 280;

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
                  justifyContent: 'center'
               }}
            >
               {/* What is being displayed */}
               <NavigationDrawerItem text="Dashboard" route="/dashboard" />
               <NavigationDrawerItem text="Events" route="/event" />
               <NavigationDrawerItem text="Members" route="/member" />
               <NavigationDrawerItem text="Projects" route="/project" />
            </Box>
         </Box>
      </Drawer>
   );
}