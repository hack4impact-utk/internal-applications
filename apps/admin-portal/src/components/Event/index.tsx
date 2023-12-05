interface eventParams {
    name: string;
    date: string;
    time: string;
    location: string;   
}

export default function Event(parmas: eventParams) {
    return (
        <div>
            <h1>{parmas.name}</h1>
            <h1>{parmas.date}</h1>
            <h1>{parmas.time}</h1>
            <h1>{parmas.location}</h1>
        </div>
    );
}