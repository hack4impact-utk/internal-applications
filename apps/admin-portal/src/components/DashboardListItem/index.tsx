'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link'

interface DashboardListProject {
    description: string;
    name: string
}

export default function DashboardListItem(project: DashboardListProject) {
    return (
        <div>
            <Link href={`/projects/${project.name}`}>
                <Box 
                sx={{
                    border: 'solid',
                    borderColor: 'black',
                    display: "inline-block",
                    textDecoration: "none",
                    width: 250,
                    textAlign: 'center',
                    padding: 1,
                    background: 'linear-gradient(to bottom, PaleTurquoise, SkyBlue)',
                    borderRadius: '15px',
                }} >
                    <Typography variant="body1" fontFamily={'Georgia'} width={250} color="black">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </Typography>
                </Box>
            </Link>
        </div>
    )
}