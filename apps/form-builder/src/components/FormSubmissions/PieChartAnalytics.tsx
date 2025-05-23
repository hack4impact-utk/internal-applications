'use client';
import Typography from '@mui/material/Typography';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import React from 'react';

interface Props {
  choices: string[];
  answers: string[][];
}

//Function to display pie chart
export default function PieChartAnalytics({ choices, answers }: Props) {
  // Initialize an object to store the counts of each choice, including "Other"
  const choiceCounts: any = { Other: 0 };

  // Loop through each choice, create a key for it in the object, and initialize its count to 0
  choices.forEach((choice) => {
    choiceCounts[choice] = 0;
  });

  let totalAnswers = 0;

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
      totalAnswers++;
    });
  });

  // Extract the counts to an array to use as data for the BarChart, including the count for "Other"
  const data = Object.keys(choiceCounts)
    .map((key) => ({
      label: key,
      value: choiceCounts[key],
      percentage: ((choiceCounts[key] / totalAnswers) * 100).toFixed(0),
    }))
    .filter((item) => item.value > 0);

  if (data.length === 0) {
    return <Typography variant="subtitle1">No responses</Typography>;
  }

  return (
    //Displays pie chart on page
    <PieChart
      //Gets information for each section
      series={[
        {
          arcLabel: (item) =>
            `${item.label} ${item.percentage}% (${item.value})`,
          arcLabelMinAngle: 35,
          arcLabelRadius: '50%',
          data,
          outerRadius: '80%',
          cx: '40%',
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'grey' },
        },
      ]}
      //Changes color and font of text
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}
      //Changes size of pie chart
      width={700}
      height={500}
    />
  );
}
