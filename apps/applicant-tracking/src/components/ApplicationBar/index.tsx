import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar, Typography, Badge } from '@mui/material';

interface ApplicationBarProps {
  title: string; // Title text in the AppBar
  showNotification: boolean; // Whether to show the red dot
}

export default function ApplicationBar({ title, showNotification }: ApplicationBarProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto' }}> {/* Match table width */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#d6efff', // Match light blue bar
          color: '#000',      
          boxShadow: 'none',
        }}
      >
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {/* Red dot  */}
          <Badge
            variant="dot"
            color="error"
            invisible={!showNotification}
            sx={{
              '& .MuiBadge-badge': {
                top: 8,
                right: 8,
                height: 10,
                minWidth: 10,
                borderRadius: '50%',
              },
            }}
          >
            <Box sx={{ width: 10, height: 10 }} /> 
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>