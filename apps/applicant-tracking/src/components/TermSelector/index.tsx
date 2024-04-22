import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function TermSelector() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h6">Spring 2024</Typography>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
