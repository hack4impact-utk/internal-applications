import dbConnect from '@/utils/db-connect';
import NextResponse from 'next/server';

export async function GET() {
  await dbConnect();

  NextResponse.json([memberId], { status: [status code] });

  return 'OK 200';
}
