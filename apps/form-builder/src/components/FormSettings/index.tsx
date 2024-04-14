'use client';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormSettings() {
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {/* Select component */}
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="select-label">None</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          onChange={handleChange}
          autoWidth
          label="Value"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Member">Member</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Anyone">Anyone</MenuItem>
        </Select>
      </FormControl>
      {/* Switch component */}
      <FormGroup>
        <FormControlLabel
          control={<Switch />}
          label="Make submissions anonymous?"
        />
      </FormGroup>
      {/* Textfield component */}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Callback URL" variant="outlined" />
      </Box>
    </div>
  );
}
