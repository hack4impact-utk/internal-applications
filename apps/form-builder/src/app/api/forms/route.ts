import { getAllForms } from '@/server/actions/forms';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const forms = await getAllForms();
  return NextResponse.json(forms, { status: 200 });
}
