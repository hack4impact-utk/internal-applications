import {
  deleteFormQuestion,
  getFormQuestions,
} from '@/server/actions/formQuestions';
import { createFormQuestions } from '@/server/actions/formQuestions';
import { createForm } from '@/server/actions/forms';
import {
  zCreateFormRequest,
  CreateFormRequest,
  CreateFormQuestionRequest,
  zCreateFormQuestionRequest,
} from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  await deleteFormQuestion(params.formId, '6537698b9b22b73324b14527');

  const requestBody = await request.json();
  const validateResult = z
    .array(zCreateFormQuestionRequest)
    .safeParse(requestBody);

  if (validateResult.success) {
    const entity: CreateFormQuestionRequest[] = requestBody;

    // const b = await createFormQuestions(params.formId, entity);

    return NextResponse.json({}, { status: 200 });
  } else {
    return new NextResponse(undefined, { status: 400 });
  }
}
