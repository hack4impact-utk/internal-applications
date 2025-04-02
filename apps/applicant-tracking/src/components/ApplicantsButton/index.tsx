import React from 'react';
import Button from '@mui/material/Button';

const ApplicantsButton: React.FC = () => {
  return (
    <Button variant="contained" color="primary" sx={{ borderRadius: '20px', padding: '5px 50px', backgroundColor: '#42A5F5', color:'black'}}
    href="/applicants"> {/* Added href component to redirect to Applicants page */}
      Applicants
    </Button>
  );
};

export default ApplicantsButton;
