import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';

export default function EventCreateForm() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          maxWidth: 600,
          width: '30%',
          mx: 'auto',
          // p: helps in padding, which makes the page look uniform
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2.5,
          backgroundColor: '#f5f5f5',
          borderRadius: 4.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Create Event
        </Typography>

        <TextField
          placeholder="Event Name"
          sx={{ p: 1, width: '100%', borderRadius: 2 }}
        />

        <DatePicker
          label="Event Date"
          sx={{ width: '100%' }}
        />

        <TimePicker
          label="Event Time"
          sx={{ width: '100%' }}
        />

        <Button variant="contained" 
        color="primary" 
        sx={{ mt: 2, width: '100%', py: 1.5 }}>
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
}