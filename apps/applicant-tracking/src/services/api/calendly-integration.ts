import {
  CalendlyIntegrationResponse,
  zCalendlyIntegrationResponse,
} from '@/types/calendly-integration';
import { urls } from '@/utils/constants';
import ValidationError from '@/utils/errors/validation-error';

class CalendlyIntegrationApiService {
  async get(): Promise<CalendlyIntegrationResponse> {
    const response = await fetch(urls.api.getCalendlyIntegration);
    const data = response.json();

    const validationResult = zCalendlyIntegrationResponse.safeParse(data);
    if (validationResult.success) {
      return validationResult.data;
    }

    throw new ValidationError('CalendlyIntegrationApiService.get');
  }

  async upsert(): Promise<boolean> {
    const response = await fetch(urls.api.upsertCalendlyIntegration, {
      method: 'POST',
    });

    if (response.status === 200) {
      return true;
    }
    return false;
  }
}

export default CalendlyIntegrationApiService;
