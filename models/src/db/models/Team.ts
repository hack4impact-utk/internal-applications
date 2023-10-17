import { teamRoles } from '@/types';
import { Team } from '@/types/team';
import { Document, Model, Schema, model, models } from 'mongoose';

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    terms: {
      type: [String],
      required: true,
    },
    alwaysActive: {
      type: Boolean,
      required: true,
    },
    confirmedAt: {
      type: Date,
      required: true,
    },
    vaultWardenUrl: {
      type: String,
      required: false,
    },
    notionUrl: {
      type: String,
      required: false,
    },
    githubUrl: {
      type: String,
      required: false,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'Member',
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
    onboardings: {
      type: [
        {
          role: {
            type: String,
            enum: teamRoles,
            required: true,
          },
          onboardings: {
            type: [Schema.Types.ObjectId],
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export type TeamDocument = Omit<Team, '_id'> & Document;

export default (models.Team as Model<TeamDocument>) ||
  model<TeamDocument>('Team', TeamSchema);
