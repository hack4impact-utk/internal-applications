import dbConnect from '@/utils/db-connect';
import {
  CreateFormRequest,
  FormEntity,
  FormQuestionSchema,
  FormResponse,
  FormSchema,
  FormSubmissionSchema,
} from '@hack4impact-utk/internal-models';

export async function createForm(form: CreateFormRequest): Promise<FormEntity> {
  await dbConnect();

  const response: FormEntity = await FormSchema.create(form);

  return response;
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

export async function getFormEntityById(id: string): Promise<FormEntity | null> {
  await dbConnect();

  const form: FormEntity | null = await FormSchema.findById(id);

  return form;
}

export async function deleteForm(formId: string): Promise<boolean> {
  await dbConnect()

  const form: FormEntity | null = await FormSchema.findByIdAndDelete(formId)

  if (!form) {
    return false
  }

  await FormQuestionSchema.deleteMany({
    _id: { $in: form?.questions }
  })

  await FormSubmissionSchema.deleteMany({
    _id: { $in: form?.submissions }
  })

  return true;
}