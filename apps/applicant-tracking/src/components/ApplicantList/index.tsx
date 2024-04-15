import React from 'react';
import { ApplicantResponse } from '@hack4impact-utk/internal-models';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';

interface ApplicantListProps {
  applicants: ApplicantResponse[];
}

export default function ApplicantList(props: ApplicantListProps) {
  return (
    <List>
      {props.applicants.map((applicant) => (
        <ListItem key={applicant._id}>
          <ListItemText primary={applicant.firstName} />
        </ListItem>
      ))}
    </List>
  );
}
