import { Project, projectStatuses } from '@/types/project';
import { Document, Model, Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: projectStatuses,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deployUrl: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type ProjectDocument = Omit<Project, '_id'> & Document;
export default (models.Project as Model<ProjectDocument>) ||
  model<ProjectDocument>('Project', ProjectSchema);
