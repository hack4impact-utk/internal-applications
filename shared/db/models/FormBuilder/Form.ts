import { model, Schema, Document, models, Model } from "mongoose";
import { Form, responderTypes } from "@/types/FormBuilder/form";

const FormSchema = new Schema(
  {
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    questions: {
      type: [
        { type: Schema.Types.ObjectId, ref: "FormQuestion", required: true },
      ],
    },
    responderType: {
      type: String,
      enum: responderTypes,
      required: true,
    },
    callbackUrl: { type: String, required: false },
    isAnonymous: { type: Boolean, required: true },
    submissions: [
      { type: Schema.Types.ObjectId, ref: "FormSubmission", required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type FormDocument = Form & Document;

export default (models.Form as Model<FormDocument>) ||
  model<FormDocument>("Form", FormSchema, "forms");
