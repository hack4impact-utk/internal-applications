'use client';
import * as React from 'react';
import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

export default function MultipleChoiceQuetionAnalytics({
  question,
  responses,
}: Props) {
  // Render function for the scrollable list
  function renderRow(props: ListChildComponentProps) {
    return (
      <ListItem style={} key={} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={} />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box
        sx={{
          width: '100%',
          height: 400,
          maxWidth: 360,
        }}
      >
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={200} // Update itemCount to match the number of items to display in the scrollable list
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
}
