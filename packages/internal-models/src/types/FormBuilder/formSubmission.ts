import { z } from "zod";
import zBase from "../base";
import zObjectId from "../objectId";
import zFormQuestion, { zFormQuestionResponse } from "./formQuestion";

const zFormSubmissionQuestionResponse = z.object({
  question: zFormQuestion,
  answer: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
});

const zFormSubmission = z.object({
  questionResponses: z.array(zFormSubmissionQuestionResponse),
  responderEmail: z.string().optional(),
});

export const zCreateFormSubmissionRequest = zFormSubmission.extend({
  questionResponses: z.array(
    zFormSubmissionQuestionResponse.extend({
      question: zObjectId,
    })
  ),
});
export const zFormSubmissionResponse = zFormSubmission.extend({
  ...zBase.shape,
  questionResponses: z.array(
    zFormSubmissionQuestionResponse.extend({
      question: zFormQuestionResponse,
    })
  ),
});

export interface FormSubmission extends z.infer<typeof zFormSubmission> {}
export interface CreateFormSubmissionRequest
  extends z.infer<typeof zCreateFormSubmissionRequest> {}
export interface FormSubmissionResponse
  extends z.infer<typeof zFormSubmissionResponse> {}

export default zFormSubmission;
