import React from 'react';
import Button from '@mui/material/Button';

const ApplicantsButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        borderRadius: '40px',
        width: 'min(400px, 30vw)',
        height: 'min(50px, 6vh)',
        backgroundColor: '#42A5F5',
        color: 'white',
        fontSize: 'min(25px, 2vw)',
        textTransform: 'capitalize',
      }}
      href="applicants/applications"
    >
      Applications
    </Button>
  );
};

export default ApplicantsButton;
