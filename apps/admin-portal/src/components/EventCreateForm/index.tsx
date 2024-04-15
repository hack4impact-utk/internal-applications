'use client';
import React from 'react';
import { Input } from '@mui/base/Input';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; // for clock functionality
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';

export default function EventCreateForm() {
  return (
    //LocalizationProvider wraps everything so it doesn't have to be retyped multiple times
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box>
        <div style={{ display: 'flex', margin: '16px' }}>
          <Input />
        </div>
        <div style={{ display: 'flex', margin: '16px' }}>
          <DatePicker label="Event Date" />
          <TimePicker label="Event Time" />
        </div>
        <button type="button" style={{ margin: '16px', marginTop: '0px' }}>
          Submit
        </button>
      </Box>
    </LocalizationProvider>
  );
}
