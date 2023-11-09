import dbConnect from '@/utils/db-connect';
import {
  CreateFormRequest,
  Form,
  FormQuestionSchema,
  FormResponse,
  FormSchema,
  FormSubmissionSchema,
} from '@hack4impact-utk/internal-models';

export async function createForm(form: CreateFormRequest): Promise<FormResponse> {
  await dbConnect();

  const response: Form = await FormSchema.create(form);

  return response as FormResponse;
}

export async function getAllForms(): Promise<FormResponse[]> {
  await dbConnect();

  const allForms: FormResponse[] = await FormSchema.find()
    .populate('questions')
    .populate({
      path: 'submissions',
      populate: { path: 'questionResponses.question' },
    });

  return allForms;
}

export async function getFormById(id: string): Promise<FormResponse | null> {
  await dbConnect();

  const form: FormResponse | null = await FormSchema.findById(id)
    .populate('questions')
    .populate({
      path: 'submissions',
      populate: { path: 'questionResponses.question' },
    });

  return form;
}

export async function deleteForm(formId: string): Promise<Form | null> {
  await dbConnect()

  const form: Form | null = await FormSchema.findByIdAndDelete(formId)

  await FormQuestionSchema.deleteMany({
    _id: { $in: form?.questions }
  })

  await FormSubmissionSchema.deleteMany({
    _id: { $in: form?.submissions }
  })

  return form
}