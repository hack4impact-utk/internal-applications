import { TeamMember, teamRoles } from '@/types';
import { Document, Model, Schema, model, models } from 'mongoose';

const TeamMemberSchema = new Schema(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    terms: {
      type: [String],
      required: true,
    },
    role: {
      type: String,
      enum: teamRoles,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type TeamMemberDocument = Omit<TeamMember, '_id'> & Document;
export default (models.TeamMember as Model<TeamMemberDocument>) ||
  model<TeamMemberDocument>('TeamMember', TeamMemberSchema);
