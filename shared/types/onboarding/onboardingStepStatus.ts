import { z } from "zod";
import zOnboardingStep from "./onboardingStep";

export const zOnboardingStepStatus = z.object({
  step: zOnboardingStep,
  completed: z.boolean(),
});

export interface OnboardingStepStatus
  extends z.infer<typeof zOnboardingStepStatus> {}

export default zOnboardingStepStatus;
