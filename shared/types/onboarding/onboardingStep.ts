import { z } from "zod";
import zBase from "../base";

export const zOnboardingStep = zBase.extend({
  title: z.string(),
  description: z.string().optional(),
});

export interface OnboardingStep extends z.infer<typeof zOnboardingStep> {}

export default zOnboardingStep;
