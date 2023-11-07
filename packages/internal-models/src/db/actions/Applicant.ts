import ApplicantSchema from '@/db/models/Applicant'

export async function getApplicantById(id: string) {
  try {
    const result = await ApplicantSchema.find({netid: id });
    return result;
  } catch (error) {
    throw error;
  }
}


