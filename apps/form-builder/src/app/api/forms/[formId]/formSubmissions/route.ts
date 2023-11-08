// function to get all form submisions
import {
  createFormSubmission,
  getFormSubmissions,
} from '@/server/actions/formSubmissions';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateFormSubmissionRequest, zObjectId } from '@shared/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
  // if formId is valid, get form submissions and return them with status code 200, if formSubmissions is null return status code 404 with error message
  if (zObjectId.safeParse(params.formId).success) {
    const formSubmissions = await getFormSubmissions(params.formId);
    if (formSubmissions === null)
      return NextResponse.json({ message: 'form not found' }, { status: 404 });
    return NextResponse.json(formSubmissions, { status: 200 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const requestBody = await request.json();

  const validationResult = zCreateFormSubmissionRequest.safeParse(requestBody);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: validationResult.error },
      { status: 400 }
    );
  }

  if (!zObjectId.safeParse(params.formId).success) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const result = await createFormSubmission(params.formId, requestBody);
  if (!result) {
    return NextResponse.json({ message: 'FormID not found' }, { status: 404 });
  }

  return NextResponse.json({ _id: result?._id }, { status: 201 });
}
