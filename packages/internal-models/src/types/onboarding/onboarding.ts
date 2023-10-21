import { z } from "zod";
import zBase from "../base";
import zOnboardingStep from "./onboardingStep";

export const zOnboarding = zBase.extend({
  title: z.string(),
  description: z.string().optional(),
  steps: z.array(zOnboardingStep),
});

export interface Onboarding extends z.infer<typeof zOnboarding> {}

export default zOnboarding;
