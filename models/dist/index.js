'use strict';

var zod = require('zod');
var bson = require('bson');
var mongoose = require('mongoose');

// src/types/member.ts
var zObjectId = zod.z.string().refine((val) => bson.ObjectId.isValid(val));
var objectId_default = zObjectId;

// src/types/base.ts
var zBase = zod.z.object({
  _id: objectId_default,
  createdAt: zod.z.date(),
  updatedAt: zod.z.date()
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
var zTerm = zod.z.string().refine(isValidTerm);
var term_default = zTerm;
var projectStatuses = [
  "Prospective",
  "Accepted",
  "Rejected",
  "Active",
  "Completed"
];
var zProjectStatus = zod.z.enum(projectStatuses);
var zBaseProject = base_default.extend({
  name: zod.z.string(),
  contactName: zod.z.string(),
  contactEmail: zod.z.string().email(),
  status: zProjectStatus,
  description: zod.z.string(),
  impactAreas: zod.z.array(zod.z.string()),
  orgUrl: zod.z.string().url().optional(),
  deployUrl: zod.z.string().url().optional(),
  notes: zod.z.string().optional()
});
var zProject = zBaseProject.extend({
  team: team_default
});
var project_default = zProject;
var zOnboardingStep = base_default.extend({
  title: zod.z.string(),
  description: zod.z.string().optional()
});
var onboardingStep_default = zOnboardingStep;

// src/types/onboarding/onboarding.ts
var zOnboarding = base_default.extend({
  title: zod.z.string(),
  description: zod.z.string().optional(),
  steps: zod.z.array(onboardingStep_default)
});
var onboarding_default = zOnboarding;

// src/types/onboarding/roleOnboarding.ts
var zRoleOnboarding = zod.z.object({
  role: TeamRole,
  onboardings: zod.z.array(onboarding_default)
});
var roleOnboarding_default = zRoleOnboarding;

// src/types/team.ts
var zTeam = base_default.extend({
  name: zod.z.string(),
  members: zod.z.array(teamMember_default),
  terms: zod.z.array(term_default),
  alwaysActive: zod.z.boolean(),
  confirmedAt: zod.z.date(),
  vaultWardenUrl: zod.z.string().url().optional(),
  notionUrl: zod.z.string().url().optional(),
  githubUrl: zod.z.string().url().optional(),
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
var TeamRole = zod.z.enum(teamRoles);
var zBaseTeamMember = base_default.extend({
  role: TeamRole,
  terms: zod.z.array(term_default)
});
var zTeamMember = zBaseTeamMember.extend({
  member: zod.z.lazy(() => member_default),
  team: zod.z.lazy(() => team_default)
});
var teamMember_default = zTeamMember;
var zOnboardingStepStatus = zod.z.object({
  step: onboardingStep_default,
  completed: zod.z.boolean()
});
var onboardingStepStatus_default = zOnboardingStepStatus;

// src/types/onboarding/onboardingStatus.ts
var zOnboardingStatus = zod.z.object({
  onboarding: onboarding_default,
  steps: zod.z.array(onboardingStepStatus_default),
  completed: zod.z.boolean()
});
var onboardingStatus_default = zOnboardingStatus;

// src/types/member.ts
var organizationRoles = [
  "Director",
  "Executive",
  "Member",
  "Alumni"
];
var OrganizationRole = zod.z.enum(organizationRoles);
var zTermMember = zod.z.object({
  term: term_default,
  orgRole: OrganizationRole
});
var zMember = base_default.extend({
  firstName: zod.z.string(),
  lastName: zod.z.string(),
  netid: zod.z.string(),
  pronouns: zod.z.string(),
  major: zod.z.string(),
  class: zod.z.number(),
  preferredName: zod.z.string().optional(),
  githubUsername: zod.z.string().optional(),
  linkedinUrl: zod.z.string().url().optional(),
  confirmedAt: zod.z.date(),
  imageUrl: zod.z.string().url().optional(),
  teams: zod.z.array(teamMember_default),
  activeTerms: zod.z.array(zTermMember),
  onboardings: zod.z.array(onboardingStatus_default)
});
var member_default = zMember;
var formQuestionTypes = [
  "Numeric",
  "Text",
  "FileUpload",
  "MultipleChoice"
];
var zFormQuestionType = zod.z.enum(formQuestionTypes);
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
var zFileType = zod.z.enum(fileTypes);
var multipleChoiceTypes = ["Single", "Multiple", "Ranked"];
var zMultipleChoiceType = zod.z.enum(multipleChoiceTypes);
var zFormQuestionBase = zod.z.object({
  title: zod.z.string(),
  description: zod.z.string().optional(),
  isRequired: zod.z.boolean(),
  questionType: zFormQuestionType,
  numericOptions: zod.z.object({
    allowDecimals: zod.z.boolean(),
    minVal: zod.z.number().optional(),
    maxVal: zod.z.number().optional()
  }).optional(),
  textOptions: zod.z.object({ isParagraph: zod.z.boolean() }).optional(),
  fileUploadOptions: zod.z.object({
    maxFileSize: zod.z.number(),
    supportedFileTypes: zFileType
  }).optional(),
  multipleChoiceOptions: zod.z.object({
    options: zod.z.array(zod.z.string()),
    allowOther: zod.z.boolean(),
    type: zMultipleChoiceType
  }).optional()
});
var zFormQuestion = zFormQuestionBase.extend({
  form: zod.z.lazy(() => form_default)
});
zFormQuestionBase.extend(
  {
    form: zod.z.lazy(() => zFormResponse),
    ...base_default.shape
  }
);
var formQuestion_default = zFormQuestion;
var zFormSubmissionBase = base_default.extend({
  questionResponses: zod.z.object({
    title: zod.z.string(),
    description: zod.z.string().optional(),
    answer: zod.z.union([zod.z.string(), zod.z.number()]).optional()
  }),
  responderEmail: zod.z.string().optional()
});
var zFormSubmission = zFormSubmissionBase.extend({
  form: zod.z.lazy(() => form_default)
});
var zFormSubmissionResponse = zFormSubmissionBase.extend({
  form: zFormResponse2,
  ...base_default.shape
});
var zFormSubmissionRequest = zFormSubmissionBase.extend({});
var formSubmission_default = zFormSubmission;

// src/types/FormBuilder/form.ts
var responderTypes = ["Member", "Student", "Anyone"];
var zResponderType = zod.z.enum(responderTypes);
var zForm = zod.z.object({
  questions: zod.z.array(formQuestion_default),
  responderType: zResponderType,
  callbackUrl: zod.z.string().optional(),
  isAnonymous: zod.z.boolean(),
  submissions: zod.z.array(formSubmission_default)
});
var zCreateFormRequest = zForm.extend({
  questions: zod.z.array(objectId_default),
  submissions: zod.z.array(objectId_default)
});
var zFormResponse2 = zForm.extend({
  ...zBase.shape,
  questions: zod.z.array(zFormSubmissionResponse)
});
var form_default = zForm;
var FormSchema = new mongoose.Schema({
  questions: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FormQuestion", required: true }
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
    { type: mongoose.Schema.Types.ObjectId, ref: "FormSubmission", required: true }
  ]
});
var Form_default = mongoose.models.Form || mongoose.model("Form", FormSchema, "forms");
var FormQuestionSchema = new mongoose.Schema({
  form: { ref: "Form", type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: mongoose.Schema.Types.String, required: true },
  description: { type: mongoose.Schema.Types.String, required: false },
  isRequired: { type: mongoose.Schema.Types.Boolean, required: true },
  questionType: {
    type: mongoose.Schema.Types.String,
    enum: formQuestionTypes,
    required: true
  },
  numericOptions: {
    type: {
      allowDecimals: {
        type: mongoose.Schema.Types.Boolean,
        required: true
      },
      minVal: {
        type: mongoose.Schema.Types.Number,
        required: false
      },
      maxVal: {
        type: mongoose.Schema.Types.Number,
        required: false
      }
    },
    required: false
  },
  textOptions: {
    type: { isParagraph: { type: mongoose.Schema.Types.Boolean, required: true } },
    required: false
  },
  fileUploadOptions: {
    type: {
      maxFileSize: { type: mongoose.Schema.Types.Number, required: true },
      supportedFileTypes: {
        type: mongoose.Schema.Types.String,
        enum: fileTypes,
        required: true
      }
    },
    required: false
  },
  multipleChoiceOptions: {
    type: {
      options: [{ type: mongoose.Schema.Types.String, requried: true }],
      allowOther: { type: mongoose.Schema.Types.Boolean, required: true },
      type: {
        type: mongoose.Schema.Types.Boolean,
        enum: multipleChoiceTypes,
        required: true
      }
    },
    required: false
  }
});
var FormQuestion_default = mongoose.models.Form || mongoose.model(
  "FormQuestion",
  FormQuestionSchema,
  "formQuestions"
);
var FormSubmissionSchema = new mongoose.Schema({
  form: { ref: "Form", type: mongoose.Schema.Types.ObjectId, required: true },
  questionResponses: {
    type: [
      {
        question: {
          ref: "FormQuestion",
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        answer: { type: mongoose.Schema.Types.Mixed, required: false }
      }
    ],
    required: true
  },
  responderEmail: { type: String, required: false }
});
var FormSubmission_default = mongoose.models.FormSubmission || mongoose.model(
  "FormSubmission",
  FormSubmissionSchema,
  "formSubmissions"
);
var MemberSchema = new mongoose.Schema(
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Team",
      required: true
    },
    onboardings: {
      type: [
        {
          onboarding: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Onboarding",
            required: true
          },
          steps: {
            type: [
              {
                step: {
                  type: mongoose.Schema.Types.ObjectId,
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
var Member_default = mongoose.models.Member || mongoose.model("Member", MemberSchema);
var ProjectSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
var Project_default = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
var TeamSchema = new mongoose.Schema(
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Member",
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
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
            type: [mongoose.Schema.Types.ObjectId],
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
var Team_default = mongoose.models.Team || mongoose.model("Team", TeamSchema);

// src/db/actions/index.ts
var placeholder = {};

exports.FormQuestionSchema = FormQuestion_default;
exports.FormSchema = Form_default;
exports.FormSubmissionSchema = FormSubmission_default;
exports.MemberSchema = Member_default;
exports.OrganizationRole = OrganizationRole;
exports.ProjectSchema = Project_default;
exports.TeamRole = TeamRole;
exports.TeamSchema = Team_default;
exports.fileTypes = fileTypes;
exports.formQuestionTypes = formQuestionTypes;
exports.multipleChoiceTypes = multipleChoiceTypes;
exports.organizationRoles = organizationRoles;
exports.placeholder = placeholder;
exports.projectStatuses = projectStatuses;
exports.responderTypes = responderTypes;
exports.teamRoles = teamRoles;
exports.zCreateFormRequest = zCreateFormRequest;
exports.zFileType = zFileType;
exports.zFormQuestionType = zFormQuestionType;
exports.zFormResponse = zFormResponse2;
exports.zFormSubmission = zFormSubmission;
exports.zFormSubmissionRequest = zFormSubmissionRequest;
exports.zFormSubmissionResponse = zFormSubmissionResponse;
exports.zMember = zMember;
exports.zMultipleChoiceType = zMultipleChoiceType;
exports.zOnboarding = zOnboarding;
exports.zOnboardingStatus = zOnboardingStatus;
exports.zOnboardingStep = zOnboardingStep;
exports.zOnboardingStepStatus = zOnboardingStepStatus;
exports.zProject = zProject;
exports.zProjectStatus = zProjectStatus;
exports.zResponderType = zResponderType;
exports.zRoleOnboarding = zRoleOnboarding;
exports.zTeamMember = zTeamMember;
exports.zTerm = zTerm;
exports.zTermMember = zTermMember;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map