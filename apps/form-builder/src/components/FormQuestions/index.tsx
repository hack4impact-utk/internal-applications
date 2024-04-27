'use client';
import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import CreateFormQuestion from '../CreateFormQuestion';
import { CreateFormQuestionRequest } from '@hack4impact-utk/internal-models';

export default function FormQuestions() {
  const [questions, setQuestions] = useState<CreateFormQuestionRequest[]>([]);
  function addFormQuestion() {
    const newQuestion: CreateFormQuestionRequest = {
      isRequired: false,
      questionType: 'Text',
      title: '',
      description: '',
    };
    setQuestions((currQuestions) => [...currQuestions, newQuestion]);
  }
  return (
    <Box>
      {questions.map((question, i) => (
        <Box key={i} sx={{ pb: 3 }}>
          <Typography fontWeight={'bold'}>Question {i + 1}</Typography>
          <CreateFormQuestion />
          <Divider sx={{ borderBottomWidth: 3, pt: 3 }} />
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Add new question</Typography>
        <IconButton>
          <AddIcon onClick={addFormQuestion} />
        </IconButton>
      </Box>
    </Box>
  );
}
