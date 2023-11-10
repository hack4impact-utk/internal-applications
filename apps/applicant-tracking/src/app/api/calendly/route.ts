import {
  getCalendlyIntegration,
  replaceOrCreateCalendlyIntegration,
} from '@/server/actions/CalendlyIntegration';
import dbConnect from '@/utils/db-connect';
import { NextResponse } from 'next/server';

// @route GET /api/calendly - Gets the calendly integration
export async function GET() {
  await dbConnect();

  const result = await getCalendlyIntegration();

  if (!result) {
    return NextResponse.json(
      { message: 'Calendly integration not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(result, { status: 200 });
}

// @route POST /api/calendly - Creates or replaces a calendly integration
export async function POST() {
  await dbConnect();

  const result = await replaceOrCreateCalendlyIntegration();

  if (!result) {
    return NextResponse.json(
      { message: 'Error creating integration' },
      { status: 500 }
    );
  }

  return NextResponse.json(result, { status: 200 });
}
