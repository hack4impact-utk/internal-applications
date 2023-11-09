import ApplicantSchema from '@/db/models/Applicant'

export async function getApplicantById(id: string) {
  try {
    const result = await ApplicantSchema.find({_id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteApplicant(id: string) {
  await ApplicantSchema.findByIdAndDelete(id);
}