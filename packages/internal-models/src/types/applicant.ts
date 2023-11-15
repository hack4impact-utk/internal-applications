import { z } from 'zod';
import { zFormSubmissionResponse, zObjectId, zTerm } from '.';
import zBase from './base';
import zFormSubmission from './FormBuilder/formSubmission';

export const applicantStatuses = [
  'Pending Review',
  'Scheduling Interview',
  'Interview Scheduled',
  'Interview Complete',
  'Decision Made',
] as const;
export const zApplicantStatus = z.enum(applicantStatuses);
export type ApplicantStatus = z.infer<typeof zApplicantStatus>;

export const applicantDecisions = [
  'Accepted',
  'Waitlisted',
  'Rejected'
] as const;
export const zApplicantDecision = z.enum(applicantDecisions);
export type ApplicantDecision = z.infer<typeof zApplicantDecision>;

const zApplicant = z.object({
  firstName: z.string(),
  lastName: z.string(),
  netid: z.string(),
  term: zTerm,
  referrer: z.string().optional(),
  major: z.string(),
  expectedGraduation: zTerm,
  linkedinUrl: z.string().url().optional(),
  status: zApplicantStatus,
  interviewTime: z.date().optional(),
  interviewMeetingLink: z.string().url().optional(),
  noShowCount: z.number().optional(),
  decision: zApplicantDecision.optional(),
  resumeUrl: z.string().url().optional(),
  notes: z.string().optional(),
  application: zFormSubmission, // TODO: figure out verification
  evaluation: zFormSubmission.optional(),
  statusUpdatedAt: z.date().optional(),
});

export const zApplicantEntity = zApplicant.extend({
  ...zBase.shape,
  application: zObjectId,
  evalutation: zObjectId,
});

export const zCreateApplicantRequest = zFormSubmissionResponse;
export const zUpdateApplicantStatusRequest = zApplicant.pick({
  status: true,
});

export const zApplicantResponse = zApplicantEntity.extend({
  application: zFormSubmissionResponse,
  evaluation: zFormSubmissionResponse,
});
export const zDashboardListApplicantResponse = zApplicantResponse
  .pick({
    _id: true,
    firstName: true,
    lastName: true,
    status: true,
    statusUpdatedAt: true,
  })
  .required();

export interface Applicant extends z.infer<typeof zApplicant> {}
export interface ApplicantEntity extends z.infer<typeof zApplicantEntity> {}

export interface ApplicantResponse extends z.infer<typeof zApplicantResponse> {}
export interface DashboardListApplicantResponse
  extends z.infer<typeof zDashboardListApplicantResponse> {}

export default zApplicant;