import { Button, Card, TextField, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

export default function NewFormPage() {
  
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');

  const handleformopen = () => {
    setOpen(true);
  };

  const handleformclose = () => {
    setOpen(false);
    // i think this is how you reset the fields
    setQuestion('');
    setQuestionType('');
  };

  const handlesubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Question:', question);
    console.log('Question Type:', questionType);
    handleformclose();
  };

  return (
    <>
      <h1>New Form Page</h1>
      <Button variant="contained" color="primary" onClick={handleformopen}>
        Click to Open Form
      </Button>

      {open && (
        <Card>
          <form onSubmit={handlesubmit}>
            <TextField
              label="Question"
              variant="outlined"
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              displayEmpty
              fullWidth
              required
            >
              <MenuItem value="" disabled>Select Question Type</MenuItem>
              <MenuItem value="short-answer">Short Answer</MenuItem>
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              <MenuItem value="true-false">True/False</MenuItem>
            </Select>
            <Button type="submit" variant="contained" color="secondary">Submit</Button>
            <Button variant="outlined" color="inherit" onClick={handleformclose} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
