import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

//AppBar design

export default function HeaderAppBar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ background: 'transparent' }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
