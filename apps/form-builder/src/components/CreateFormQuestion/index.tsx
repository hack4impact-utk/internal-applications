import { Box, FormControlLabel, Switch, TextField } from '@mui/material';

export default function CreateFormQuestion() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField label="Title" />
      <TextField label="Description" />
      <FormControlLabel control={<Switch />} label="Required?" />
    </Box>
  );
}
