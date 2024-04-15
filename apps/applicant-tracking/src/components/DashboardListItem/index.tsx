//code here
'use client';
import { DashboardListApplicantResponse } from '@hack4impact-utk/internal-models';
import { Button, Chip, ListItemSecondaryAction } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';

interface DashboardListItemProps {
  applicant: DashboardListApplicantResponse;
}

//return a button instead of just a string of text in the switch case
function ActionButton(status: string): JSX.Element {
  switch (status) {
    case 'Pending Review':
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
    //do something?
    case 'Scheduling Interview':
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
    case 'Interview Complete':
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

export default function DashboardListItem(props: DashboardListItemProps) {
  /*how to show the applicant info without the quotes? How to render the caption in a different style?
                                                                                such as the 'pending review' stuff. How to ensure that the button is in the correct place?*/

  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    setToday(new Date());
  }, []);

  const updatedAt = new Date(props.applicant.statusUpdatedAt); //converting to date type so it can be used in calculation below
  let daysSinceUpdate = 0;

  if (today) {
    daysSinceUpdate = Math.floor(
      (today.getTime() - updatedAt.getTime()) / (1000 * 3600 * 24)
    ); //computing how long ago status was updated
  }
  const actionButton = ActionButton(props.applicant.status); //included eblow
  const formattedDate = updatedAt.toLocaleDateString(); //for display purposes

  //determininig what color to make the date text
  let dateColor = '';
  if (daysSinceUpdate < 3) {
    dateColor = 'gray'; // or any other color
  } else if (daysSinceUpdate < 7) {
    dateColor = 'orange'; // or any other color
  } else {
    dateColor = 'red'; // or any other color
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
        } //applicant name *where to display the applicant status?
        secondary={
          <span>
            <span style={{ color: dateColor }}>{formattedDate}</span>
          </span>
        }
      />
      <ListItemSecondaryAction>
        {
          //how can I include the button in here
          actionButton
        }
      </ListItemSecondaryAction>
    </ListItem>
  );
}
