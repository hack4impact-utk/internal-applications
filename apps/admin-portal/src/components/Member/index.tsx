'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

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
  //Add image when database is setup
  //Change image datatype if needed
  image?: string;
}

export default function Member(memberInfo: memberProps) {
  return (
    <Box
      sx={{
        border: 'solid',
        width: 350,
        textAlign: 'center',
        padding: 2,
        background: 'linear-gradient(to bottom, PaleTurquoise, SkyBlue)',
        borderRadius: '15px',
      }}
    >
      <Image width={200} height={200}
      /* Change to show member image when database is setup
         Currently using H4I logo (URI format) as a placeholder
         Maybe use H4I logo if no image is provided?
      */
        src={memberInfo.image ? memberInfo.image : "data:image/jpeg;base64,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"}
        alt='H4ILogo'
        style={{
          //No styling yet
        }}
    />
      <Typography variant="body1" fontFamily={'Georgia'} width={350}>
        <b>{memberInfo.name}</b>
        {memberInfo.pronouns ? ' (' + memberInfo.pronouns + ')': ''} <br />
        {memberInfo.role} -&gt; {memberInfo.project}<br />
        {memberInfo.major}, Class of {memberInfo.gradClass} <br />
        {memberInfo.email} <br />
        <span style={{float: 'left', width: 175}}><a href={memberInfo.github}>Github</a></span>
        <span style={{float: 'right', width: 175}}><a href={memberInfo.linkedin}>LinkedIn</a></span>
      </Typography>
    </Box>
  );
}
