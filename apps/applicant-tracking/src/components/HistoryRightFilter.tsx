'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [date, setDate] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };

  return (
    <Box sx={{ width: '140px'}}>
      <FormControl fullWidth>
        <InputLabel id="HistoryRightFilterLabel">End Date</InputLabel>
        <Select
          labelId="HistoryRightFilterLabel"
          id="HistoryRightFilter"
          value={date}
          label="End Date"
          onChange={handleChange}
        >
          {/* For the values, the first 4 digits are the year, and
          the end digit 0=fall semester or 1=spring semester */}
          <MenuItem value={20230}>Fall 2023</MenuItem>
          <MenuItem value={20241}>Spring 2024</MenuItem>
          <MenuItem value={20240}>Fall 2024</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
