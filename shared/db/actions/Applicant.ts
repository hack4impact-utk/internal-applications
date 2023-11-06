import ApplicantSchema from '@/db/models/Applicant';

export async function deleteApplicant(id: string) {
  await ApplicantSchema.findByIdAndDelete(id);
}
