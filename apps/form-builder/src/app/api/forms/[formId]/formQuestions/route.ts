import { getFormQuestions } from '@/server/actions/formQuestions';
import { zObjectId } from '@hack4impact-utk/internal-models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { formId: string } }
) {
    const idChecker = zObjectId.safeParse(params.formId)
    if(idChecker.success === true){
        const response = await getFormQuestions(params.formId)
        if(response === null){
            return NextResponse.json({message: "Form not found!"} , {status: 404})
        }
        return NextResponse.json(response, { status: 200 })
    } else{
        return NextResponse.json({message: "Invalid formId"}, {status: 400})
    } 
}