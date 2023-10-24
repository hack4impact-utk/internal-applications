import { model, Schema, Document, models, Model } from "mongoose";
import { FormSubmission } from "@/types/FormBuilder/formSubmission";

const FormSubmissionSchema = new Schema(
  {
    questionResponses: {
      type: [
        {
          question: {
            ref: "FormQuestion",
            type: Schema.Types.ObjectId,
            required: true,
          },
          answer: { type: Schema.Types.Mixed, required: false },
        },
      ],
      required: true,
      _id: false,
    },
    responderEmail: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type FormSubmissionDocument = FormSubmission & Document;

export default (models.FormSubmission as Model<FormSubmissionDocument>) ||
  model<FormSubmissionDocument>(
    "FormSubmission",
    FormSubmissionSchema,
    "formSubmissions"
  );
