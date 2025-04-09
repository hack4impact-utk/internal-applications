import React, { ReactNode, useState, useEffect } from 'react';
import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from '@mui/material';
import { TeamItem } from './TeamItem';

interface Member {
    id: string;
    name?: string;
    experience?: string;
    team?: string;
}

interface TeamListProperties{
    id: string;
    title?: string;
    children?: ReactNode;
    members: Member[];
}

//These are the droppable environments that you can drag members into


export function TeamList (props: TeamListProperties){
    const {isOver, setNodeRef} = useDroppable({id: props.id})

    const styling = {
        display: 'flex', justifyContent: 'top center', alignItems: 'center', flexDirection:'column',
        borderRadius: 2,
        width: 300, height: 70 + 50 * props.members.length, margin:'20px',
        border: isOver ? '1px dashed orange' : '1px solid black',
        bgcolor: isOver ? '#f4d9b7' : 'white',
    }

    //const [tall, setTall] = useState(50); //eventually useful if height of the boxes need to be dynamic

    return (
        <Box ref={setNodeRef} sx ={styling}>
            <Typography variant='h6' style={{padding: '10px'}}>{props.title}</Typography>
            {props.members.map((member) => (
                <TeamItem id={member.id} name={member.name} experience={member.experience} team={member.team}/>
            ))}
        </Box>
    );
}