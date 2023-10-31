import dbConnect from "@/utils/db-connect";
import { deleteApplicant, zObjectId } from "@hack4impact-utk/internal-models";
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
//smegma

}