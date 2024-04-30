import { PieChart } from '@mui/x-charts';
import React from 'react';

interface Props {
  choices: string[];
  answers: string[][];
}

export default function PieChartAnalytics({ choices, answers }: Props) {
  const sampleChoices = [
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Mango',
    'Pineapple',
  ];
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
  const choiceCounts: any = { Other: 0 };

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

  // // Extract items from answers that are not present in choices
  // const itemsToDisplay = sampleAnswers.reduce((accumulator, currentValue) => {
  //   currentValue.forEach((answer) => {
  //     if (!sampleChoices.includes(answer) && !accumulator.includes(answer)) {
  //       accumulator.push(answer);
  //     }
  //   });
  //   return accumulator;
  // }, []);

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}
