import {
  ApplicantEntity,
  applicantDecisions,
  applicantStatuses,
} from '@/types/applicant';
import { Model, Schema, model, models } from 'mongoose';

const ApplicantSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  netid: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: applicantStatuses,
    required: true,
  },
  interviewTime: {
    type: Date,
    required: false,
  },
  interviewMeetingLink: {
    type: String,
    required: false,
  },
  noShowCount: {
    type: Number,
    required: false,
  },
  decision: {
    type: String,
    enum: applicantDecisions,
    required: false,
  },
  decisionReason: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'FormSubmission',
    required: true,
  },
  evaluation: {
    type: Schema.Types.ObjectId,
    ref: 'FormSubmission',
    required: false,
  },
  statusUpdatedAt: {
    type: Date,
    required: false,
  },
});

export type ApplicantDocument = Omit<ApplicantEntity, '_id'> & Document;

export default (models.Applicant as Model<ApplicantDocument>) ||
  model<ApplicantDocument>('Applicant', ApplicantSchema);
