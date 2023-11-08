import dbConnect from '@/utils/db-connect';
import { getFormById } from './forms';
import { FormSubmissionSchema, FormSchema } from '@shared/db/models';
import {
  CreateFormSubmissionRequest,
  FormSubmission,
  FormSubmissionResponse,
  FormResponse,
} from '@shared/types';

export async function createFormSubmission(
  formId: string,
  formSubmission: CreateFormSubmissionRequest
) {
  await dbConnect();

  const createdFormSubmission: FormSubmission =
    await FormSubmissionSchema.create(formSubmission);

  const castedFormSubmission = createdFormSubmission as FormSubmissionResponse;

  const form: FormResponse | null = await getFormById(formId);

  const formSubmissionId = castedFormSubmission._id;

  const existingSubmissionIds = form?.submissions.map((q) => q._id);

  if (form != null) {
    const res: FormResponse | null = await FormSchema.findByIdAndUpdate(
      { _id: formId },
      { submissions: existingSubmissionIds?.concat(formSubmissionId) }
    );
    return castedFormSubmission;
  }
  return null;
}

export async function getFormSubmissions(
  formId: string
): Promise<FormSubmission[] | null> {
  const formResponse: FormResponse | null = await getFormById(formId);

  if (!formResponse) {
    return null;
  }

  return formResponse.submissions;
}
