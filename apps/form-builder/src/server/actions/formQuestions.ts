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

export async function createFormQuestions(formId: string, formQuestions: CreateFormQuestionRequest[]): Promise<FormQuestionEntity[] | null> {
  await dbConnect();

  const createdFormQuestions: FormQuestionEntity[] = await FormQuestionSchema.create(formQuestions)

  const formEntity: FormEntity | null = await getFormEntityById(formId)

  if (!formEntity) {
    return null
  }

  const newQuestionIds = formEntity.questions.concat(createdFormQuestions.map(q => q._id))

  const response: FormEntity | null = await FormSchema.findByIdAndUpdate(formId, { questions: newQuestionIds })

  return createdFormQuestions;
}

// export async function createFormQuestions(
//   formId: string,
//   formQuestions: CreateFormQuestionRequest[]
// ): Promise<FormResponse | null> {
//   await dbConnect();

//   const createdFormQuestions: FormQuestion[] =
//     await FormQuestionSchema.create(formQuestions);

//   const castedFormQuestions = createdFormQuestions as FormQuestionResponse[];

//   const form: FormResponse | null = await getFormById(formId);

//   const formQuestionIds = castedFormQuestions.map(
//     (formQuestion) => formQuestion._id
//   );

//   const existingQuestionIds = form?.questions.map((q) => q._id);

//   if (form != null) {
//     const res: FormResponse | null = await FormSchema.findByIdAndUpdate(
//       { _id: formId },
//       { questions: existingQuestionIds?.concat(formQuestionIds) }
//     );
//     return res;
//   }
//   return null;
// }

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

  form?.submissions.forEach((submission) => {
    submission.questionResponses = submission.questionResponses.filter(
      (questionResponse) =>
        questionResponse.question._id.toString() !== formQuestionId
    );
    const newSubmissionQuestionResponses = submission.questionResponses.filter(
      (qRes) => qRes.question._id.toString() !== formQuestionId
    );

    const convertedSubmissionQuestionResponses: any =
      newSubmissionQuestionResponses.map((questionResponse) => {
        return {
          question: questionResponse.question._id,
          answer: questionResponse.answer,
        };
      });

    FormSubmissionSchema.findByIdAndUpdate({
      _id: submission._id,
      questionResopnses: convertedSubmissionQuestionResponses,
    });
  });

  await FormSchema.findByIdAndUpdate(
    { _id: formId },
    { questions: newQuestionIds }
  );
}
