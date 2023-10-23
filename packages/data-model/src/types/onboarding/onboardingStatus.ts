import { z } from 'zod';
import zOnboarding from './onboarding';
import zOnboardingStepStatus from './onboardingStepStatus';

export const zOnboardingStatus = z.object({
  onboarding: zOnboarding,
  steps: z.array(zOnboardingStepStatus),
  completed: z.boolean(),
});

export type OnboardingStatus = z.infer<typeof zOnboardingStatus>;

export default zOnboardingStatus;
