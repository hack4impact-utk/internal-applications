import dbConnect from '@/utils/db-connect';
import {
  CreateFormSubmissionRequest,
  FormEntity,
  FormResponse,
  FormSchema,
  FormSubmissionEntity,
  FormSubmissionResponse,
  FormSubmissionSchema,
} from '@hack4impact-utk/internal-models';
import { getFormById, getFormEntityById } from './forms';

export async function createFormSubmission(
  formId: string,
  formSubmission: CreateFormSubmissionRequest
): Promise<FormSubmissionEntity | null> {
  await dbConnect();

  const form: FormEntity | null = await getFormEntityById(formId);

  if (!form) {
    return null;
  }

  const createdFormSubmission: FormSubmissionEntity =
    await FormSubmissionSchema.create(formSubmission);

  const submissionIds = form.submissions.concat(createdFormSubmission._id);

  const response = await FormSchema.findByIdAndUpdate(formId, {
    submissions: submissionIds,
  });

  if (!response) {
    FormSubmissionSchema.findByIdAndDelete(createdFormSubmission._id);
    return null;
  }

  return createdFormSubmission;
}

export async function getFormSubmissions(
  formId: string
): Promise<FormSubmissionResponse[] | null> {
  const formResponse: FormResponse | null = await getFormById(formId);

  if (!formResponse) {
    return null;
  }

  return formResponse.submissions;
}
