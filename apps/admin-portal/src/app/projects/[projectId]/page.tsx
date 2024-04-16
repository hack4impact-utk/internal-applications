import React from 'react';

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  return <h1>Project page {params.projectId}</h1>;
}
