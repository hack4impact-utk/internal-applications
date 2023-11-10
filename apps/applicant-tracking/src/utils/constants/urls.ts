const urls = {
  pages: {
    dashboard: '/',
    applicants: '/applicants',
    settings: '/settings',
  },
  api: {
    getApplicant: (id: string) => `/api/applicants/${id}`,
    getAllApplicants: '/api/applicants',
    getAllActionableApplicants: '/api/applicants/actionable',
    getCalendlyIntegration: '/api/calendly',
    upsertCalendlyIntegration: '/api/calendly',
  },
} as const;

export default urls;
