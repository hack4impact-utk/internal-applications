import { FormSubmissionResponse } from '@hack4impact-utk/internal-models';
import { Typography } from '@mui/material';

// Define interface props to accept FormSubmissionResponse as a parameter
interface Props {
  formSubmission: FormSubmissionResponse;
}

// FormSubmission Component: Displays submission details including date, email, questions, and answers.
// Handles different types of questions and multiple choice options.
// If no answer is provided, it displays "No Response".
const FormSubmission: React.FC<Props> = ({ formSubmission }) => {
  // Parse submission date
  const submissionDate: Date = new Date(formSubmission.createdAt);

  return (
    <div className="form-submission">
      {/* Display submission date/time */}
      <Typography variant="subtitle1">
        Submission Date/Time: {submissionDate.toLocaleDateString() || 'Unknown'}
      </Typography>

      {/* Display responder email */}
      <Typography variant="subtitle1">
        Responder Email: {formSubmission.responderEmail || 'Anonymous'}
      </Typography>

      {/* Loop through question responses */}
      {formSubmission.questionResponses &&
        formSubmission.questionResponses.map((response, index) => (
          <div key={index}>
            {/* Display question title */}
            <Typography variant="h4">{response.question.title}</Typography>

            {/* Display question description */}
            <Typography variant="subtitle1">
              {response.question.description}
            </Typography>

            {/* Display answer */}
            <Typography>
              {response.answer !== null && response.answer !== undefined
                ? Array.isArray(response.answer)
                  ? response.answer.map((item, idx) => (
                      <div key={idx}>
                        {/* Handle ranked multiple choice options */}
                        {response.question.questionType === 'MultipleChoice' &&
                        response.question.multipleChoiceOptions?.choiceType ===
                          'Ranked'
                          ? `${idx + 1}. ${item}`
                          : item}
                      </div>
                    ))
                  : response.answer
                : 'No Response'}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default FormSubmission;
