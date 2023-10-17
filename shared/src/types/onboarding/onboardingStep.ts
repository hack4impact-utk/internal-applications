import { z } from 'zod';
import zBase from '../base';

export const zOnboardingStep = zBase.extend({
  title: z.string(),
  description: z.string().optional(),
});

export type OnboardingStep = z.infer<typeof zOnboardingStep>;

export default zOnboardingStep;
