import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/sheet';

//Takes in the question and response as props
interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

//function that displays the list
export default function TextQuestionAnalytics({ question, responses }: Props) {
  //gets the specific submission to a question from each response from a single form
  function getSubmission() {
    let array = [];
    for (let i = 0; i < responses.length; i++) {
      let num = responses[i].questionResponses.findIndex(
        (element) => element.question._id.toString() === question._id.toString()
      );
      array.push(responses[i].questionResponses[num].answer);
    }
    return array;
  }

  //displays the submissions in a list format
  return (
    <Sheet
      variant="outlined"
      sx={{
        width: 400,
        maxHeight: 300,
        overflow: 'auto',
        borderRadius: 'sm',
      }}
    >
      <List>
        {getSubmission().map((submission, index) => (
          <ListItem key={index}>
            <ListItemButton selected={false} variant="soft">
              <ListItemContent>{submission}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
}
