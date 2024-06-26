import { FormSubmissionResponse } from '@hack4impact-utk/internal-models';
import { Box, Divider, Typography } from '@mui/material';

// Define interface props to accept FormSubmissionResponse as a parameter
interface Props {
  formSubmission: FormSubmissionResponse;
}

// FormSubmission Component: Displays submission details including date, email, questions, and answers.
// Handles different types of questions and multiple choice options.
// If no answer is provided, it displays "No Response".
function FormSubmission({ formSubmission }: Props) {
  // Parse submission date
  const submissionDate: Date = new Date(formSubmission.createdAt);

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
        formSubmission.questionResponses.map((response, index) => (
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
