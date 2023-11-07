import { z } from 'zod';
import { zFormSubmissionResponse, zTerm } from '.';

export const applicantStatuses = [
  'Pending Review',
  'Scheduling Interview',
  'Interview Scheduled',
  'Interview Complete',
  'Decision Made',
] as const;
export const zApplicantStatus = z.enum(applicantStatuses);

export const applicantDecisions = [
  'LBP',
  'Developer',
  'Designer',
  'Project Sourcing',
  'Talent Development',
  'Rejected',
] as const;
export const zApplicantDecision = z.enum(applicantDecisions);

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
  application: zFormSubmissionResponse, // TODO: figure out verification
  evaluation: zFormSubmissionResponse.optional(),
});

export const zCreateApplicantRequest = zFormSubmissionResponse;

export type Applicant = z.infer<typeof zApplicant>;
