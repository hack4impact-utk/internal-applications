import { z } from "zod";
import zBase from "./base";
import zTeamMember from "./teamMember";
import zTerm from "./term";
//import { zProject } from "./project";
//import zRoleOnboarding from "./onboarding/roleOnboarding"; //sooooo many dependency loops

export const zTeam = zBase.extend({
  name: z.string(),
  //members: z.array(zTeamMember),
  terms: z.array(zTerm),
  alwaysActive: z.boolean(),
  confirmedAt: z.date(),
  vaultWardenUrl: z.string().url().optional(),
  notionUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  //project: zProject.optional(),
  //onboardings: zRoleOnboarding,
});

export interface Team extends z.infer<typeof zTeam> {}

export default zTeam;
