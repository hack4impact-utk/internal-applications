import { z } from "zod";
import { zBase } from "../base";
import zFormQuestion from "./formQuestion";
import zFormSubmission, { zFormSubmissionResponse } from "./formSubmission";
import zObjectId from "../objectId";

export const responderTypes = ["Member", "Student", "Anyone"] as const;
export const zResponderType = z.enum(responderTypes);
export type ResponderType = z.infer<typeof zResponderType>;

const zForm = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(zFormQuestion),
  responderType: zResponderType,
  callbackUrl: z.string().optional(),
  isAnonymous: z.boolean(),
  submissions: z.array(zFormSubmission),
});

export const zCreateFormRequest = zForm.extend({
  questions: z.array(zObjectId),
  submissions: z.array(zObjectId),
});

export const zFormResponse = zForm.extend({
  ...zBase.shape,
  questions: z.array(zFormSubmissionResponse),
  submissions: z.array(zFormSubmissionResponse),
});

export interface Form extends z.infer<typeof zForm> {}
export interface CreateFormRequest extends z.infer<typeof zCreateFormRequest> {}
export interface FormResponse extends z.infer<typeof zFormResponse> {}

export default zForm;
