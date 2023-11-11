const urls = {
  pages: {
    dashboard: '/',
    applicants: '/applicants',
  },
  api: {
    getApplicant: (id: string) => `/api/applicants/${id}`,
    getAllApplicants: '/api/applicants',
    getAllActionableApplicants: '/api/applicants/actionable',
  },
} as const

export default urls