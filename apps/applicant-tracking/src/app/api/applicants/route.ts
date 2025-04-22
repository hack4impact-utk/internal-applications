import dbConnect from "@/utils/db-connect";
import { NextResponse } from "next/server";
import { getApplicants } from "@hack4impact-utk/internal-models/src/db/actions";


// GET all applicants API endpoint that gets all forms in the database
export async function GET (request: Request) { 
    await dbConnect()

    // Call the getApplicants function
    const applicants = getApplicants()

    // Return the forms by calling return NextResponse.json([applicants], { status: [status code] })
    if (!applicants) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Successful
    return NextResponse.json([applicants], {status: 200})
    

}