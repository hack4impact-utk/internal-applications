import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import NavigationDrawerItem from './NavigationDrawerItem';

export default function NavigationDrawer () {
   const drawerWidth = 280;

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
               ps: 2,
               justifyContent: 'center'
            }}
         >
         </Box>
      </Box>
     </Drawer>
   );
}