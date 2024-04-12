import { urls } from "@/utils/constants";
import ValidationError from "@/utils/errors/validation-error";
import { zApplicantResponse } from "@hack4impact-utk/internal-models";
import { zDashboardListApplicantResponse } from "@hack4impact-utk/internal-models";
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

  async getAllActionable() {
    const response = await fetch(urls.api.getAllActionableApplicants);
    const data = await response.json();

    const validationResult = z.array(zDashboardListApplicantResponse).safeParse(data);
    if (validationResult.success) {
      return validationResult.data;
    }

    throw new ValidationError("ApplicantService.getAllActionable")
  }
}

export default ApplicantApiService