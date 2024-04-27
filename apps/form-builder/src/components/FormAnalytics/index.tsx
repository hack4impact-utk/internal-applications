import TextQuestionAnalytics from '../FormSubmissions/TextQuestionAnalytics';
import { Box } from '@mui/material';
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
  return (
    <Box>
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
        <h1>File upload analytics will go here!</h1>
      )}
    </Box>
  );
}
