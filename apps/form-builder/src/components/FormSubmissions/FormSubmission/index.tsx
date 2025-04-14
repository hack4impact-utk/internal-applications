// import {QuestionResponse} from '@hack4impact-utk/internal-models'
import { Box, Divider, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';

// Define the FormSubmissionResponse interface locally
interface FormSubmissionResponse {
  createdAt: string | Date;
  responderEmail?: string;
  questionResponses?: QuestionResponse[];
}

interface QuestionResponse{
  question: {
    title: string;
    description: string;
    questionType: string;
    multipleChoiceOptions?: {
      choiceType: string;
    };
  };
  answer: string | string[] | null;
}

// Define interface props to accept FormSubmissionResponse as a parameter
interface Props {
  formSubmission: FormSubmissionResponse;
}


function FormSubmission({ formSubmission }: Props) {
  // Parse submission date
  const submissionDate: Date = new Date(formSubmission.createdAt);

   const rankedresponses = formSubmission.questionResponses?.filter(
    (response: QuestionResponse) =>
      response.question.questionType === 'multiplechoice' && 
      response.question.multipleChoiceOptions?.choiceType === 'ranked' 

      
  );


const rankedchoiseanalytics = (response : QuestionResponse) => {
  
}
  // return (
  //   <Box sx={{ mt: 3, mb: 5, height: 300 }}>
  //     <Typography variant="h6">Ranked Choice Analysis</Typography>
  //     <BarChart
  //       xAxis={[{ scaleType: 'band', data: xAxisData }]}
  //       series={seriesData}
  //       width={600}
  //       height={300}
  //       legend={{ position: 'top' }}
  //     />
  //   </Box>
  // );
  return (
    <Box>
      {/* Display submission date/time */}
      <Typography variant="subtitle1">
        Submission Date/Time:{' '}
        {submissionDate.toLocaleDateString() +
          ', ' +
          submissionDate.toLocaleTimeString() || 'Unknown'}
      </Typography>

      {/* Display responder email */}
      <Typography variant="subtitle1">
        Responder Email: {formSubmission.responderEmail || 'Anonymous'}
      </Typography>

      {/* Loop through question responses */}
      {formSubmission.questionResponses &&
        formSubmission.questionResponses.map((response: QuestionResponse, index: number) => (
          <Box key={index}>
            {/* Display question title */}
            <Typography variant="h5">{response.question.title}</Typography>

            {/* Display question description */}
            <Typography variant="subtitle1">
              {response.question.description}
            </Typography>

            {/* Display answer */}
            <Typography>
              {response.answer !== null && response.answer !== undefined
                ? Array.isArray(response.answer)
                  ? response.answer.map((item, idx) => (
                      <Box key={idx} sx={{ py: 1.5 }}>
                        {/* Handle ranked multiple choice options */}
                        {response.question.questionType === 'MultipleChoice' &&
                        response.question.multipleChoiceOptions?.choiceType ===
                          'Ranked'
                          ? `${idx + 1}. ${item}`
                          : item}
                      </Box>
                    ))
                  : response.answer
                : 'No Response'}
            </Typography>
            <Divider sx={{ borderBottomWidth: 5, pt: 3 }} />
          </Box>
        ))}
    </Box>
  );
}

export default FormSubmission;
