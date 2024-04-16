// Server function to retrieve all projects from database

import ProjectSchema from '@/db/models/Project';

export async function getAllProjects() {
  const projects = await ProjectSchema.find({});
  return projects;
}
