import { z } from "zod";
import zBase from "../base";
import zObjectId from "../objectId";

const zFormSubmission = z.object({
  questionResponses: z.array(
    z.object({
      question: zObjectId,
      answer: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
    })
  ),
  responderEmail: z.string().optional(),
});

export const zCreateFormSubmissionRequest = zFormSubmission.extend({});
export const zFormSubmissionResponse = zFormSubmission.extend(zBase.shape);

export interface FormSubmission extends z.infer<typeof zFormSubmission> {}
export interface CreateFormSubmissionRequest
  extends z.infer<typeof zCreateFormSubmissionRequest> {}
export interface FormSubmissionResponse
  extends z.infer<typeof zFormSubmissionResponse> {}

export default zFormSubmission;
