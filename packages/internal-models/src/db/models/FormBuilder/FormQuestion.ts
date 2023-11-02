import { model, Schema, Document, models, Model } from "mongoose";
import {
  FormQuestionEntity,
  fileTypes,
  formQuestionTypes,
  multipleChoiceTypes,
} from "../../../types/FormBuilder/formQuestion";

export const FormQuestionSchema = new Schema(
  {
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
      _id: false,
    },
    textOptions: {
      type: {
        isParagraph: {
          type: Schema.Types.Boolean,
          required: true,
        },
      },
      required: false,
      _id: false,
    },
    fileUploadOptions: {
      type: {
        maxFileSize: {
          type: Schema.Types.Number,
          required: true,
        },
        supportedFileTypes: {
          type: Schema.Types.String,
          enum: fileTypes,
          required: true,
        },
      },
      required: false,
      _id: false,
    },
    multipleChoiceOptions: {
      type: {
        options: {
          type: [Schema.Types.String],
          requried: true,
        },
        allowOther: {
          type: Schema.Types.Boolean,
          required: true,
        },
        choiceType: {
          type: Schema.Types.Boolean,
          enum: multipleChoiceTypes,
          required: true,
        },
      },
      required: false,
      _id: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export interface FormQuestionDocument extends Omit<FormQuestionEntity, "_id">, Document {};

export default (models.FormQuestion as Model<FormQuestionDocument>) ||
  model<FormQuestionDocument>(
    "FormQuestion",
    FormQuestionSchema,
    "formQuestions"
  );
