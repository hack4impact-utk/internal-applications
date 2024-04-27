import TextQuestionAnalytics from '../FormSubmissions/TextQuestionAnalytics';
import { Box, Typography } from '@mui/material';
import NumericQuestionAnalytics from '../FormSubmissions/NumericQuestionAnalytics';
import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import MultipleChoiceQuestionAnalytics from '../FormSubmissions/MultipleChoiceQuestionAnalytics/Index';

interface FormAnalyticsProps {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

export default function FormAnalytics(props: FormAnalyticsProps) {
  const questionType = props.question?.questionType.toString();

  function numAnswers(total: number, responses: FormSubmissionResponse) {
    for (let i = 0; i < responses.questionResponses.length; i++) {
      if (responses.questionResponses[i].question._id === props.question._id) {
        if (
          responses.questionResponses[i].answer !== null &&
          responses.questionResponses[i].answer !== undefined
        ) {
          return ++total;
        }
      }
    }
    return total;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {props.question.title}
      </Typography>
      <Typography>{props.responses.reduce(numAnswers, 0)} Responses</Typography>
      {questionType === 'Text' && (
        <TextQuestionAnalytics
          question={props.question}
          responses={props.responses}
        ></TextQuestionAnalytics>
      )}
      {props.question.questionType === 'Numeric' && (
        <NumericQuestionAnalytics
          question={props.question}
          responses={props.responses}
        ></NumericQuestionAnalytics>
      )}
      {props.question.questionType === 'MultipleChoice' && (
        <MultipleChoiceQuestionAnalytics
          question={props.question}
          responses={props.responses}
        ></MultipleChoiceQuestionAnalytics>
      )}
      {props.question.questionType === 'FileUpload' && (
        <Typography variant="h5">
          File upload analytics will go here!
        </Typography>
      )}
    </Box>
  );
}
