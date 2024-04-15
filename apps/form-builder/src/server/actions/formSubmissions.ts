import dbConnect from '@/utils/db-connect';
import {
  CreateFormSubmissionRequest,
  FormResponse,
  FormSchema,
  FormSubmission,
  FormSubmissionResponse,
  FormSubmissionSchema,
} from '@hack4impact-utk/internal-models';
import { getFormById } from './forms';

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
