import { z } from 'zod';
import zBase, { Base } from '../base';
import zForm, { Form } from './form';

export const formQuestionTypes = [
  'Numeric',
  'Text',
  'FileUpload',
  'MultipleChoice',
] as const;

export const zFormQuestionType = z.enum(formQuestionTypes);
export type FormQuestionType = z.infer<typeof zFormQuestionType>;

export const fileTypes = [
  'Document',
  'Presentation',
  'Spreadsheet',
  'Drawing',
  'PDF',
  'Image',
  'Video',
  'Audio',
] as const;

export const zFileType = z.enum(fileTypes);
export type FileType = z.infer<typeof zFileType>;

export const multipleChoiceTypes = ['Single', 'Multiple', 'Ranked'] as const;

export const zMultipleChoiceType = z.enum(multipleChoiceTypes);
export type MultipleChoiceType = z.infer<typeof zMultipleChoiceType>;

const zFormQuestion = z.object({
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
      supportedFileTypes: zFileType,
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

const zCreateFormQuestionRequest = zFormQuestion.extend({});
const zFormQuestionResponse = zFormQuestion.extend(zBase.shape);

export type FormQuestion = z.infer<typeof zFormQuestion>;
export type CreateFormQuestionRequest = z.infer<
  typeof zCreateFormQuestionRequest
>;
export type FormQuestionResponse = z.infer<typeof zFormQuestionResponse>;

export default zFormQuestion;
