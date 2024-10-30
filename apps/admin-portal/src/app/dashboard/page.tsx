import DashboardPage from "@/components/DashboardPage";

export interface pageInfo {
    url: string; 
    pageTitle: string;
    description;
};

export default function Page() {
    return <DashboardPage />;
  }
  