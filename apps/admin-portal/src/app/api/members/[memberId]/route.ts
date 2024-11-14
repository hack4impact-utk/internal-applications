import dbConnect from '@/utils/db-connect';
import { NextResponse } from 'next/server';
import { getAllMembers } from '@hack4impact-utk/internal-models';

// GET members API endpoint for getting member data
export async function GET() {
  await dbConnect();

  const members = getAllMembers();

  // Returns 'Error' if error with accessing database
  if (!members) {
    return NextResponse.json({ error: 'Error' }, { status: 404 });
  }

  return NextResponse.json([members], { status: 200 });
}
