import ApplicantSchema from '@/db/models/Applicant';

export async function getApplicants() { 
  const applicant = await ApplicantSchema.find();
  return applicant;
 }

export async function deleteApplicant(id: string) {
  await ApplicantSchema.findByIdAndDelete(id);
}
