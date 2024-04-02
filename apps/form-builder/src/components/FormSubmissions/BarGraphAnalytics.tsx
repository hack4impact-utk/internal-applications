'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Props {
  choices: string[];
  answers: string[][];
}

export default function BarGraphAnalytics({ choices, answers }: Props) {
  // Hard-coded sample choices and answers for testing
  const sampleChoices = [
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Mango',
    'Pineapple',
  ];
  // Strawberry and Watermelon are not choices and should be displayed in others
  const sampleAnswers = [
    ['Apple', 'Banana', 'Orange', 'Grapes'],
    ['Banana', 'Orange', 'Grapes'],
    ['Orange', 'Grapes'],
    ['Grapes'],
    ['Mango', 'Pineapple', 'Strawberry'],
    ['Pineapple', 'Strawberry'],
    ['Strawberry'],
    ['Watermelon'],
    ['Apple', 'Mango', 'Pineapple', 'Watermelon'],
    ['Banana', 'Orange', 'Strawberry', 'Watermelon'],
    ['Grapes', 'Mango', 'Pineapple', 'Strawberry', 'Watermelon'],
  ];

  // Initialize an object to store the counts of each choice, including "Other"
  const choiceCounts: { [property: string]: number } = { Other: 0 };

  // Loop through each choice, create a key for it in the object, and initialize its count to 0
  sampleChoices.forEach((choice) => {
    choiceCounts[choice] = 0;
  });

  // Loop through each answer and count the occurrences of each choice
  sampleAnswers.forEach((answerSet) => {
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
  const data = sampleChoices.map((choice) => choiceCounts[choice]);

  // Extract items from answers that are not present in choices
  const itemsToDisplay = sampleAnswers.reduce((accumulator, currentValue) => {
    currentValue.forEach((answer) => {
      if (!sampleChoices.includes(answer) && !accumulator.includes(answer)) {
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

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <BarChart
        xAxis={[
          { scaleType: 'band', data: [...sampleChoices, 'Other'] }, // Include "Other" in the x-axis data
        ]}
        series={[{ data: [...data, choiceCounts['Other']] }]} // Include the count for "Other" in the series data
        width={500}
        height={300}
      />
      <Box
        sx={{
          width: '100%',
          height: 400,
          maxWidth: 360,
        }}
      >
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
