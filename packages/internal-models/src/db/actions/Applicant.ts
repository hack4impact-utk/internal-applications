import ApplicantSchema from '../models/Applicant';
import {
  ApplicantDecision,
  ApplicantStatus,
  DashboardListApplicantResponse,
} from '@/types';
import dbConnect from  '../../../../../apps/applicant-tracking/src/utils/db-connect'

export async function getApplicantsByStatus(statuses: ApplicantStatus[]) {
  const applicants: DashboardListApplicantResponse[] =
    await ApplicantSchema.find({
      status: { $in: statuses },
    }).select({ firstName: 1, lastName: 1, status: 1, statusUpdatedAt: 1 });
  return applicants;
}

export async function getApplicantById(id: string) {
  try {
    await dbConnect();
    const result = await ApplicantSchema.findById(id);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getApplicants() {
  const applicant = await ApplicantSchema.find({});
  return applicant;
}

export async function deleteApplicant(id: string) {
  await ApplicantSchema.findByIdAndDelete(id);
}

export async function updateApplicantInterviewInfo(
  id: string,
  time: Date,
  link: string
) {
  // update database
  const applicant = await ApplicantSchema.findOneAndUpdate(
    { _id: id },
    { interviewTime: time, interviewMeetingLink: link },
    { new: true }
  );

  // return  newly updated applicant
  return applicant;
}

export async function updateApplicantStatus(
  id: string,
  status: ApplicantStatus
) {
  // update database
  const applicant = await ApplicantSchema.findOneAndUpdate(
    { _id: id },
    { status: status, statusUpdatedAt: new Date() },
    { new: true }
  );

  // return  newly updated applicant
  return applicant;
}

export async function makeDecisionForApplicant(
  id: string,
  decision: ApplicantDecision,
  reason?: string
) {
  // update database
  const applicant = await ApplicantSchema.findOneAndUpdate(
    { _id: id },
    { decision: decision, decisionReason: reason, status: 'Decision Made' },
    { new: true }
  );

  // return  newly updated applicant
  return applicant;
}
