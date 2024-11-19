import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CreateFormQuestion: React.FC = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        margin: '0 auto',
      }}
    >
      {/* Heading */}
      <Typography variant="h5" gutterBottom>
        Create Form Question
      </Typography>

      {/* Form Title Field */}
      <TextField
        label="Form Title"
        variant="outlined"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Form Description Field */}
      <TextField
        label="Form Description"
        variant="outlined"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      {/* Required Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
        }
        label="Required"
      />
    </Box>
  );
};

export default CreateFormQuestion;
