import dbConnect from '@/utils/db-connect';
import {
  CreateFormQuestionRequest,
  FormQuestion,
  FormQuestionResponse,
  FormQuestionSchema,
  FormResponse,
  FormSchema,
  FormSubmissionSchema,
} from '@hack4impact-utk/internal-models';
import { getFormById } from './forms';

export async function createFormQuestions(
  formId: string,
  formQuestions: CreateFormQuestionRequest[]
): Promise<FormResponse | null> {
  await dbConnect();

  const createdFormQuestions: FormQuestion[] =
    await FormQuestionSchema.create(formQuestions);

  const castedFormQuestions = createdFormQuestions as FormQuestionResponse[];

  const form: FormResponse | null = await getFormById(formId);

  const formQuestionIds = castedFormQuestions.map(
    (formQuestion) => formQuestion._id
  );

  const existingQuestionIds = form?.questions.map((q) => q._id);

  if (form != null) {
    const res: FormResponse | null = await FormSchema.findByIdAndUpdate(
      { _id: formId },
      { questions: existingQuestionIds?.concat(formQuestionIds) }
    );
    return res;
  }
  return null;
}

export async function getFormQuestions(
  formId: string
): Promise<FormQuestionResponse[] | null> {
  const form: FormResponse | null = await getFormById(formId);

  if (!form) {
    return null;
  }

  console.log(form.questions);

  return form.questions;
}

export async function deleteFormQuestion(
  formId: string,
  formQuestionId: string
) {
  await dbConnect();

  const form: FormResponse | null = await getFormById(formId);

  if (!form) {
    return null;
  }

  const newQuestionIds = form?.questions
    .filter((formQuestion) => formQuestion._id.toString() !== formQuestionId)
    .map((formQuestion) => formQuestion._id);

  form?.submissions.forEach((submission) => {
    submission.questionResponses = submission.questionResponses.filter(
      (questionResponse) =>
        questionResponse.question._id.toString() !== formQuestionId
    );
    const newSubmissionQuestionResponseIds =
      submission.questionResponses.filter(
        (qRes) => qRes.question._id.toString() !== formQuestionId
      );
    FormSubmissionSchema.findByIdAndUpdate({
      _id: submission._id,
      questionResopnses: newSubmissionQuestionResponseIds,
    });
  });

  await FormSchema.findByIdAndUpdate(
    { _id: formId },
    { questions: newQuestionIds }
  );
}
