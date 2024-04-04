'use client';
import { Box, Tabs, Tab, Button } from "@mui/material"
import React from "react";

export default function FormTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return <>
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Submissions" />
            <Tab label="Analytics" />
            <Tab label="Questions" />
            <Tab label="Settings" />
          </Tabs>
        </Box>
      </Box>
      <Button
        variant="outlined"
        style={{ position: 'absolute', top: 15, right: 15 }}
      >
        get link
      </Button>
      </>
}