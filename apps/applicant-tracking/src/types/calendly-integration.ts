import { zBase } from '@hack4impact-utk/internal-models';
import { z } from 'zod';

export const calendlyIntegrationStatuses = ['active', 'disabled'] as const;
export const zCalendlyIntegrationStatus = z.enum(calendlyIntegrationStatuses);

const zCalendlyIntegration = z.object({
  webhookUri: z.string().url(),
  status: zCalendlyIntegrationStatus,
});

export const zCalendlyIntegrationEntity = zCalendlyIntegration.extend(
  zBase.shape
);

export const zUpsertCalendlyIntegrationRequest = zCalendlyIntegration;

export const zCalendlyIntegrationResponse = zCalendlyIntegrationEntity;

export interface CalendlyIntegration
  extends z.infer<typeof zCalendlyIntegration> {}
export interface CalendlyIntegrationEntity
  extends z.infer<typeof zCalendlyIntegrationEntity> {}
export interface UpsertCalendlyIntegrationRequest
  extends z.infer<typeof zUpsertCalendlyIntegrationRequest> {}
export interface CalendlyIntegrationResponse
  extends z.infer<typeof zCalendlyIntegrationResponse> {}

export default zCalendlyIntegration;
