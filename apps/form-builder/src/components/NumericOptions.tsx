import * as React from 'react';
import Switch from '@mui/material/Switch';
import { FormControlLabel, TextField } from '@mui/material';

export default function NumericOptions() {
  return (
    <>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Allow Decimals?"
      />

      <TextField id="Min-Val" label="Minimum Value" variant="outlined" />
      <TextField id="Max-Val" label="Maximum Value" variant="outlined" />
    </>
  );
}
