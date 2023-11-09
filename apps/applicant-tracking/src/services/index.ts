import ApplicantApiService from "./api/applicant";
import { CalendlyApiService } from "./api/calendly";

export const ApplicantService = new ApplicantApiService()
export const CalendlyService = new CalendlyApiService(process.env.CALENDLY_PAT)