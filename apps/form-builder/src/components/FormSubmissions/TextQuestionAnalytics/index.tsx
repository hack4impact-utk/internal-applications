import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';

//Takes in the question and response as props
interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

//function that displays the list
export default function TextQuestionAnalytics({ question, responses }: Props) {
  //gets the specific submission to a question from each response from a single form
  function getAnswers() {
    const array = [];
    //for a given form, the findIndex function will find the specific question from the list of questionResponses
    for (let i = 0; i < responses.length; i++) {
      const num = responses[i].questionResponses.findIndex(
        (element) => element.question._id.toString() === question._id.toString()
      );
      if (num == -1 || !responses[i].questionResponses[num].answer) {
        continue;
      } else {
        array.push(responses[i].questionResponses[num].answer);
      }
    }
    return array;
  }

  //displays the submissions in a list format
  return (
    <List>
      {getAnswers().map((submission, index) => (
        <ListItem key={index}>
          <ListItemButton selected={false} variant="soft">
            <ListItemContent>{submission}</ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
