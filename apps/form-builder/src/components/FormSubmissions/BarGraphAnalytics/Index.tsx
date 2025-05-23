'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';

interface Props {
  choices: string[];
  answers: string[][];
}

export default function BarGraphAnalytics({ choices, answers }: Props) {
  // Initialize an object to store the counts of each choice, including "Other"
  const choiceCounts: any = { Other: 0 };

  // Loop through each choice, create a key for it in the object, and initialize its count to 0
  choices.forEach((choice) => {
    choiceCounts[choice] = 0;
  });

  // Loop through each answer and count the occurrences of each choice
  answers.forEach((answerSet) => {
    answerSet.forEach((answer) => {
      // Check if the answer is one of the choices
      if (choiceCounts.hasOwnProperty(answer)) {
        choiceCounts[answer]++;
      } else {
        // Increment the count for "Other"
        choiceCounts['Other']++;
      }
    });
  });

  // Extract the counts to an array to use as data for the BarChart, including the count for "Other"
  const data = choices.map((choice) => choiceCounts[choice]);

  // Extract items from answers that are not present in choices
  const itemsToDisplay = answers.reduce((accumulator, currentValue) => {
    currentValue.forEach((answer) => {
      if (!choices.includes(answer) && !accumulator.includes(answer)) {
        accumulator.push(answer);
      }
    });
    return accumulator;
  }, []);

  // Render function for the scrollable list
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    // Check if the current index is within the range of the items to display
    if (index < itemsToDisplay.length) {
      const item = itemsToDisplay[index];
      return (
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      );
    } else {
      return null; // Return null for indices beyond the items to display
    }
  }

  // Estimate the average pixel width of a character.
  const avgCharWidth = 8;

  // Find the length (number of characters) of the longest label in the x-axis.
  const maxLabelLength = Math.max(...[...choices, 'Other'].map(choice => choice.length));

  // Count the total number of bars we need to display.
  // We add 1 to include the "Other" bar.
  const numBars = choices.length + 1;

  // Set the approximate horizontal spacing (in pixels) between each bar so labels don't overlap. 
  const barSpacing = 20;

  // The total width for the chart: 
  const chartWidth = numBars * (maxLabelLength * avgCharWidth + barSpacing);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <BarChart
        xAxis={[
          { scaleType: 'band', data: [...choices, 'Other'] }, // Include "Other" in the x-axis data
        ]}
        series={[{ data: [...data, choiceCounts['Other']] }]} // Include the count for "Other" in the series data
        width={chartWidth}
        height={300}
      />
      <Box
        sx={{
          width: '100%',
          height: 400,
          maxWidth: 360,
        }}
      >
        {itemsToDisplay.length > 0 && (
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Other Responses
          </Typography>
        )}
        
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={itemsToDisplay.length} // Update itemCount to match the number of items to display in the scrollable list
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
}
