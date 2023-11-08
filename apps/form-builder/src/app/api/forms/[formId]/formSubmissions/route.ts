import { createFormSubmission } from '@/server/actions/formSubmissions';
import { zCreateFormSubmissionRequest, zObjectId } from '@shared/types';
import { NextRequest, NextResponse } from 'next/server';

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
