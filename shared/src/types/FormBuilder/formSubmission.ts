import { z } from "zod";
import zBase from "../base";
import zForm, { Form, zFormResponse } from "./form";

const zFormSubmissionBase = zBase.extend({
  questionResponses: z.object({
    title: z.string(),
    description: z.string().optional(),
    answer: z.union([z.string(), z.number()]).optional(),
  }),
  responderEmail: z.string().optional(),
});

export type FormSubmission = z.infer<typeof zFormSubmissionBase> & {
  form: Form;
};
export const zFormSubmission: z.ZodType<FormSubmission> =
  zFormSubmissionBase.extend({
    form: z.lazy(() => zForm),
  });

export const zFormSubmissionResponse = zFormSubmissionBase.extend({
  form: zFormResponse,
  ...zBase.shape,
});

export const zFormSubmissionRequest = zFormSubmissionBase.extend({});

export type FormSubmissionResponse = z.infer<typeof zFormSubmissionResponse>;
export type FormSubmissionRequest = z.infer<typeof zFormSubmissionRequest>;

export default zFormSubmission;
