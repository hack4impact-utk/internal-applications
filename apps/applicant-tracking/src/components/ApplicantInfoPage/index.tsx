import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


export default function ApplicantInfoPage(){
    return (<Box>
        <Typography variant="h6" align="center">Applicant: (Name)</Typography>
        <Box
            sx={{
            width: 'auto',
            height: 10,
            mx: 10,
            bgcolor: "#F9964E",
            }}
        />
        <Paper elevation={2} 
            sx={{
                width: 'auto',
                height: 500,
                mt: 5,
                mx: 15,
                bgcolor: "#C1E2F5",
            }}
        >
            
        </Paper>
    </Box>)
}