import { Member, organizationRoles } from '@/types/member';
import { Document, Model, Schema, model, models } from 'mongoose';

const MemberSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    netid: {
      type: String,
      required: true,
    },
    pronouns: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    class: {
      type: Number,
      required: true,
    },
    preferredName: {
      type: String,
      required: false,
    },
    githubUsername: {
      type: String,
      required: false,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
    confirmedAt: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    activeTerms: {
      type: [
        {
          term: {
            type: String,
            required: true,
          },
          orgRole: {
            type: String,
            enum: organizationRoles,
            required: true,
          },
        },
      ],
      required: true,
    },
    teams: {
      type: [Schema.Types.ObjectId],
      ref: 'Team',
      required: true,
    },
    onboardings: {
      type: [
        {
          onboarding: {
            type: Schema.Types.ObjectId,
            ref: 'Onboarding',
            required: true,
          },
          steps: {
            type: [
              {
                step: {
                  type: Schema.Types.ObjectId,
                  ref: 'OnboardingStep',
                  required: true,
                },
                completed: {
                  type: Boolean,
                  required: true,
                },
              },
            ],
            required: true,
          },
          completed: {
            type: Boolean,
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

MemberSchema.index({ netid: 1 }, { unique: true });

export type MemberDocument = Omit<Member, '_id'> & Document;

export default (models.Member as Model<MemberDocument>) ||
  model<MemberDocument>('Member', MemberSchema);
