'use client';
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import MultipleChoiceOptions from '../MultipleChoiceOptions';
import TextOptions from '../TextOptions';
import NumericOptions from '../NumericOptions/NumericOptions';
import FileUploadOptions from '../FileUploadOptions/FileUploadOptions';

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
  const [value, setValue] = React.useState('');

  const [questionSettings, setQuestionSettings] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setQuestionSettings(event.target.value);
  };

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
      <FormControl sx={{ mt: 2, maxWidth: 170 }}>
        <InputLabel id="select-label">Question Type</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          onChange={handleChange}
          autoWidth
          label="Question Type"
        >
          <MenuItem value="Multiple">Multiple Choice</MenuItem>
          <MenuItem value="Numeric">Numeric Ranking</MenuItem>
          <MenuItem value="Text">Text</MenuItem>
          <MenuItem value="FileUpload">File Upload</MenuItem>
        </Select>
      </FormControl>
      <Box>
        {questionSettings === 'Multiple' && (
          <MultipleChoiceOptions></MultipleChoiceOptions>
        )}
        {questionSettings === 'Numeric' && <NumericOptions></NumericOptions>}
        {questionSettings === 'Text' && <TextOptions></TextOptions>}
        {questionSettings === 'FileUpload' && (
          <FileUploadOptions></FileUploadOptions>
        )}
      </Box>
    </Box>
  );
}
