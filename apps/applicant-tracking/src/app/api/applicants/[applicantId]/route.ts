import dbConnect from '@/utils/db-connect';
import {
  deleteApplicant,
  getApplicantById,
  zObjectId,
} from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';

// @route DELETE /api/applicants/[applicantId] - Deletes an applicant
export async function DELETE(
  request: NextRequest,
  { params }: { params: { applicantId: string } }
) {
  await dbConnect();

  const applicantId = params.applicantId;

  const validationResult = zObjectId.safeParse(applicantId);

  if (!validationResult.success) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  await deleteApplicant(applicantId);
  return new NextResponse(undefined, { status: 204 });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { applicantId: string } }
) {
  await dbConnect();

  const applicantId = params.applicantId;

  const validationResult = zObjectId.safeParse(applicantId);

  if (!validationResult.success) {
    return new NextResponse('Invalid applicant ID', { status: 400 });
  }

  const applicant = await getApplicantById(applicantId);
  if (!applicant) {
    return new NextResponse('Applicant not found', { status: 404 });
  }

  return NextResponse.json(applicant, { status: 200 });
}
