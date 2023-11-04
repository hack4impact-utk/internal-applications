import dbConnect from '@/utils/db-connect';
import {
  CreateFormQuestionRequest,
  FormEntity,
  FormQuestionEntity,
  FormQuestionResponse,
  FormQuestionSchema,
  FormResponse,
  FormSchema,
  FormSubmissionSchema,
} from '@hack4impact-utk/internal-models';
import { getFormById, getFormEntityById } from './forms';

export async function createFormQuestions(
  formId: string,
  formQuestions: CreateFormQuestionRequest[]
): Promise<FormQuestionEntity[] | null> {
  await dbConnect();

  const createdFormQuestions: FormQuestionEntity[] =
    await FormQuestionSchema.create(formQuestions);

  const formEntity: FormEntity | null = await getFormEntityById(formId);

  if (!formEntity) {
    return null;
  }

  const newQuestionIds = formEntity.questions.concat(
    createdFormQuestions.map((q) => q._id)
  );

  const response: FormEntity | null = await FormSchema.findByIdAndUpdate(
    formId,
    { questions: newQuestionIds }
  );

  // response will only be null if the form has been deleted since the start of this function execution
  if (!response) {
    await FormQuestionSchema.deleteMany({ _id: newQuestionIds });
    return null;
  }

  return createdFormQuestions;
}

export async function getFormQuestions(
  formId: string
): Promise<FormQuestionResponse[] | null> {
  const form: FormResponse | null = await getFormById(formId);

  if (!form) {
    return null;
  }

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

  form?.submissions.forEach(async (submission) => {
    submission.questionResponses = submission.questionResponses.filter(
      (questionResponse) =>
        questionResponse.question._id.toString() !== formQuestionId
    );
    const newSubmissionQuestionResponses = submission.questionResponses.filter(
      (qRes) => qRes.question._id.toString() !== formQuestionId
    );

    const convertedSubmissionQuestionResponses =
      newSubmissionQuestionResponses.map((questionResponse) => {
        return {
          question: questionResponse.question._id,
          answer: questionResponse.answer,
        };
      });

    await FormSubmissionSchema.findByIdAndUpdate({
      _id: submission._id,
      questionResopnses: convertedSubmissionQuestionResponses,
    });
  });

  await FormSchema.findByIdAndUpdate(
    { _id: formId },
    { questions: newQuestionIds }
  );
}
