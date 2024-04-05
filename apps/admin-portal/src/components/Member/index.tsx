'use client';
import { Box, Typography } from '@mui/material';

interface memberProps {
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

export default function Member(memberInfo: memberProps) {
  return (
    <Box
      sx={{
        border: 'solid',
        width: 500,
        textAlign: 'left',
        padding: 2,
        backgroundColor: 'PaleTurquoise',
      }}
    >
      <Typography variant="h5" fontFamily={'Verdana'} width={500}>
        <b>Name: {memberInfo.name}</b> <br />
        {memberInfo.pronouns ? 'Pronouns: ' + memberInfo.pronouns : ''}
        {memberInfo.pronouns ? <br /> : ''}
        Email: {memberInfo.email} <br />
        Project: {memberInfo.project} <br />
        Role: {memberInfo.role} <br />
        Grad Class: {memberInfo.gradClass} <br />
        Major: {memberInfo.major} <br />
        Github: {memberInfo.github} <br />
        LinkedIn: {memberInfo.linkedin}
      </Typography>
    </Box>
  );
}
