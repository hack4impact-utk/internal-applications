import { createForm } from '@/server/actions/forms';
import { zCreateFormRequest } from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';
import { getAllForms } from '@/server/actions/forms';

export async function GET(): Promise<NextResponse> {
  const forms = await getAllForms();
  return NextResponse.json(forms, { status: 200 });
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validationResult = zCreateFormRequest.safeParse(requestBody);
  if (validationResult.success) {
    const form = await createForm(requestBody);

    return NextResponse.json({ _id: form._id }, { status: 201 });
  } else {
    return NextResponse.json(
      { message: 'Input was not in correct format' },
      { status: 400 }
    );
  }
}
