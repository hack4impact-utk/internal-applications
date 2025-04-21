import { z } from "zod";
import { TeamRole } from "../teamMember";
import zOnboarding from "./onboarding";

export const zRoleOnboarding = z.object({
  //role: TeamRole, //sooooo many dependency loops
  onboardings: z.array(zOnboarding),
});

export interface RoleOnboarding extends z.infer<typeof zRoleOnboarding> {}

export default zRoleOnboarding;
