import { z } from 'zod';
import { ObjectId } from 'bson';
import { Schema, models, model } from 'mongoose';

// src/types/member.ts
var zObjectId = z.string().refine((val) => ObjectId.isValid(val));
var objectId_default = zObjectId;

// src/types/base.ts
var zBase = z.object({
  _id: objectId_default,
  createdAt: z.date(),
  updatedAt: z.date()
});
var base_default = zBase;
function isValidTerm(term) {
  const [semester, year, ...rest] = term.split(" ");
  if (rest && rest.length > 0) {
    return false;
  }
  if (semester !== "Spring" || semester !== "Fall") {
    return false;
  }
  if (Number.isNaN(year)) {
    return false;
  }
  return true;
}
var zTerm = z.string().refine(isValidTerm);
var term_default = zTerm;
var projectStatuses = [
  "Prospective",
  "Accepted",
  "Rejected",
  "Active",
  "Completed"
];
var zProjectStatus = z.enum(projectStatuses);
var zBaseProject = base_default.extend({
  name: z.string(),
  contactName: z.string(),
  contactEmail: z.string().email(),
  status: zProjectStatus,
  description: z.string(),
  impactAreas: z.array(z.string()),
  orgUrl: z.string().url().optional(),
  deployUrl: z.string().url().optional(),
  notes: z.string().optional()
});
var zProject = zBaseProject.extend({
  team: team_default
});
var project_default = zProject;
var zOnboardingStep = base_default.extend({
  title: z.string(),
  description: z.string().optional()
});
var onboardingStep_default = zOnboardingStep;

// src/types/onboarding/onboarding.ts
var zOnboarding = base_default.extend({
  title: z.string(),
  description: z.string().optional(),
  steps: z.array(onboardingStep_default)
});
var onboarding_default = zOnboarding;

// src/types/onboarding/roleOnboarding.ts
var zRoleOnboarding = z.object({
  role: TeamRole,
  onboardings: z.array(onboarding_default)
});
var roleOnboarding_default = zRoleOnboarding;

// src/types/team.ts
var zTeam = base_default.extend({
  name: z.string(),
  members: z.array(teamMember_default),
  terms: z.array(term_default),
  alwaysActive: z.boolean(),
  confirmedAt: z.date(),
  vaultWardenUrl: z.string().url().optional(),
  notionUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  project: project_default.optional(),
  onboardings: roleOnboarding_default
});
var team_default = zTeam;

// src/types/teamMember.ts
var teamRoles = [
  "Member",
  "Leader",
  "Director",
  "Developer",
  "Product Manager",
  "Tech Lead"
];
var TeamRole = z.enum(teamRoles);
var zBaseTeamMember = base_default.extend({
  role: TeamRole,
  terms: z.array(term_default)
});
var zTeamMember = zBaseTeamMember.extend({
  member: z.lazy(() => member_default),
  team: z.lazy(() => team_default)
});
var teamMember_default = zTeamMember;
var zOnboardingStepStatus = z.object({
  step: onboardingStep_default,
  completed: z.boolean()
});
var onboardingStepStatus_default = zOnboardingStepStatus;

// src/types/onboarding/onboardingStatus.ts
var zOnboardingStatus = z.object({
  onboarding: onboarding_default,
  steps: z.array(onboardingStepStatus_default),
  completed: z.boolean()
});
var onboardingStatus_default = zOnboardingStatus;

// src/types/member.ts
var organizationRoles = [
  "Director",
  "Executive",
  "Member",
  "Alumni"
];
var OrganizationRole = z.enum(organizationRoles);
var zTermMember = z.object({
  term: term_default,
  orgRole: OrganizationRole
});
var zMember = base_default.extend({
  firstName: z.string(),
  lastName: z.string(),
  netid: z.string(),
  pronouns: z.string(),
  major: z.string(),
  class: z.number(),
  preferredName: z.string().optional(),
  githubUsername: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
  confirmedAt: z.date(),
  imageUrl: z.string().url().optional(),
  teams: z.array(teamMember_default),
  activeTerms: z.array(zTermMember),
  onboardings: z.array(onboardingStatus_default)
});
var member_default = zMember;
var formQuestionTypes = [
  "Numeric",
  "Text",
  "FileUpload",
  "MultipleChoice"
];
var zFormQuestionType = z.enum(formQuestionTypes);
var fileTypes = [
  "Document",
  "Presentation",
  "Spreadsheet",
  "Drawing",
  "PDF",
  "Image",
  "Video",
  "Audio"
];
var zFileType = z.enum(fileTypes);
var multipleChoiceTypes = ["Single", "Multiple", "Ranked"];
var zMultipleChoiceType = z.enum(multipleChoiceTypes);
var zFormQuestionBase = z.object({
  title: z.string(),
  description: z.string().optional(),
  isRequired: z.boolean(),
  questionType: zFormQuestionType,
  numericOptions: z.object({
    allowDecimals: z.boolean(),
    minVal: z.number().optional(),
    maxVal: z.number().optional()
  }).optional(),
  textOptions: z.object({ isParagraph: z.boolean() }).optional(),
  fileUploadOptions: z.object({
    maxFileSize: z.number(),
    supportedFileTypes: zFileType
  }).optional(),
  multipleChoiceOptions: z.object({
    options: z.array(z.string()),
    allowOther: z.boolean(),
    type: zMultipleChoiceType
  }).optional()
});
var zFormQuestion = zFormQuestionBase.extend({
  form: z.lazy(() => form_default)
});
zFormQuestionBase.extend(
  {
    form: z.lazy(() => zFormResponse),
    ...base_default.shape
  }
);
var formQuestion_default = zFormQuestion;
var zFormSubmissionBase = base_default.extend({
  questionResponses: z.object({
    title: z.string(),
    description: z.string().optional(),
    answer: z.union([z.string(), z.number()]).optional()
  }),
  responderEmail: z.string().optional()
});
var zFormSubmission = zFormSubmissionBase.extend({
  form: z.lazy(() => form_default)
});
var zFormSubmissionResponse = zFormSubmissionBase.extend({
  form: zFormResponse2,
  ...base_default.shape
});
var zFormSubmissionRequest = zFormSubmissionBase.extend({});
var formSubmission_default = zFormSubmission;

// src/types/FormBuilder/form.ts
var responderTypes = ["Member", "Student", "Anyone"];
var zResponderType = z.enum(responderTypes);
var zForm = z.object({
  questions: z.array(formQuestion_default),
  responderType: zResponderType,
  callbackUrl: z.string().optional(),
  isAnonymous: z.boolean(),
  submissions: z.array(formSubmission_default)
});
var zCreateFormRequest = zForm.extend({
  questions: z.array(objectId_default),
  submissions: z.array(objectId_default)
});
var zFormResponse2 = zForm.extend({
  ...zBase.shape,
  questions: z.array(zFormSubmissionResponse)
});
var form_default = zForm;
var FormSchema = new Schema({
  questions: {
    type: [
      { type: Schema.Types.ObjectId, ref: "FormQuestion", required: true }
    ],
    required: true
  },
  responder: {
    type: String,
    enum: responderTypes,
    required: true
  },
  callbackUrl: { type: String, required: false },
  isAnonymous: { type: Boolean, required: true },
  submissions: [
    { type: Schema.Types.ObjectId, ref: "FormSubmission", required: true }
  ]
});
var Form_default = models.Form || model("Form", FormSchema, "forms");
var FormQuestionSchema = new Schema({
  form: { ref: "Form", type: Schema.Types.ObjectId, required: true },
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: false },
  isRequired: { type: Schema.Types.Boolean, required: true },
  questionType: {
    type: Schema.Types.String,
    enum: formQuestionTypes,
    required: true
  },
  numericOptions: {
    type: {
      allowDecimals: {
        type: Schema.Types.Boolean,
        required: true
      },
      minVal: {
        type: Schema.Types.Number,
        required: false
      },
      maxVal: {
        type: Schema.Types.Number,
        required: false
      }
    },
    required: false
  },
  textOptions: {
    type: { isParagraph: { type: Schema.Types.Boolean, required: true } },
    required: false
  },
  fileUploadOptions: {
    type: {
      maxFileSize: { type: Schema.Types.Number, required: true },
      supportedFileTypes: {
        type: Schema.Types.String,
        enum: fileTypes,
        required: true
      }
    },
    required: false
  },
  multipleChoiceOptions: {
    type: {
      options: [{ type: Schema.Types.String, requried: true }],
      allowOther: { type: Schema.Types.Boolean, required: true },
      type: {
        type: Schema.Types.Boolean,
        enum: multipleChoiceTypes,
        required: true
      }
    },
    required: false
  }
});
var FormQuestion_default = models.Form || model(
  "FormQuestion",
  FormQuestionSchema,
  "formQuestions"
);
var FormSubmissionSchema = new Schema({
  form: { ref: "Form", type: Schema.Types.ObjectId, required: true },
  questionResponses: {
    type: [
      {
        question: {
          ref: "FormQuestion",
          type: Schema.Types.ObjectId,
          required: true
        },
        answer: { type: Schema.Types.Mixed, required: false }
      }
    ],
    required: true
  },
  responderEmail: { type: String, required: false }
});
var FormSubmission_default = models.FormSubmission || model(
  "FormSubmission",
  FormSubmissionSchema,
  "formSubmissions"
);
var MemberSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    netid: {
      type: String,
      required: true
    },
    pronouns: {
      type: String,
      required: true
    },
    major: {
      type: String,
      required: true
    },
    class: {
      type: Number,
      required: true
    },
    preferredName: {
      type: String,
      required: false
    },
    githubUsername: {
      type: String,
      required: false
    },
    linkedinUrl: {
      type: String,
      required: false
    },
    confirmedAt: {
      type: Date,
      required: true
    },
    imageUrl: {
      type: String,
      required: false
    },
    activeTerms: {
      type: [
        {
          term: {
            type: String,
            required: true
          },
          orgRole: {
            type: String,
            enum: organizationRoles,
            required: true
          }
        }
      ],
      required: true
    },
    teams: {
      type: [Schema.Types.ObjectId],
      ref: "Team",
      required: true
    },
    onboardings: {
      type: [
        {
          onboarding: {
            type: Schema.Types.ObjectId,
            ref: "Onboarding",
            required: true
          },
          steps: {
            type: [
              {
                step: {
                  type: Schema.Types.ObjectId,
                  ref: "OnboardingStep",
                  required: true
                },
                completed: {
                  type: Boolean,
                  required: true
                }
              }
            ],
            required: true
          },
          completed: {
            type: Boolean,
            required: true
          }
        }
      ],
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
MemberSchema.index({ netid: 1 }, { unique: true });
var Member_default = models.Member || model("Member", MemberSchema);
var ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    contactName: {
      type: String,
      required: true
    },
    contactEmail: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: projectStatuses,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    deployUrl: {
      type: String,
      required: false
    },
    notes: {
      type: String,
      required: false
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
var Project_default = models.Project || model("Project", ProjectSchema);
var TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    terms: {
      type: [String],
      required: true
    },
    alwaysActive: {
      type: Boolean,
      required: true
    },
    confirmedAt: {
      type: Date,
      required: true
    },
    vaultWardenUrl: {
      type: String,
      required: false
    },
    notionUrl: {
      type: String,
      required: false
    },
    githubUrl: {
      type: String,
      required: false
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: false
    },
    onboardings: {
      type: [
        {
          role: {
            type: String,
            enum: teamRoles,
            required: true
          },
          onboardings: {
            type: [Schema.Types.ObjectId],
            required: true
          }
        }
      ],
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
var Team_default = models.Team || model("Team", TeamSchema);

// src/db/actions/index.ts
var placeholder = {};

export { FormQuestion_default as FormQuestionSchema, Form_default as FormSchema, FormSubmission_default as FormSubmissionSchema, Member_default as MemberSchema, OrganizationRole, Project_default as ProjectSchema, TeamRole, Team_default as TeamSchema, fileTypes, formQuestionTypes, multipleChoiceTypes, organizationRoles, placeholder, projectStatuses, responderTypes, teamRoles, zCreateFormRequest, zFileType, zFormQuestionType, zFormResponse2 as zFormResponse, zFormSubmission, zFormSubmissionRequest, zFormSubmissionResponse, zMember, zMultipleChoiceType, zOnboarding, zOnboardingStatus, zOnboardingStep, zOnboardingStepStatus, zProject, zProjectStatus, zResponderType, zRoleOnboarding, zTeamMember, zTerm, zTermMember };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map