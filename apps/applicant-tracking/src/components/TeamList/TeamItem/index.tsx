import React from 'react';
import { useDraggable } from "@dnd-kit/core";
import { Box, Typography } from '@mui/material';

interface Member {
    id: string;
    name?: string;
    experience?: string;
    team?: string;
}

// These are the member boxes that you drag onto the droppable environments


export function TeamItem(props: Member) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: props.id})
    const teamId = props.team;
    const movement = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const styling = {
        display: 'flex', justifyContent: 'left', alignItems: 'left', flexDirection:'column',
        border: '1px solid black', bgcolor:'#b6d5b8',
        width: 290, height: 50,
    }

    return (
        <div ref={setNodeRef} style={movement} {...attributes} {...listeners}>
            <Box ref={setNodeRef} sx ={styling}>
                <Typography variant='body1' style={{paddingLeft: '5px'}}>Name: {props.name}</Typography>
                <Typography variant='body1' style={{paddingLeft: '5px'}}>Experience: {props.experience}</Typography>
            </Box>
        </div>

    );
}