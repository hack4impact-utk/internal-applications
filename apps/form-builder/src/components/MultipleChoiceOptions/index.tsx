import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type MultipleChoiceType =
  | 'Multiple choice'
  | 'Multiple select'
  | 'Ranked choice';

interface MultipleChoiceOptionsProps {
  onChange?: (value: MultipleChoiceType) => void;
  defaultValue?: MultipleChoiceType;
}

const MultipleChoiceOptions: React.FC<MultipleChoiceOptionsProps> = ({
  onChange,
  defaultValue = 'Multiple choice',
}) => {
  const [choiceType, setChoiceType] =
    useState<MultipleChoiceType>(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as MultipleChoiceType;
    setChoiceType(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="multiple-choice-type-label">
        Multiple Choice Type
      </InputLabel>
      <Select
        labelId="multiple-choice-type-label"
        id="multiple-choice-type-select"
        value={choiceType}
        label="Multiple Choice Type"
        onChange={handleChange}
      >
        <MenuItem value="Multiple choice">Multiple choice</MenuItem>
        <MenuItem value="Multiple select">Multiple select</MenuItem>
        <MenuItem value="Ranked choice">Ranked choice</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MultipleChoiceOptions;
