import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React from 'react';

export default function FileUploadOptions() {
  const [value, setValue] = React.useState('KB');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl sx={{ mt: 2, maxWidth: 170, minWidth: 150 }}>
        <TextField id="size" label="File Size" variant="outlined"></TextField>
      </FormControl>

      <FormControl sx={{ mt: 2, maxWidth: 170, minWidth: 80 }}>
        <InputLabel id="select-label">File Size</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          onChange={handleChange}
          autoWidth
          label="FileSize"
        >
          <MenuItem value="KB">KB</MenuItem>
          <MenuItem value="MB">MB</MenuItem>
          <MenuItem value="GB">GB</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
