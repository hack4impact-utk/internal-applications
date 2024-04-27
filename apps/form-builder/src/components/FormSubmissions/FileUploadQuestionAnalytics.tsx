import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

export default function FileUploadQuestionAnalytics({
  question,
  responses,
}: Props) {
  function getResponse() {
    const answers = [];
    // iterating over each element in array
    for (let i = 0; i < responses.length; i++) {
      // finds response
      const questionResponse = responses[i].questionResponses.find(
        (element) => element.question._id.toString() === question._id.toString()
      );
      // if found, then push onto array
      if (questionResponse) {
        answers.push(questionResponse.answer);
      }
    }
    return answers;
  }

  // display responses as scrollable list
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
    >
      {getResponse().map((submission, index) => (
        <ListItem key={index}>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText>{submission}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
