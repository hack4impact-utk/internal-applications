
interface params {
    name: string;
    status: string;
    members: string;
}

export default function Project(prop:params) {

    return (
        <div>
            <h1>Project name:{prop.name}</h1>
            <h1>Project status:{prop.status}</h1>
            <h1>Project Members:{prop.members}</h1>
        </div>
    )
}