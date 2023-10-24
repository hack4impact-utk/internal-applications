import { createForm } from '@/server/actions/forms';
import dbConnect from '@/utils/db-connect';
import {
  CreateFormRequest,
  Form,
  FormResponse,
  FormSchema,
  zCreateFormRequest,
} from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validateResult = zCreateFormRequest.safeParse(requestBody);

  if (validateResult.success) {
    const entity: CreateFormRequest = requestBody;

    const b = await createForm(entity);

    return NextResponse.json(b, { status: 200 });
  } else {
    return NextResponse.json(undefined, { status: 400 });
  }
}

export async function GET() {
  const res = await getAllForms();

  return NextResponse.json(res);
}

async function getAllForms(): Promise<FormResponse[]> {
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
