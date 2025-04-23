import dbConnect from "@/utils/db-connect";
import { deleteApplicant, getApplicantById } from "@hack4impact-utk/internal-models/src/db/actions";
import { zObjectId } from "@hack4impact-utk/internal-models/src/types";
import { NextRequest, NextResponse } from "next/server";

// @route DELETE /api/applicants/[applicantId] - Deletes an applicant
export async function DELETE (request: NextRequest, 
    { params }: { params: { applicantId: string } }) 
{

await dbConnect();

const applicantId = params.applicantId

const validationResult = zObjectId.safeParse(applicantId)

if(!validationResult.success){
    return NextResponse.json({message: "Invalid ID"}, { status: 400 })
}

await deleteApplicant(applicantId)
return new NextResponse(undefined, { status: 204 })

}

export async function GET (request: NextRequest, 
    { params }: { params: { applicantId: string } }) 
{

await dbConnect();

const applicantId = params.applicantId

const validationResult = zObjectId.safeParse(applicantId)

if(!validationResult.success){
    return NextResponse.json({message: "Invalid ID"}, { status: 400 })
}

const applicant = await getApplicantById(applicantId)
if(!applicant){
    return NextResponse.json({message: "Applicant not found"}, { status: 404 })
}
return NextResponse.json({applicant}, { status: 200 })

}