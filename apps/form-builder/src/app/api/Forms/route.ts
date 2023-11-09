import dbConnect from '@/utils/db-connect';
import { getAllForms } from '@/server/actions/forms';
import { NextResponse } from 'next/server';

//import something for getForms()

export async function GET (): Promise<NextResponse> {
  await dbConnect();
  const forms = getAllForms();
  return NextResponse.json(forms, { status: 200})
}