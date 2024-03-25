import ApplicantSchema from '@/db/models/Applicant';
import { ApplicantStatus } from '@/types';

export async function getApplicantById(id: string) {
  try {
    const result = await ApplicantSchema.find({ _id: id });
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
