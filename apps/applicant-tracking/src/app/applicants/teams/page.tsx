'use client'
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { DndContext, useSensors, PointerSensor, useSensor } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import { TeamList } from '@/components/TeamList';

interface Member {
    id: string;
    name?: string;
    experience?: string;
    team?: string;
}

// Member data should be imported in this format. ID can eventually be dynamically assigned on import

let members: Member[] = [
    {id:'1', name:'Dr. Marz', experience:'Professor', team:'applicants'}, 
    {id:'2', name:'Dr. Gregor', experience:'Professor', team:'applicants'},
    {id:'3', name:'Dr. Plank', experience:'Professor', team:'applicants'},
    {id:'4', name:'Dr. Emrich', experience:'Professor', team:'applicants'},
    {id:'5', name:'Dr. Crumpton', experience:'Professor', team:'team1'},
]

export default function TeamsPage() {
    const [items, setItems] = useState(members)

    const sensors = useSensors(
        useSensor(PointerSensor),
    )

    const [parent, setParent] = useState(null);

    return (
    <>
    <Typography variant='h4' align='center' style={{padding: '10px'}}>LBP Teams</Typography>
    <Box sx={{ width: '95%', height: 5, bgcolor: 'orange', margin: 'auto'}} />
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div style={{display: 'flex', flexDirection:'row', flexWrap:'wrap', gap:'100px'}}>        
            <TeamList id="applicants" title="Applicants" members={items.filter(function(obj) {return obj.team === 'applicants'})}/>
            <div style={{display: 'flex', flexDirection:'row', flexWrap:'wrap'}}>
                <TeamList id='team1' title='Team 1' members={items.filter(function(obj) {return obj.team === 'team1'})}/>
                <TeamList id='team2' title='Team 2' members={items.filter(function(obj) {return obj.team === 'team2'})}/>
            </div>
        </div>
    </DndContext>
    </>
    );

    /* Eventually use this instead

    function changeTeam(mem: Member, newteam: string) {
        let newmem: Member = {
            id: mem.id,
            name: mem.name,
            experience: mem.experience,
            team: newteam
        }
        setItems([...members.filter(function(obj){return obj.id != mem.id}), newmem])
    }
    */

    function handleDragEnd(event: any) {
        const {active, over} = event;

        let mem: Member ={
            id: active.id,
            name: active.name,
            experience: active.experience,
            team: active.team
        }
        let index = items.findIndex(item => item.id === active.id)
        if(index != -1)
        {
            //changeTeam(mem, over.id); <--- Eventually use this instead of next line. better for dynamic updates
            items[index].team = over.id;
            setParent(over ? over.id : null);
        }
    }

}