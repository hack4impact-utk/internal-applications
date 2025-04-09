import { Box } from "@mui/material";
import ApplicantInfoPage from "@/components/ApplicantInfoPage";
export default function ApplicantPage({
  params,
}: {
  params: { applicantId: string };
}) {
  return (<Box>
    <h1>Applicant {params.applicantId}</h1>
    <ApplicantInfoPage></ApplicantInfoPage>
    </Box>);
}
