'use client';
import {
  DefaultChartsLegend,
  PieChart,
  pieArcLabelClasses,
} from '@mui/x-charts';
import React from 'react';

interface Props {
  choices: string[];
  answers: string[][];
}

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
  const data = Object.keys(choiceCounts).map((key) => ({
    label: key,
    value: choiceCounts[key],
    percentage: ((choiceCounts[key] / totalAnswers) * 100).toFixed(0),
  }));

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) =>
            `${item.label} (${item.value}) ${item.percentage} %`,
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'grey' },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      height={600}
    />
  );
}
