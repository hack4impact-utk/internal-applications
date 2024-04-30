// Create server function that retrieves all the projects from the database

import ProjectSchema from '@/db/models/Project';

export async function getAllProjects() {
  const projects = await ProjectSchema.find({});
  return projects;
}
