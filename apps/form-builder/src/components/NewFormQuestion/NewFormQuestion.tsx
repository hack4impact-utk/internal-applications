'use client';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import {
  CreateFormQuestionRequest,
  zFormQuestionType,
} from '@hack4impact-utk/internal-models';
import { z } from 'zod';

export default function NewFormQuestion() {
  const [formQuestion, setFormQuestion] = useState<CreateFormQuestionRequest>({
    title: '',
    isRequired: false,
    questionType: 'Text',
    description: '',
  });

  useEffect(() => {
    console.log(formQuestion);
  }, [formQuestion]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="title"
        label="Title"
        required
        value={formQuestion.title}
        onChange={(e) =>
          setFormQuestion({ ...formQuestion, title: e.target.value })
        }
      />
      <TextField
        id="description"
        label="Description"
        multiline
        value={formQuestion.description}
        onChange={(e) =>
          setFormQuestion({ ...formQuestion, description: e.target.value })
        }
      />
      <FormControlLabel
        control={<Switch
            onChange={(e) =>
              setFormQuestion({ ...formQuestion, isRequired: e.target.checked })
            }
            value={formQuestion.isRequired}
        />} label="Required" 
          
      
        required
      />
      <FormControl required>
        <FormLabel id="question-type">Question Type</FormLabel>
        <RadioGroup
          onChange={(e) =>
            setFormQuestion({
              ...formQuestion,
              questionType: e.target.value as z.infer<typeof zFormQuestionType>,
            })
          }
          value={formQuestion.questionType}
        >
          <FormControlLabel value="Text" control={<Radio />} label="Text" />

          <FormControlLabel
            value="Numeric"
            control={<Radio />}
            label="Numeric"
            />
          <FormControlLabel
            value="MultipleChoice"
            control={<Radio />}
            label="Multiple Choice"
            />
            <FormControlLabel
              value="FileUpload"
              control={<Radio />}
              label="File Upload"
          />
        </RadioGroup>
      </FormControl>
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </div>
  );
}
