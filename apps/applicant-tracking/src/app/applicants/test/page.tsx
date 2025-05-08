export default function ApplicantPage( {params}:  { params: { applicantId: string } }) {
    return <h1>This is a test page {params.applicantId}</h1>
}
