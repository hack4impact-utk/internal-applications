export interface eventParams {
    name: string;
    date: string;
    time: string;
    location: string;   
}

export default function Event(params: eventParams) {
    return (
        <div>
            <h1>{params.name}</h1>
            <h1>{params.date}</h1>
            <h1>{params.time}</h1>
            <h1>{params.location}</h1>
        </div>
    );
}