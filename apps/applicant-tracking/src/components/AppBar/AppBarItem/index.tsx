import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

//AppBar design

export default function HeaderAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        background: 'transparent',
      }}
    >
      {/* keeps avatar in the right most corner */}
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Avatar />
        </Box>
      </Container>
    </AppBar>
  );
}
