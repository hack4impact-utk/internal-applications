'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { FormControl } from '@mui/material';

/* Form Builder Outline
  - Form Name (editable)

  - Question 1 (Start With, cannot be deleted)
    - Question Type (editable) * side box
    - Question Text (editable) * would be great to have markdown or something
    - Required (checkbox)

  - Add New Question Button

*/

export default function NewFormPage() {
  const [questions, setQuestions] = useState<string[]>(['Question 1']);

  const addNewQuestion = () => {
    setQuestions([...questions, `Question ${questions.length + 1}`]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="">
        <Typography variant="h2">New Form</Typography>
        <div>
          {questions.map((question, index) => (
            <Box
              key={index}
              sx={{
                marginTop: 2,
                padding: 2,
                border: '1px solid black',
              }}
            >
              <Typography variant="h6">{question}</Typography>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
              </FormControl>
            </Box>
          ))}
        </div>
        <Button variant="contained" onClick={addNewQuestion} sx={{ mt: 5 }}>
          New Question
        </Button>
      </div>
    </div>
  );
}
