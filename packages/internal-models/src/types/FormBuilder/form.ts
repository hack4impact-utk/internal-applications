import { z } from "zod";
import { zBase } from "../base";
import zFormQuestion, { zFormQuestionResponse } from "./formQuestion";
import zFormSubmission, { zFormSubmissionResponse } from "./formSubmission";
import zObjectId from "../objectId";

export const responderTypes = ["Member", "Student", "Anyone"] as const;
export const zResponderType = z.enum(responderTypes);
export type ResponderType = z.infer<typeof zResponderType>;

const zFormBase = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(zObjectId),
  responderType: zResponderType,
  callbackUrl: z.string().optional(),
  isAnonymous: z.boolean(),
  submissions: z.array(zObjectId),
})

export const zCreateFormRequest = zFormBase

export const zFormEntity = zFormBase.extend(zBase.shape)

export const zFormResponse = zFormEntity.extend({
  questions: z.array(zFormQuestionResponse),
  submissions: z.array(zFormSubmissionResponse),
});

export interface FormEntity extends z.infer<typeof zFormEntity> {}
export interface CreateFormRequest extends z.infer<typeof zCreateFormRequest> {}
export interface FormResponse extends z.infer<typeof zFormResponse> {}

export default zFormEntity;
