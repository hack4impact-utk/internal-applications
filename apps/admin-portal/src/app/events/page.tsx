//import EventCreateForm from '@/components/EventCreateForm';
import Event from '@/components/Event';
import { eventParams } from '@/components/Event';
import { Typography, Button } from '@mui/material';
import React from 'react';


export default function EventCreationPage() {
  const eventInfos: eventParams[] = [
    {
      name: 'Event Placeholder 1',
      date: '04-11-2024',
      time: '11:11 PM',
      location: 'Murfreesboro, TN'
    },
    {
      name: 'Event Placeholder 2',
      date: '04-12-2024',
      time: '11:11 PM',
      location: 'Knoxville, TN'
    },
    {
      name: 'Event Placeholder 3',
      date: '04-12-2024',
      time: '11:11 PM',
      location: 'Gatlinburg, TN'
    },
    {
      name: 'Event Placeholder 4',
      date: '04-12-2024',
      time: '11:11 PM',
      location: 'Nashville, TN'
    },
    {
      name: 'Event Placeholder 5',
      date: '04-12-2024',
      time: '11:11 PM',
      location: 'Smyrna, TN'
    },
    {
      name: 'Event Placeholder 6',
      date: '04-12-2024',
      time: '11:11 PM',
      location: 'Shelbyville, TN'
    },
  ];

  const eventList: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '.4',
  };


  return (
    <div style={{ marginLeft: '290px', marginTop: '85px' }}>
      <>
        <Typography style={{ fontFamily: 'monospace' }}>
          <h1>Events</h1>
          <a href="/events/create/page" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Create Event</Button>
          </a>

            <div style={eventList}>     
                {eventInfos.map((event, index) =>(
                  <Event
                    key = {index}
                    name = {event.name}
                    date = {event.date}
                    time = {event.time}
                    location = {event.location}
                  />
                ))}
            </div>
        </Typography>
      </>
    </div>
  );
}
