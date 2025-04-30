import React from "react";

type ApplicationStatus =
  | "Pending Review"
  | "Scheduling Interview"
  | "Interview Scheduled"
  | "Interview Complete"
  | "Decision Made";

type Decision = "Accepted" | "Waitlisted" | "Rejected";

type Application = {
  status: ApplicationStatus;
  firstName: string;
  lastName: string;
  netid: string;
  term: string;
  interviewTime?: Date;
  interviewMeetingLink?: string;
  noShowCount?: number;
  decision?: Decision;
  decisionReason?: string;
  notes?: string;
};

type Props = {
  application: Application;
};

export default function ApplicantInfoPage({ application }: Props) {
  return (
    <div className="p-8">
      <div className="text-sm text-gray-700 mb-2">
        Applicant Tracking &gt;&gt; Applicants &gt;&gt; {application.firstName} {application.lastName}
      </div>

      <h1 className="text-2xl font-semibold mb-2">
        Applicant: ({application.firstName} {application.lastName})
      </h1>

      <div className="h-1 w-full bg-orange-400 mb-6" />

      <div className="bg-blue-200 p-6 rounded w-full max-w-4xl">
        <div className="flex flex-wrap gap-4">
          <LabeledField label="First Name:" value={application.firstName} />
          <LabeledField label="Last Name:" value={application.lastName} />
        </div>
      </div>
    </div>
  );
}

function LabeledField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="border border-gray-600 px-2 py-1 w-48 bg-white"
      />
    </div>
  );
}