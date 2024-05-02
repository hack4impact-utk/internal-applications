'use client';
import { FormQuestionResponse } from '@hack4impact-utk/internal-models';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';

interface MultipleChoiceOptionsProps {
  currentQuestion?: FormQuestionResponse;
}

export default function MultipleChoiceOptions(
  props: MultipleChoiceOptionsProps
) {
  const [choiceType, setChoiceType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setChoiceType(event.target.value);
  };

  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    if (props.currentQuestion) {
      setChoices(props.currentQuestion.multipleChoiceOptions!.options);
    }
  }, [props.currentQuestion]);

  function addChoice() {
    const newChoice = '';
    setChoices((currChoices) => [...currChoices, newChoice]);
  }

  return (
    <Box>
      <Box sx={{ minWidth: 200, p: 1 }}>
        <FormControl sx={{ minWidth: 210 }}>
          <InputLabel id="multiple-choice-select-label">
            Multiple Choice Type
          </InputLabel>
          <Select
            value={choiceType}
            label="Multiple Choice Question Type"
            onChange={handleChange}
          >
            <MenuItem value={0}>Multiple Choice</MenuItem>
            <MenuItem value={1}>Multiple Select</MenuItem>
            <MenuItem value={2}>Ranked Choice</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ p: 1 }}>
        {choices.map((choice) => (
          <Box key={choice} sx={{ p: 0.5 }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ChevronRightIcon />
                  </InputAdornment>
                ),
              }}
            >
              {choice}
            </TextField>
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 2 }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addChoice}>
          add option
        </Button>
      </Box>
    </Box>
  );
}
