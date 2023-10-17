import { model, Schema, Document, models, Model } from "mongoose";
import {
  FormQuestion,
  fileTypes,
  formQuestionTypes,
  multipleChoiceTypes,
} from "../../../types/FormBuilder/formQuestion";

export const FormQuestionSchema = new Schema({
  form: { ref: "Form", type: Schema.Types.ObjectId, required: true },
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: false },
  isRequired: { type: Schema.Types.Boolean, required: true },
  questionType: {
    type: Schema.Types.String,
    enum: formQuestionTypes,
    required: true,
  },
  numericOptions: {
    type: {
      allowDecimals: {
        type: Schema.Types.Boolean,
        required: true,
      },
      minVal: {
        type: Schema.Types.Number,
        required: false,
      },
      maxVal: {
        type: Schema.Types.Number,
        required: false,
      },
    },
    required: false,
  },
  textOptions: {
    type: { isParagraph: { type: Schema.Types.Boolean, required: true } },
    required: false,
  },
  fileUploadOptions: {
    type: {
      maxFileSize: { type: Schema.Types.Number, required: true },
      supportedFileTypes: {
        type: Schema.Types.String,
        enum: fileTypes,
        required: true,
      },
    },
    required: false,
  },
  multipleChoiceOptions: {
    type: {
      options: [{ type: Schema.Types.String, requried: true }],
      allowOther: { type: Schema.Types.Boolean, required: true },
      type: {
        type: Schema.Types.Boolean,
        enum: multipleChoiceTypes,
        required: true,
      },
    },
    required: false,
  },
});

export type FormQuestionDocument = Omit<FormQuestion, "_id"> & Document;

export default (models.Form as Model<FormQuestionDocument>) ||
  model<FormQuestionDocument>(
    "FormQuestion",
    FormQuestionSchema,
    "formQuestions"
  );
