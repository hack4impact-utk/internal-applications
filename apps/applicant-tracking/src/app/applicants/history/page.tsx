'use client';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Circle } from '@mui/icons-material';
import { HistoryFilter } from '@/components/HistoryFilters';

const data = [{date: '2023', ap: 50, ac: 25, ret: 10}, {date: '2024', ap: 30, ac: 70, ret: 60}, {date: '2025', ap: 80, ac: 60, ret: 30}];
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

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'30px', padding:'20px'}}>
      {/* Filters are Non Functional */}
      <HistoryFilter id="LeftFilter"/>
      <Typography sx={{padding:'20px'}}>To</Typography>
      <HistoryFilter id="Rightfilter"/>
    </div>

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {/* Buttons currently have no functionality */}
      <Button variant='contained' startIcon={<Circle style={{fill: '#72b8cc'}}/>} sx={graphKeys}>Applications</Button>
      <Button variant='contained' startIcon={<Circle style={{fill: '#ab6563'}}/>} sx={graphKeys}>Admitted</Button>
      <Button variant='contained' startIcon={<Circle style={{fill: '#e3a457'}}/>} sx={graphKeys}>Retention</Button>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <LineChart
      xAxis={[{          
        dataKey: 'date',
        scaleType: 'point',
        //min:{}
        //max:{} link this to history filters & Change data format to include semesters
      }]}
      yAxis={[{
        min: 0,
      }]}
      series={[
        {
          curve: "linear",
          dataKey:"ap",
          color:"#72b8cc",
        },
        {
          curve: "linear",
          dataKey:"ac",
          color:"#ab6563",
        },
        {
          curve: "linear",
          dataKey:"ret",
          color:"#e3a457",
        },
      ]}
      dataset={data}
      width={600}
      height={400}
    />
    </div>
    </>
  )
  }