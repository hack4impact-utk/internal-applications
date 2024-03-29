import { getFormById } from "@/server/actions/forms";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default async function FormPage({ params }: { params: { formId: string } }) {
  const form = await getFormById(params.formId);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <p>Title: {form.title}</p>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Submissions" />
            <Tab label="Analytics" />
            <Tab label="Questions" />
            <Tab label="Settings" />
          </Tabs>
        </Box>
      </Box>
      //put in top right
      <Button variant="outlined">get link</Button>
    </div>
  );
}

