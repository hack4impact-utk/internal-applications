import urls from "@/utils/constants/urls";
import ValidationError from "@/utils/errors/validation-error";
import { zApplicantResponse } from "@hack4impact-utk/internal-models";

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
}

export default ApplicantApiService