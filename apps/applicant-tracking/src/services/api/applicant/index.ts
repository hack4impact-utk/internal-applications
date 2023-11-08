import { urls } from '@/utils/constants/urls';
import { zApplicantResponse } from '@shared/types';

class ApiApplicantService {
  async get(id: string) {
    const response = await fetch(urls.api.getApplicant(id));
    const data = await response.json();

    const validationResult = zApplicantResponse.safeParse(data);
    if (validationResult.success) {
      return validationResult.data;
    }

    return null;
  }
}

export default ApiApplicantService;
