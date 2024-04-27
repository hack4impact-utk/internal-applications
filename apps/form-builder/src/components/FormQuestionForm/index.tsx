'use client';
import { Box, FormControlLabel, Switch, TextField } from '@mui/material';

export interface FormQuestionFormData {
  title: string;
  description?: string;
  isRequired: boolean;
}

interface CreateFormQuestionProps {
  formData: FormQuestionFormData;
  onChange: (formData: FormQuestionFormData) => void;
}

export default function FormQuestionForm({
  formData,
  onChange,
}: CreateFormQuestionProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Title"
        value={formData.title}
        onChange={(e) => onChange({ ...formData, title: e.target.value })}
      />
      <TextField
        sx={{ mt: 2 }}
        label="Description"
        value={formData.description}
        onChange={(e) => onChange({ ...formData, description: e.target.value })}
      />
      <FormControlLabel
        sx={{ mt: 2 }}
        control={
          <Switch
            checked={formData.isRequired}
            value={formData.isRequired}
            onChange={(e) =>
              onChange({ ...formData, isRequired: e.target.checked })
            }
          />
        }
        label="Required?"
      />
    </Box>
  );
}
