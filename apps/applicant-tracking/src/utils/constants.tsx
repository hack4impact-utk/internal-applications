import { DashboardOutlined, Groups3Outlined } from '@mui/icons-material';

export const LOGO_URL = '/logo.svg';

const urls = {
  pages: {
    dashboard: '/',
    applicants: '/applicants',
  },
} as const;

type AtsPageUrl = (typeof urls)['pages'][keyof (typeof urls)['pages']];

type AtsRoute = {
  icon?: React.ReactNode;
  text: string;
  route: AtsPageUrl;
};

export const routes: Readonly<AtsRoute[]> = [
  {
    icon: <DashboardOutlined />,
    text: 'Dashboard',
    route: '/',
  },
  {
    icon: <Groups3Outlined />,
    text: 'Applicants',
    route: '/applicants',
  },
] as const;
