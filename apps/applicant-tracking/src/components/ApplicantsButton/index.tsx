import React from 'react';
import Button from '@mui/material/Button';

const ApplicantsButton: React.FC = () => {
  return (
    <Button variant="contained" color="primary" style={{ borderRadius: '40px', width:'400px', height:'50px', backgroundColor: '#42A5F5', color:'white', fontSize: '25px', textTransform: 'capitalize' }}
    href="/applicants"> {/* Added href component to redirect to Applicants page */}
      Applicants
    </Button>
  );
};

export default ApplicantsButton;
