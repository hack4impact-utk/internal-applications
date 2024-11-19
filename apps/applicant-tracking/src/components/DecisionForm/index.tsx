import {
  Box,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { DecisionFormData } from '../../types/decisions';

interface DecisionFormProps {
  onChange: (formData: DecisionFormData) => void;
}

export default function DecisionForm({ onChange }: DecisionFormProps) {
  //create a state?
  const [formData, setFormData] = React.useState<DecisionFormData>({
    decision: 'Accepted',
    reason: '',
    role: 'Developer',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    onChange(newFormData);
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Decision</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="decision"
          value={formData.decision}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Accepted"
            control={<Radio />}
            label="Accept"
          />
          <FormControlLabel
            value="Rejected"
            control={<Radio />}
            label="Reject"
          />
          <FormControlLabel
            value="Waitlisted"
            control={<Radio />}
            label="Waitlist"
          />
        </RadioGroup>
      </FormControl>
      {/* reason field */}
      <TextField
        fullWidth
        label="Reason"
        multiline
        rows={4}
        name="reason"
        value={formData.reason || ''}
        onChange={handleChange}
      />
      {/* /role field */}
      <TextField
        id="filled-multiline-static"
        label="Role"
        select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        {' '}
        <MenuItem value="Developer">Developer</MenuItem>
        <MenuItem value="Designer">Designer</MenuItem>
        <MenuItem value="Learning Based Project">
          Learning Based Project
        </MenuItem>
        <MenuItem value="Operations">Operations</MenuItem>
      </TextField>
    </Box>
  );
}
