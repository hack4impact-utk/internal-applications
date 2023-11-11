import { getFormById } from "@/server/actions/forms";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default async function FormPage({ params }: { params: { formId: string } }) 
{
  getFormById(params.formId) 

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
}