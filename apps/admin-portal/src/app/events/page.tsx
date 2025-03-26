import EventCreateForm from '@/components/EventCreateForm';
import { Box, Typography } from '@mui/material'; 

export default function EventCreationPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2.5,
      }}
    >

      <Typography variant="h3"  
      sx={{ mb: 3 }}>
        Event Creation
      </Typography>
      
      <EventCreateForm />
    </Box>
  );
}
