import NewFormQuestion from '@/components/NewFormQuestion/NewFormQuestion';
import {
  createFormQuestions,
  getFormQuestions,
} from '@/server/actions/formQuestions';
import { createForm } from '@/server/actions/forms';
import dbConnect from '@/utils/db-connect';
import {
  zCreateFormQuestionRequest,
  zObjectId,
} from '@hack4impact-utk/internal-models';
import { requestToBodyStream } from 'next/dist/server/body-streams';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const idChecker = zObjectId.safeParse(params.formId);
  if (idChecker.success === true) {
    const response = await getFormQuestions(params.formId);
    if (response === null) {
      return NextResponse.json({ message: 'Form not found!' }, { status: 404 });
    }
    return NextResponse.json(response, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid formId' }, { status: 400 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const formId = params.formId;
  await dbConnect();
  const requestValue = await request.json();

  if (!z.array(zCreateFormQuestionRequest).safeParse(requestValue)) {
    return NextResponse.json({}, { status: 400 });
  }

  if (!zObjectId.safeParse(formId)) {
    return NextResponse.json({}, { status: 404 });
  }

  createFormQuestions(formId, requestValue);

  return NextResponse.json({}, { status: 201 });
}
