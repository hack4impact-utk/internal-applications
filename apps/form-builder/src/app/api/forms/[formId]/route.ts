import { deleteForm, getFormById } from '@/server/actions/forms';
import { zObjectId } from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const formId = params.formId;
  const validationResult = zObjectId.safeParse(formId);
  if (!validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }
  const response = await deleteForm(formId);
  if (response === null) {
    return NextResponse.json({ message: 'form not found' }, { status: 404 });
  }
  return new NextResponse(undefined, { status: 204 });
}
export async function GET(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const formId = params.formId;
  const validationResult = zObjectId.safeParse(formId);
  if (!validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }
  const response = await getFormById(formId);
  if (response === null) {
    return NextResponse.json({ message: 'form not found' }), { status: 404 };
  }
  return NextResponse.json(response, { status: 200 });
}
