import { Box, Typography } from '@mui/material';

interface memberParams {
  email: string;
  name: string;
  project: string;
  gradClass: string;
  pronouns?: string;
  major: string;
  role: string;
  github: string;
  linkedin: string;
}

export default function Member(params: memberParams) {
  return (
    <Box
      sx={{
        border: 'solid',
        maxWidth: 400,
        textAlign: 'center',
        backgroundColor: 'PaleTurquoise',
      }}
    >
      <Typography variant="h5" fontFamily={'arial'}>
        Name: {params.name} <br />
        Email: {params.email} <br />
        Project: {params.project} <br />
        Grad Class: {params.gradClass} <br />
        {params.pronouns ? 'Pronouns: ' + params.pronouns : ''}
        {params.pronouns ? <br /> : ''}
        Major: {params.major} <br />
        Role: {params.role} <br />
        Github: {params.github} <br />
        LinkedIn:{params.linkedin}
      </Typography>
    </Box>
  );
}
