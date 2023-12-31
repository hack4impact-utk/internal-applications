import React from "react";
import urls from "./urls";
import { DashboardOutlined, Groups3Outlined } from '@mui/icons-material';

type AtsPageUrl = (typeof urls)['pages'][keyof (typeof urls)['pages']];

type AtsRoute = {
  icon?: React.ReactNode;
  text: string;
  route: AtsPageUrl;
};

export const routes: Readonly<AtsRoute[]> = [
  {
    icon: React.createElement(DashboardOutlined, {}, null),
    text: 'Dashboard',
    route: urls.pages.dashboard,
  },
  {
    icon: React.createElement(Groups3Outlined, {}, null),
    text: 'Applicants',
    route: urls.pages.applicants,
  },
] as const;
