'use client';

import PageLink from "../pagelink";
import { pageInfo } from "@/app/dashboard/page";

  const pageArr: pageInfo[] = [
    { url: "/projects", pageTitle: "Projects", description: "List of all H4I projects" },
    { url: "/members", pageTitle: "Members", description: "List of all H4I members" },
  ]

  const pagelinks = pageArr.map((page, index) => (
    <PageLink
      key={index}
      url={page.url}
      pageTitle={page.pageTitle}
      description={page.description}
    />
  ));
  
  export default function DashboardPage(){
    return <>{pagelinks}</>;
  }