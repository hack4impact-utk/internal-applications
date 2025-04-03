import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Toolbar, Typography, Badge } from '@mui/material';

// Define props interface
interface ApplicationBarProps {
  title: string; // Title text in the AppBar
  showNotification: boolean; // Whether to show the red dot
}

export default function ApplicationBar({ title, showNotification }: ApplicationBarProps) {
  return (
    <AppBar
      position="relative"
      color="primary"
      sx={{ px: 2, bgcolor: 'blue' }} // Blue color
    >
      <Toolbar disableGutters>
        {/* Title on the left */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', ml: 2 }}>
          {title}
        </Typography>

        {/* Avatar with red dot if new notification */}
        <Box sx={{ flexGrow: 0 }}>
          <Badge
            variant="dot"
            color="error"
            overlap="circular"
            invisible={!showNotification} // Hide dot if false
            sx={{
              '& .MuiBadge-badge': {
                top: 4,
                left: 4,
              },
            }}
          >
            <Avatar />
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}