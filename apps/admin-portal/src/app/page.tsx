import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" sx={{ color: 'black' }}>
          Home Page
        </Typography>
      </Box>
    </>
  );
}
