import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const ApplicantsPage = () => {
  return (
    <Box sx={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Applicants
      </Typography>
      <Divider sx={{ backgroundColor: 'orange', height: 4, marginBottom: 2 }} />

      {/* Filters Placeholder */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        {/* Add filters here in the future */}
      </Box>

      {/* Table Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '8px 16px',
        }}
      >
        <Typography variant="subtitle1">Name:</Typography>
        <Typography variant="subtitle1">Date:</Typography>
        <Typography variant="subtitle1">Year:</Typography>
        <Typography variant="subtitle1">Major:</Typography>
        <Typography variant="subtitle1">Status:</Typography>
      </Box>
    </Box>
  );
};

export default ApplicantsPage;
