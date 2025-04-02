// Sources: mui.com
import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function RecentFilters() {
  return (
    <Box sx={{ 
        position: 'absolute',
        top: 80,
        right:50,
        minWidth: 100,
        border: '2px solid',
        borderColor: 'grey.700',
        borderRadius: 1,
        backgroundColor: 'white',}}>

      <FormControl fullWidth>
        <NativeSelect

          defaultValue={1}

          inputProps={{
            // Oldest to Newest option is default
            id: 'uncontrolled-native',
          }}

        >

          <option value={1}>Oldest to Newest</option>
          <option value={2}>Newest to Oldest</option>

        </NativeSelect>
      </FormControl>
    </Box>
  );
}