'use client';
import { Box, Tabs, Tab, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import FormSubmissionTable from '../FormSubmissions/FormSubmissionTable';
import FormQuestions from '../FormQuestions';
import FormAnalytics from '../FormAnalytics';
import {
  FormQuestionResponse,
  FormResponse,
} from '@hack4impact-utk/internal-models';
import FormSettings from '../FormSettings';

interface FormTabsProps {
  form?: FormResponse;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FormTabs(props: FormTabsProps) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Submissions" id={'0'} />
            <Tab label="Analytics" id={'1'} />
            <Tab label="Questions" id={'2'} />
            <Tab label="Settings" id={'3'} />
          </Tabs>
        </Box>
        {/*Submissions*/}
        <CustomTabPanel index={0} value={value}>
          <FormSubmissionTable
            formSubmissions={props.form?.submissions || []}
          ></FormSubmissionTable>
        </CustomTabPanel>
        {/*Analytics*/}
        <CustomTabPanel index={1} value={value}>
          {props.form &&
            props.form.questions.map(
              (question: FormQuestionResponse, i: number) => (
                <Box key={i} sx={{ p: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.secondary' }}
                  >
                    Question {i + 1}
                  </Typography>
                  <Box minHeight={150} display={'flex'}>
                    <FormAnalytics
                      question={question}
                      responses={props.form!.submissions}
                    ></FormAnalytics>
                  </Box>
                  {i !== props.form!.questions.length - 1 && (
                    <Divider sx={{ p: 1 }}></Divider>
                  )}
                </Box>
              )
            )}
        </CustomTabPanel>
        {/*Questions*/}
        <CustomTabPanel index={2} value={value}>
          <FormQuestions form={props.form} />
        </CustomTabPanel>
        {/*Settings*/}
        <CustomTabPanel index={3} value={value}>
          <FormSettings />
        </CustomTabPanel>
      </Box>
      <Button
        variant="outlined"
        style={{ position: 'absolute', top: 15, right: 15 }}
      >
        get link
      </Button>
    </>
  );
}
