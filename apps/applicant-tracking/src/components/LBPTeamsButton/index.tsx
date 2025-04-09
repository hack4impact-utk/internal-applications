import React from 'react';
import Button from '@mui/material/Button';

const LBPButton = () => {
  // return <Button variant="contained">LBP Teams</Button>;
  return( 
    <Button variant="contained" color="primary" style={{ borderRadius: '40px', width:'400px', height:'50px', backgroundColor: '#42A5F5', color:'white', fontSize: '25px', textTransform: 'capitalize' }}>
      {/* href="/...">  */}
        LBP Teams
      </Button>)
};

export default LBPButton;
