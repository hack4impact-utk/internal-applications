'use client';

import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';

export default function UpsertForm() {
  return (
    <FormControl>
      {/* Textboxs for a Title and Description */}
      <FormLabel>Title</FormLabel>
      <TextField></TextField>
      <FormLabel>Description</FormLabel>
      <TextField></TextField>

      {/* A radio group for a responder type */}
      <RadioGroup defaultValue="Member">
        <FormControlLabel value="Member" control={<Radio />} label="Member" />
        <FormControlLabel value="Student" control={<Radio />} label="Student" />
        <FormControlLabel value="Anyone" control={<Radio />} label="Anyone" />
      </RadioGroup>

      {/* Textbox for a URL */}
      <FormLabel>URL</FormLabel>
      <TextField></TextField>

      {/* Checkbox for Anonymous responses */}
      <FormControlLabel control={<Checkbox />} label="Anonymous?" />

      <Button>Add Question</Button>
      <Button>Submit</Button>
    </FormControl>
  );
}
