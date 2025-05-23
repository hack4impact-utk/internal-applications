import HistoryButton from '@/components/HistoryButton';
import MeetingsButton from '@/components/MeetingsButton';
import LBPButton from '@/components/LBPTeamsButton';
import ApplicantsButton from '@/components/ApplicantsButton';
import React, { CSSProperties } from 'react';

export default function ApplicantsPage() {
  return (
    <div style={theme.container}>
      {/* Title */}
      <h1 style={theme.title}>Applicant Tracking</h1>

      <div
        style={{
          display: 'flex',
          gap: 'min(250px, 20vw)',
          marginBottom: '50px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <ApplicantsButton />
        <LBPButton />
      </div>

      {/* Orange Divider with Image */}
      <div style={theme.divider}>
        <img src="/globe.png" alt="Globe" style={theme.image} />
      </div>
      {/* <div style={theme.row}> */}
      <div
        style={{
          display: 'flex',
          gap: 'min(250px, 20vw)',
          marginTop: '50px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <MeetingsButton />
        <HistoryButton />
      </div>
    </div>
  );
}

const theme: {
  container: CSSProperties;
  title: CSSProperties;
  divider: CSSProperties;
  image: CSSProperties;
} = {
  container: {
    display:
      'flex' /*allows user control over whether the container is displayed inline or inblock */,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:
      'center' /*both of these with center just put the things below inside the object */,
    height: '70vh',
    fontFamily: 'Arial, sans-serif',
    padding: '0 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2rem' /*how big the title is */,
    marginBottom:
      '100px' /*how far the title is from where the container is located */,
  },
  divider: {
    width: '90%',
    height: '5px',
    backgroundColor: 'orange',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: '-100px' /*length from container itself: used to move image in line with the divider */,
    width: '200px',
    height: '200px',
  },
};
