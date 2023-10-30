import { createForm } from "@/server/actions/forms";
import { zCreateFormRequest } from "@hack4impact-utk/internal-models";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) { 

    
    const requestBody = await request.json();
    const variable = zCreateFormRequest.safeParse(requestBody);
    if (variable.success) {
        const form = await createForm(requestBody);
        
        
        return NextResponse.json({_id:form._id}, {status: 201})
    }
    else {
        return NextResponse.json({}, {status: 400})
    }



}
