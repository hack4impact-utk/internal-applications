import { z } from "zod";
import zBase from "../base";
import zObjectId from "../objectId";
import { zFormQuestionResponse } from "./formQuestion";

const zFormSubmissionBase = z.object({
  questionResponses: z.array(z.object({
    question: zObjectId,
    answer: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
  })),
  responderEmail: z.string().optional(),
});

export const zCreateFormSubmissionRequest = zFormSubmissionBase

export const zFormSubmissionEntity = zFormSubmissionBase.extend(zBase.shape)

export const zFormSubmissionResponse = zFormSubmissionEntity.extend({
  questionResponses: z.array(z.object({
    question: zFormQuestionResponse,
    answer: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
  })),
});

export interface FormSubmissionEntity extends z.infer<typeof zFormSubmissionEntity> {}
export interface CreateFormSubmissionRequest
  extends z.infer<typeof zCreateFormSubmissionRequest> {}
export interface FormSubmissionResponse
  extends z.infer<typeof zFormSubmissionResponse> {}

export default zFormSubmissionEntity;
