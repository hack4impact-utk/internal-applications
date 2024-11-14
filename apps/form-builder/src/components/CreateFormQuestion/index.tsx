import React from 'react';
import TextField from '@mui/material/TextField';
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
      <Typography variant="h4" gutterBottom>
        Create Form Question
      </Typography>
      <TextField
        label="Question"
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default App;
