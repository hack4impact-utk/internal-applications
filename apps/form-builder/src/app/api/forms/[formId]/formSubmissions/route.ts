// function to get all form submisions
import { getFormSubmissions } from "@/server/actions/formSubmissions";
import { NextRequest, NextResponse } from "next/server";
import { zObjectId } from '@hack4impact-utk/internal-models';

export async function GET (_request: NextRequest, { params }: { params: { formId: string } }) {
    // if formId is valid, get form submissions and return them with status code 200, if formSubmissions is null return status code 404 with error message
    if(zObjectId.safeParse(params.formId).success) {
        const formSubmissions = await getFormSubmissions(params.formId)
        if (formSubmissions === null)
            return NextResponse.json({message: "form not found"}, {status: 404})
        return NextResponse.json(formSubmissions, { status: 200 })
    }
}