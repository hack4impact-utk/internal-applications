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
import BarGraphAnalytics from '../BarGraphAnalytics/Index';

import PieChartAnalytics from '../PieChartAnalytics';

import RankedChoiceAnalytics from '../RankedChoiceAnalytics/rankedchoiceanalytics';

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
    let array = [];
    // For a given form, the findIndex function will find the specific question from the list of questionResponses
    for (let i = 0; i < responses.length; i++) {
      let num = responses[i].questionResponses.findIndex(
        (element) => element.question._id.toString() === question._id.toString()
      );
      if (num === -1) {
        continue;
      } else {
        // Get the answer and options
        let answer = responses[i].questionResponses[num].answer;
        let options =
          responses[i].questionResponses[num].question.multipleChoiceOptions
            ?.options;

        // Check if the answer is not in the options array
        let answerInOptions = false;
        for (let j = 0; j < options!.length; j++) {
          if (options![j] === answer) {
            answerInOptions = true;
            break;
          }
        }

        // If the answer is not in the options, add it to the array
        if (!answerInOptions) {
          array.push(answer);
        }
      }
    }
    return array;
  }

  function getAnswersForChart(): string[][] {
    const result: string[][] = [];

    for (let i = 0; i < responses.length; i++) {
      const questionIndex = responses[i].questionResponses.findIndex(
        (element) => element.question._id.toString() === question._id.toString()
      );

      if (questionIndex === -1) continue;

      const answer = responses[i].questionResponses[questionIndex].answer;

      if (answer === undefined || answer === null) continue;

      if (Array.isArray(answer)) {
        result.push(answer.map((a) => String(a)));
      } else {
        result.push([String(answer)]);
      }
    }

    return result;
  }

  function displayChart() {
    const validAnswers = getAnswersForChart();

    // // Logged data can be seen in DevTools
    // console.log('Display Chart');
    // console.log('Question:', question);
    // console.log('Responses:', responses);
    // console.log('Valid Answers:', validAnswers);

    const hasValidAnswers =
      validAnswers.length > 0 && validAnswers.flat().length > 0;

    return (
      <>
        {question.multipleChoiceOptions?.choiceType === 'Single' &&
          hasValidAnswers && (
            <PieChartAnalytics
              choices={question.multipleChoiceOptions.options}
              answers={validAnswers}
            />
          )}
        {question.multipleChoiceOptions?.choiceType === 'Multiple' &&
          hasValidAnswers && (
            <BarGraphAnalytics
              choices={question.multipleChoiceOptions.options}
              answers={validAnswers}
            />
          )}
        {question.multipleChoiceOptions?.choiceType === 'Ranked' &&
          hasValidAnswers && (
            <RankedChoiceAnalytics
              choices={question.multipleChoiceOptions.options}
              answers={validAnswers}
            />
          )}
      </>
    );
  }

  // Displays the submissions in a list format with scroll functionality
  return (
    <>
      <Typography variant="h6">
        {'Choice Type: '}
        {question.multipleChoiceOptions?.choiceType}
      </Typography>
      <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
        <List>
          {getAnswers().map((submission, index) => (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemText>{submission}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {displayChart()}
    </>
  );
}
