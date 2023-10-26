import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('GET Request Received!');

  // put whatever you want returned to postman or whatever is calling the api in place of the '{}'
  // If you want to change the status code, change the 200 to whatever you'd like
  // If you want to return a 204 status code, instead use: `return new NextResponse(undefined. { status:204 })`
  return NextResponse.json({}, { status: 200 });
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  console.log('POST Request Received!');
  console.log('The following content was provided in the request body');
  console.log(requestBody);

  // put whatever you want returned to postman or whatever is calling the api in place of the '{}'
  // If you want to change the status code, change the 200 to whatever you'd like
  // If you want to return a 204 status code, instead use: `return new NextResponse(undefined. { status:204 })`
  return NextResponse.json({}, { status: 200 });
}
