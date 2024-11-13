import React from 'react';
import Textfeild from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div style={{ margin: '20ptx' }}>
        <Textfeild label="Question" variant="outlined" fullWidth />
      </div>
    </Box>
  );
};

export default App;
