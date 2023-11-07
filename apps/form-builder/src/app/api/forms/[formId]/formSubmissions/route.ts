// function to get all form submisions
import { getFormSubmissions } from "@/server/actions/formSubmissions";
import { NextRequest, NextResponse } from "next/server";
import { zObjectId } from '@hack4impact-utk/internal-models';

export async function GET (_request: NextRequest, { params }: { params: { formId: string } }) {
    // if formId is valid, get form submissions and return them with status code 200
    if(zObjectId.safeParse(params.formId).success) {
        const formSubmissions = getFormSubmissions(params.formId)
        return NextResponse.json(formSubmissions, { status: 200 })
    }
}