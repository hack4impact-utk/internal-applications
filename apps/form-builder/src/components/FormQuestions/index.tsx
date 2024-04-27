'use client';
import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import FormQuestionForm, { FormQuestionFormData } from '../FormQuestionForm';
import {
  FormQuestionResponse,
  FormResponse,
} from '@hack4impact-utk/internal-models';

interface FormQuestionsProps {
  form?: FormResponse;
}

function FormQuestionResponsesToFormQuestionFormData(
  formQuestionResponses: FormQuestionResponse[]
) {
  return formQuestionResponses.map(
    (formQuestionResponse): FormQuestionFormData => {
      return {
        title: formQuestionResponse.title,
        description: formQuestionResponse.description,
        isRequired: formQuestionResponse.isRequired,
      };
    }
  );
}

export default function FormQuestions(props: FormQuestionsProps) {
  const [questionsFormData, setQuestionsFormData] = useState<
    FormQuestionFormData[]
  >(FormQuestionResponsesToFormQuestionFormData(props.form?.questions || []));

  function addFormQuestion() {
    const newQuestion: FormQuestionFormData = {
      isRequired: false,
      title: '',
      description: '',
    };
    setQuestionsFormData((currQuestions) => [...currQuestions, newQuestion]);
  }

  function onFormQuestionChange(index: number, newData: FormQuestionFormData) {
    setQuestionsFormData((currFormDataArr) =>
      currFormDataArr.map((formData, i) => (i === index ? newData : formData))
    );
  }

  return (
    <Box>
      {questionsFormData.map((question, i) => (
        <Box key={i} sx={{ pb: 3 }}>
          <Typography fontWeight={'bold'} sx={{ pb: 2 }}>
            Question {i + 1}
          </Typography>
          <FormQuestionForm
            formData={question}
            onChange={(formData: FormQuestionFormData) => {
              onFormQuestionChange(i, formData);
            }}
          />
          <Divider sx={{ borderBottomWidth: 3, pt: 3 }} />
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Add new question</Typography>
        <IconButton onClick={addFormQuestion}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
