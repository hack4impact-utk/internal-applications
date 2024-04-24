import TeamSchema from '@/db/models/Team';

export async function getAllTeams() {
  const teams = await TeamSchema.find({});
  return teams;
}
