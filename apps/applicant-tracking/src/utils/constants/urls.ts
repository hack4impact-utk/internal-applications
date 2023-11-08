export const urls = {
  api: {
    getApplicant: (id: string) => `/api/applicants/${id}`,
    getAllApplicants: '/api/applicants',
    getAllActionableApplicants: '/api/applicants/actionable',
  },
};
