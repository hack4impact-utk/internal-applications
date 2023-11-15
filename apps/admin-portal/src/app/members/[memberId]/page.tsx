
export default function MemberPage({ params }: { params: { memberId: string } }) { 
    return <h1>Member Page: {params.memberId}</h1>;
 }
