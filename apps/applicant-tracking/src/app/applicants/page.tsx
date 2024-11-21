import HistoryButton from "@/components/HistoryButton";
import React, { CSSProperties } from 'react';
export default function ApplicantsPage() {
    return (
        <div style={theme.container}>
      {/* Title */}
      <h1 style={theme.title}>Applicant Tracking</h1>
      <HistoryButton />

      {/* Orange Divider with Image */}
      <div style={theme.divider}>
        <img
          src="/globe.png"
          alt="Globe"
          style={theme.image}
        />
      </div>
    </div>
    );
}

const theme: {
    container: CSSProperties;
    title: CSSProperties;
    divider: CSSProperties;
    image: CSSProperties;
  } = {container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70 vh',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '300px',
  },
  divider: {
    width: '100%',
    height: '10px',
    backgroundColor: 'orange',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: '-70px',
    width: '150px',
    height: '150px',
    border: '2px solid orange',
    backgroundColor: '#fff', // White background behind the image
  },
};