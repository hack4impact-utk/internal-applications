'use client';
import Link from 'next/link';

const LBPTeamsButton = () => {
  return (
    <Link href="teams">
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '30px',
        }}
      >
        LBP Teams
      </button>
    </Link>
  );
};

export default LBPTeamsButton;
