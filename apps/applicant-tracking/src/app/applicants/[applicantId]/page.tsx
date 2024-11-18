export default function ApplicantPage({
  params,
}: {
  params: { applicantId: string };
}) {
  return <h1>Applicant {params.applicantId}</h1>;
}
