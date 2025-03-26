import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Circle } from '@mui/icons-material';

const graphKeys = {
'&:hover': {
  backgroundColor: '#999999',
  color: 'black',
},
borderRadius: '0px',
width: '125px', 
bgcolor: '#d9d9d9', 
outline: 'solid', 
outlineColor: '#444444', 
color: 'black', 
height: '30px', 
textTransform: 'none',
m: 2
}

export default function HistoryPage() {
    return (
    <>
    <Typography variant='h4' align='center' style={{padding: '10px'}}>History</Typography>
    <Box sx={{ width: '95%', height: 5, bgcolor: 'orange', margin: 'auto'}} />

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button variant='contained' startIcon={<Circle style={{fill: '#72b8cc'}}/>} sx={graphKeys}>Applications</Button>
      <Button variant='contained' startIcon={<Circle style={{fill: '#ab6563'}}/>} sx={graphKeys}>Admitted</Button>
      <Button variant='contained' startIcon={<Circle style={{fill: '#e3a457'}}/>} sx={graphKeys}>Retention</Button>
    </div>
    </>
  )
  }