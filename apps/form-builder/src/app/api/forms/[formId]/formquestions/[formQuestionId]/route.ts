import { deleteFormQuestion } from '@/server/actions/formQuestions';
import { zObjectId } from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { formId: string; formQuestionId: string } }
) {
  const formId = params.formId;
  const formQuestionId = params.formQuestionId;

  const validationResult = zObjectId.safeParse(formId);
  const formQuestionValidation = zObjectId.safeParse(formQuestionId);

  if (!formQuestionValidation.success || !validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }

  const response = await deleteFormQuestion(formId, formQuestionId);

  if (response === null) {
    return NextResponse.json({ message: 'form not found' }, { status: 404 });
  }

  return new NextResponse(undefined, { status: 204 });
}
