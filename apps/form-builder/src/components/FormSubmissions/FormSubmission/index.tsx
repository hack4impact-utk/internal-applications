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

const rankedchoiceanalytics = (response: QuestionResponse) => {
 if(!response.answer || !Array.isArray(response.answer)) return null;
 // Check if the answer is an array

 const allchoices = formSubmission.questionResponses 
 ?.filter(r => r.question.title === response.question.title)
  ?.flatMap(r => r.answer)
  //grab unique choices
  ?.filter((value, index, self) => self.indexOf(value) === index) as string[]; 

if (!allchoices || allchoices.length === 0) return null;

const chartdata = allchoices.map((choice: string) => {
  const rankCounts: Record<number, number> = {};

  // Count the occurrences of each rank for the current choice
  if (Array.isArray(response.answer)) {
    response.answer.forEach((rank: string, index: number) => {
      if (rank === choice) {
        rankCounts[index + 1] = (rankCounts[index + 1] || 0) + 1;
      }
    });
  }
  
  return {
    choice,
    ...rankCounts,
  };
});

// grab rank positions 
    const rankpositions = Array.from(
      new Set(
        chartdata.flatMap((data: { choice: string, [key: string]: number | string }) => 
          Object.keys(data).filter(key => key.startsWith('Rank '))
        )
      )
    ).sort();

// Create series data for the bar chart
const seriesData = rankpositions.map((rank: string) => ({
  name: rank,
  data: chartdata.map((data: { [key: string]: number | string }) => data[rank]),
}));


return chartdata;
}
// Create x-axis data for the bar chart
  return (
    <Box>
      {/* Ranked Choice Analysis Chart */}
      <Box sx={{ mt: 3, mb: 5, height: 300 }}>
        <Typography variant="h6">Ranked Choice Analysis</Typography>
        <BarChart
          width={600}
          height={300} series={[]}      />
      </Box>
      
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
      {formSubmission.questionResponses?.map((response: QuestionResponse, index: number) => (
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
