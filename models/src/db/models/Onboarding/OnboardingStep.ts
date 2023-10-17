import { OnboardingStep } from '@/types/onboarding/onboardingStep';
import { Document, Model, Schema, model, models } from 'mongoose';

const OnboardingStepSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type OnboardingStepDocument = Omit<OnboardingStep, '_id'> & Document;

export default (models.OnboardingStep as Model<OnboardingStepDocument>) ||
  model<OnboardingStepDocument>('OnboardingStep', OnboardingStepSchema);
