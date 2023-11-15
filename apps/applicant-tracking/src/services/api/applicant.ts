import { urls } from "@/utils/constants";
import ValidationError from "@/utils/errors/validation-error";
import { zApplicantResponse } from "@hack4impact-utk/internal-models";
import { z } from "zod";

class ApplicantApiService {
  async get(id: string) {
    const response = await fetch(urls.api.getApplicant(id));
    const data = await response.json();

    const validationResult = zApplicantResponse.safeParse(data);
    if (validationResult.success) {
      return validationResult.data;
    }

    throw new ValidationError("ApplicantService.get")
  }

  // Get all applicants
  async getAll(){
    const response = await fetch(urls.api.getAllApplicants);
    
    // Returning array of applicants
    const data = await response.json();
    const validationResult = z.array(zApplicantResponse).safeParse(data);

    if (validationResult.success) {
        return validationResult.data;
    }

    // Returns the error
    throw new ValidationError("ApplicantService.getAll")

}
}

export default ApplicantApiService