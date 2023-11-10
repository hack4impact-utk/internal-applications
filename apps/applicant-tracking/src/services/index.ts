import ApplicantApiService from './api/applicant';
import CalendlyIntegrationApiService from './api/calendly-integration';

const ApplicantService = new ApplicantApiService();
const CalendlyIntegrationService = new CalendlyIntegrationApiService();

export default { ApplicantService, CalendlyIntegrationService };
