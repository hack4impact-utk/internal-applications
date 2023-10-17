import { z } from "zod";
import zBase from "../base";

const zFormSubmission = z.object({
  questionResponses: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      answer: z.union([z.string(), z.number()]).optional(),
    })
  ),
  responderEmail: z.string().optional(),
});

export const zCreateFormSubmissionRequest = zFormSubmission.extend({});
export const zFormSubmissionResponse = zFormSubmission.extend(zBase.shape);

export type FormSubmission = z.infer<typeof zFormSubmission>;
export type CreateFormSubmissionRequest = z.infer<
  typeof zCreateFormSubmissionRequest
>;
export type FormSubmissionResponse = z.infer<typeof zFormSubmissionResponse>;

export default zFormSubmission;
