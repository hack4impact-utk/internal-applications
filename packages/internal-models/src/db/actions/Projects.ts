import { ProjectSchema } from '../models';

export async function getAllProjects() {
  const projects = await ProjectSchema.find({});
  return projects;
}
