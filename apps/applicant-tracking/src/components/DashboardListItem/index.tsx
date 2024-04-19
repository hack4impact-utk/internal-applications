//Including relevant material from MUI
'use client';
import { DashboardListApplicantResponse } from '@hack4impact-utk/internal-models';
import { Button, Chip, ListItemSecondaryAction } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';

interface DashboardListItemProps {
  applicant: DashboardListApplicantResponse;
}

//designing an action button- will return a different button
//based on the applicant status
function ActionButton(status: string): JSX.Element {
  switch (status) {
    case 'Pending Review': //schedule interview button
      return (
        <Button
          variant="outlined"
          onClick={() => {
            console.log('schedule interview');
          }}
        >
          schedule interview
        </Button>
      );

    case 'Scheduling Interview': //follow up on interview button
      return (
        <Button
          variant="outlined"
          onClick={() => {
            console.log('follow up');
          }}
        >
          follow up
        </Button>
      );
    case 'Interview Complete': //make a decision button
      return (
        <Button
          variant="outlined"
          onClick={() => {
            console.log('make decision');
          }}
        >
          MAKE DECISION
        </Button>
      );
    default:
      throw new Error('invalid status argument.');
  }
}

//deals with the constant time changing for date calculation
export default function DashboardListItem(props: DashboardListItemProps) {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    setToday(new Date());
  }, []);

  const updatedAt = new Date(props.applicant.statusUpdatedAt); //converting to date type so it can be used in calculation below
  let daysSinceUpdate = 0;

  //computing how long ago status was updated
  if (today) {
    daysSinceUpdate = Math.floor(
      (today.getTime() - updatedAt.getTime()) / (1000 * 3600 * 24)
    );
  }
  const actionButton = ActionButton(props.applicant.status); //included eblow
  const formattedDate = updatedAt.toLocaleDateString(); //for display purposes

  //determininig what color to make the date text
  let dateColor = '';
  if (daysSinceUpdate < 3) {
    dateColor = 'gray';
  } else if (daysSinceUpdate < 7) {
    dateColor = 'orange';
  } else {
    dateColor = 'red';
  }

  //use a chip to display applicant status
  return (
    <ListItem>
      <ListItemText
        primary={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>
              {props.applicant.firstName} {props.applicant.lastName}
            </span>
            <Chip label={props.applicant.status} />
          </div>
        }
        secondary={
          <span>
            <span style={{ color: dateColor }}>{formattedDate}</span>
          </span>
        }
      />
      <ListItemSecondaryAction>{actionButton}</ListItemSecondaryAction>
    </ListItem>
  );
}
