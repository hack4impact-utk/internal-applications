'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface FilterProps {
  id: string;
}

export function HistoryFilter(props: FilterProps) {
  const [date, setDate] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };

  return (
    <Box sx={{ width: '140px'}}>
      <FormControl fullWidth>
        <InputLabel id={props.id + "Label"}>End Date</InputLabel>
        <Select
          labelId={props.id + "Label"}
          id={props.id}
          value={date}
          label="End Date"
          onChange={handleChange}
        >
          {/* For the values, the first 4 digits are the year, and
          the end digit 0=fall semester or 1=spring semester */}
          <MenuItem value={20230}>Fall 2023</MenuItem>
          <MenuItem value={20241}>Spring 2024</MenuItem>
          <MenuItem value={20240}>Fall 2024</MenuItem>
          <MenuItem value={20251}>Spring 2025</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}