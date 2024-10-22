import { z } from 'zod';

export const zDecisionFormData = z.object({
  decision: z.union([
    z.literal('Accepted'),
    z.literal('Rejected'),
    z.literal('Waitlisted'),
  ]),
  reason: z.string().optional(),
  role: z.union([
    z.literal('Developer'),
    z.literal('Designer'),
    z.literal('Learning Based Project'),
    z.literal('Operations'),
  ]),
});

export type DecisionFormData = z.infer<typeof zDecisionFormData>;
