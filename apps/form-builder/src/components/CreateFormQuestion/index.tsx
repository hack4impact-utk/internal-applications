import React from 'react';
import Textfeild from '@mui/material/TextField';

const App: React.FC = () => {
  return (
    <div style={{ margin: '20ptx' }}>
      <Textfeild label="Question" variant="outlined" fullWidth />
    </div>
  );
};

export default App;
