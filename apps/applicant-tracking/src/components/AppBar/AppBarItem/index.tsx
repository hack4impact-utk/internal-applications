import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

//AppBar design

export default function HeaderAppBar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      variant="outlined"
      elevation={0}
      sx={{ px: 2 }}
    >
      {/* keeps avatar in the right most corner */}
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
        <Box sx={{ flexGrow: 0 }}>
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
