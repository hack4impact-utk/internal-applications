interface memberParams {
    name: string;
    year: number;
    project: string;
}

export default function Member(params: memberParams) {
    return (
        <div>
            <h1>{params.name}</h1>
            <h1>{params.year}</h1>
            <h2>{params.project}</h2>
        </div>
    );
}