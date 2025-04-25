'use client'
import ApplicantList from "@/components/ApplicantList";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { usePathname } from "next/navigation";

const data = [{value:5, label:'Accepted'}, {value:10, label:'Total'}]

export default function MyApplicantsPage() {
  return (
    <>
        <Typography variant='h4' align='center' style={{padding: '10px'}}>Applications</Typography>
        <Box sx={{ width: '95%', height: 5, bgcolor: 'orange', margin: 'auto'}} />
      
        {/* Filters Placeholder */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, }}>
          {/* Add filters here in the future */}
        </Box>
      
        {/* Table Header Row */}
        <Box sx={{ 
          width:'80%', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          backgroundColor: '#f5f5f5', padding: '8px 16px', margin: 'auto',
          }}>
          <Typography variant="subtitle1">Name:</Typography>
          <Typography variant="subtitle1">Date:</Typography>
          <Typography variant="subtitle1">Year:</Typography>
          <Typography variant="subtitle1">Major:</Typography>
          <Typography variant="subtitle1">Status:</Typography>
        </Box>
        {/* List goes here */}

        {/* Chart vvvvv ignore any warnings its actually fine*/}
        <Typography fontSize={25} align='center' style={{padding: '10px', textDecoration:'underline'}}>Fall 2024 Applications</Typography>
        <BarChart dataset={data}
          series={[{dataKey: 'value'}]}
          layout="horizontal" 
          yAxis={[{scaleType:'band', dataKey:'label', categoryGapRatio:'0.4', colorMap:{type:'ordinal', values:['Accepted', 'Total'], colors:['#50b56b','#97cca5'] }}]}
          xAxis={[{tickInterval:[]}]}
          width={600}
          height={200}
          margin={{left:100, top:5}}
          />
    </>
  );
}
