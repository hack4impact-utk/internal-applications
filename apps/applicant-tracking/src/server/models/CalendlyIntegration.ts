import {
  CalendlyIntegrationEntity,
  calendlyIntegrationStatuses,
} from '@/types/calendly-integration';
import { Model, Schema, model, models } from 'mongoose';

const CalendlyIntegrationSchema = new Schema(
  {
    webhookUri: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: calendlyIntegrationStatuses,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type CalendlyIntegrationDocument = Omit<
  CalendlyIntegrationEntity,
  '_id'
> &
  Document;

export default (models.CalendlyIntegration as Model<CalendlyIntegrationDocument>) ||
  model<CalendlyIntegrationDocument>(
    'CalendlyIntegration',
    CalendlyIntegrationSchema,
    'calendly_integrations'
  );
