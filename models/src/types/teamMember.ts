import { z } from 'zod';
import zBase from './base';
import zMember, { Member } from './member';
import zTerm from './term';
import zTeam, { Team } from './team';

export const teamRoles = [
  'Member',
  'Leader',
  'Director',
  'Developer',
  'Product Manager',
  'Tech Lead',
] as const;

export const TeamRole = z.enum(teamRoles);
export type TeamRole = z.infer<typeof TeamRole>;

const zBaseTeamMember = zBase.extend({
  role: TeamRole,
  terms: z.array(zTerm),
});

type BaseTeamMember = z.infer<typeof zBaseTeamMember>;

export type TeamMember = BaseTeamMember & {
  member: Member;
  team: Team;
};

export const zTeamMember: z.ZodType<TeamMember> = zBaseTeamMember.extend({
  member: z.lazy(() => zMember),
  team: z.lazy(() => zTeam),
});

export default zTeamMember;
