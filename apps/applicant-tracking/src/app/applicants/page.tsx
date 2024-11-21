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
    display: 'flex', /*allows user control over whether the container is displayed inline or inblock */
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', /*both of these with center just put the things below inside the object */
    height: '70 vh',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '3.5rem', /*how big the title is */
    marginBottom: '300px', /*how far the title is from where the container is located */
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
    top: '-70px', /*length from container itself: used to move image in line with the divider */
    width: '150px',
    height: '150px',
    border: '2px solid orange',
    backgroundColor: '#fff', // White background behind the image
  },
};