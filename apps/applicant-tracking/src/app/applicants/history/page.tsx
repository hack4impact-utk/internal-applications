'use client';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Circle } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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

        <Box sx={{ 
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               marginTop: 4,
               marginBottom: 6,
               marginRight: '1%',
               // Giving space betweent the 2 filters
               gap: 5,
               }}>
        
              <FormControl sx = {{
                minWidth: 150,
                border: '2px solid',
                borderColor: 'grey.700',
                borderRadius: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
                <NativeSelect
        
                  defaultValue={1}
        
                  inputProps={{
                    id: 'uncontrolled-native',
                  }}
        
                >     
                {/* The content inside the filters like dates could be updated in the future
                depending upon the need */}
                  <option value={1}>Fall 2023</option>
                  <option value={2}>Fall 2024</option>
                </NativeSelect>
              </FormControl>
                <Typography  sx={{mx: 0.5 }}> To </Typography>
              <FormControl sx = {{
                minWidth: 150,
                border: '2px solid',
                borderColor: 'grey.700',
                borderRadius: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
                <NativeSelect
        
                  defaultValue={2}
        
                  inputProps={{
                    id: 'uncontrolled-native',
                  }}
        
                >
               {/* The content inside the filters like dates could be updated in the future
                depending upon the need */}
                  <option value={1}>Fall 2023</option>
                  <option value={2}>Fall 2024</option>
        
                </NativeSelect>
              </FormControl>
            </Box>

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button variant='contained' startIcon={<Circle style={{fill: '#72b8cc'}}/>} sx={graphKeys}>Applications</Button>
      <Button variant='contained' startIcon={<Circle style={{fill: '#ab6563'}}/>} sx={graphKeys}>Admitted</Button>
      <Button variant='contained' startIcon={<Circle style={{fill: '#e3a457'}}/>} sx={graphKeys}>Retention</Button>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <LineChart
      xAxis={[{          
        dataKey: 'date',
        scaleType: 'point',
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
      width={500}
      height={300}
    />
    </div>
    </>
  )
  }