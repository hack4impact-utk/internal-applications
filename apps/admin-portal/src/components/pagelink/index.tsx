'use client';

import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';

interface linkProps {
  url: string;
  pageTitle: string;
  description: string;
}
export default function PageLink(linkInfo: linkProps) {
  return (
    <>
      <Link href={linkInfo.url} underline="none">
        <Box
          sx={{
            width: 300,
            height: 200,
            border: 1,
            borderRadius: 2,
            borderWidth: 1,
            bgcolor: 'primary.main',
            borderColor: 'black',
            '&:hover': {
              bgcolor: 'primary.dark',
              border: 1,
            },
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'black',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontStyle: 'normal',
                fontSize: 20,
                color: 'white',
              }}
            >
              {linkInfo.pageTitle}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontStyle: 'italic',
                color: 'white',
                padding: 1,
              }}
            >
              {linkInfo.description}
            </Typography>
          </Box>
        </Box>
      </Link>
    </>
  );
}
