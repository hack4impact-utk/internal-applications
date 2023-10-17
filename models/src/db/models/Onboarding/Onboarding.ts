import { Onboarding } from '@/types/onboarding/onboarding';
import { Document, Model, Schema, model, models } from 'mongoose';

const OnboardingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    steps: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type OnboardingDocument = Omit<Onboarding, '_id'> & Document;

export default (models.Onboarding as Model<OnboardingDocument>) ||
  model<OnboardingDocument>('Onboarding', OnboardingSchema);
