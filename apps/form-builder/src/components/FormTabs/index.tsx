'use client';
import { Box, Tabs, Tab, Button, Typography } from '@mui/material';
import React from 'react';
import FormSubmissionTable from '../FormSubmissions/FormSubmissionTable';
import { FormResponse } from '@hack4impact-utk/internal-models';

interface formsProp {
  form: FormResponse;
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
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FormTabs(props: formsProp) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Form submissions tab page"
          >
            <Tab label="Submissions" {...a11yProps(0)} />
            <Tab label="Analytics" {...a11yProps(1)} />
            <Tab label="Questions" {...a11yProps(2)} />
            <Tab label="Settings" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel index={0} value={value}>
          <FormSubmissionTable
            formSubmissions={props.form?.submissions}
          ></FormSubmissionTable>
        </CustomTabPanel>
        <CustomTabPanel index={1} value={value}></CustomTabPanel>
        <CustomTabPanel index={2} value={value}></CustomTabPanel>
        <CustomTabPanel index={3} value={value}></CustomTabPanel>
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
