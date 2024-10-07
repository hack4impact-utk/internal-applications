import React from 'react';
import { Typography } from '@mui/material';
import { ApplicantResponse } from '@hack4impact-utk/internal-models';

interface ApplicantDetailProps {
  applicant: ApplicantResponse;
}

export default function ApplicantDetail({ applicant }: ApplicantDetailProps) {
  return (
    <div>
      <Typography variant="h4">
        {applicant.firstName} {applicant.lastName}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {applicant.term} • {applicant.netid}
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        style={{ color: applicant.noShowCount > 0 ? 'red' : 'inherit' }}
      >
        {applicant.noShowCount} no shows
      </Typography>

      <Typography sx={{ fontSize: '0.75rem' }}>{applicant.notes}</Typography>
    </div>
  );
}
