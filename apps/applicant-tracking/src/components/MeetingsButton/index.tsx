import React from 'react';
import Button from '@mui/material/Button';

const MeetingsButton: React.FC = () => {
    return (
      <Button variant="contained" color="primary" style={{ borderRadius: '20px', padding: '5px 50px', backgroundColor: '#42A5F5', color:'black'}}>
        Meetings
      </Button>
    );
  };

export default MeetingsButton;
