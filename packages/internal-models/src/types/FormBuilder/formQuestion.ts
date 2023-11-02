import { z } from "zod";
import zBase from "../base";

export const formQuestionTypes = [
  "Numeric",
  "Text",
  "FileUpload",
  "MultipleChoice",
] as const;

export const zFormQuestionType = z.enum(formQuestionTypes);

export const fileTypes = [
  "Document",
  "Presentation",
  "Spreadsheet",
  "Drawing",
  "PDF",
  "Image",
  "Video",
  "Audio",
] as const;

export const zFileType = z.enum(fileTypes);
export type FileType = z.infer<typeof zFileType>;

export const multipleChoiceTypes = ["Single", "Multiple", "Ranked"] as const;

export const zMultipleChoiceType = z.enum(multipleChoiceTypes);
export type MultipleChoiceType = z.infer<typeof zMultipleChoiceType>;


const zFormQuestionBase = z.object({
  title: z.string(),
  description: z.string().optional(),
  isRequired: z.boolean(),
  questionType: zFormQuestionType,
  numericOptions: z
    .object({
      allowDecimals: z.boolean(),
      minVal: z.number().optional(),
      maxVal: z.number().optional(),
    })
    .optional(),
  textOptions: z.object({ isParagraph: z.boolean() }).optional(),
  fileUploadOptions: z
    .object({
      maxFileSize: z.number(),
      supportedFileTypes: z.array(zFileType),
    })
    .optional(),
  multipleChoiceOptions: z
    .object({
      options: z.array(z.string()),
      allowOther: z.boolean(),
      choiceType: zMultipleChoiceType,
    })
    .optional(),
});

export const zCreateFormQuestionRequest = zFormQuestionBase
export const zFormQuestionEntity = zFormQuestionBase.extend(zBase.shape)
export const zFormQuestionResponse = zFormQuestionEntity;

export interface FormQuestionEntity extends z.infer<typeof zFormQuestionEntity> {}
export interface CreateFormQuestionRequest
  extends z.infer<typeof zCreateFormQuestionRequest> {}
export interface FormQuestionResponse
  extends z.infer<typeof zFormQuestionResponse> {}

export default zFormQuestionEntity;
