import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import PieChartAnalytics from '../PieChartAnalytics';
import BarGraphAnalytics from '../BarGraphAnalytics/Index';

// Takes in the question and response as props
interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

// Function that displays the list
export default function MultipleChoiceQuestionAnalytics({
  question,
  responses,
}: Props) {
  // Gets the specific submission to a question from each response from a single form
  function getAnswers() {
    const otherAnswers = [];
    const allAnswers: string[] = [];
    // For a given form, the findIndex function will find the specific question from the list of questionResponses
    for (let i = 0; i < responses.length; i++) {
      const num = responses[i].questionResponses.findIndex(
        (element) => element.question._id.toString() === question._id.toString()
      );
      console.log(num);
      if (num === -1) {
        continue;
      } else {
        // Get the answer and options
        const answer = responses[i].questionResponses[num].answer;
        const options =
          responses[i].questionResponses[num].question.multipleChoiceOptions
            ?.options;
        console.log('starting a new response');
        if (Array.isArray(answer)) {
          for (const choice of answer) {
            console.log(choice, options);
            for (let j = 0; j < options!.length; j++) {
              if (options?.findIndex((option) => option == choice) === -1) {
                array.push(choice);
              }
            }
          }
        } else {
          // Check if the answer is not in the options array
          let answerInOptions = false;
          for (let j = 0; j < options!.length; j++) {
            if (options![j] == answer) {
              answerInOptions = true;
              break;
            }
        allAnswers.push(answer as string);

        // Check if the answer is not in the options array
        let answerInOptions = false;
        for (let j = 0; j < options!.length; j++) {
          if (options![j] === answer) {
            answerInOptions = true;
            break;
          }

        // If the answer is not in the options, add it to the array
        if (!answerInOptions) {
          otherAnswers.push(answer);
        }
      }
    }
    return [otherAnswers, allAnswers];
  }
  const qType = question.multipleChoiceOptions!.choiceType;
  // Displays the submissions in a list format with scroll functionality
  return (
    <>
      <Typography variant="h6">{`${qType} Select`}</Typography>
      {qType === 'Single' && (
        <PieChartAnalytics
          choices={question.multipleChoiceOptions!.options}
          answers={getAnswers()[1] as string[]}
        />
      )}
      {qType === 'Multiple' && (
        <BarGraphAnalytics
          choices={question.multipleChoiceOptions!.options}
          answers={getAnswers()[1] as string[][]}
        />
      )}
      {question.multipleChoiceOptions!.allowOther && qType !== 'Multiple' && (
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          <Typography>{'"Other"'} Answers:</Typography>
          <List>
            {getAnswers()[0].map((submission, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemText>{submission}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
}
