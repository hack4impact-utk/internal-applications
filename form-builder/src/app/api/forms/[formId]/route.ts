import { NextRequest, NextResponse } from 'next/server';
import { getFormById } from '../route';
import { FormResponse } from '@hack4impact-utk/internal-models';
import { deleteForm } from '@/server/actions/forms';

export async function GET(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const form: FormResponse | null = await getFormById(params.formId);
  return NextResponse.json(form);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
  await deleteForm(params.formId);
  return new NextResponse(undefined, { status: 204 });
}
