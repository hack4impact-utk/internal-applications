import React, { useMemo } from 'react';
import { Chart } from 'react-google-charts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';

interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

export default function NumericQuestionAnalytics({
  question,
  responses,
}: Props) {
  const { mean, median, mode, chartData } = useMemo(() => {
    let mean: number;
    let median: number;
    let mode: number[] = [];
    const numbers: number[] = [];
    let total = 0;
    const occurrences: number[] = [];
    let maxOccur = 2;

    // Total up responses and make an array of occurrences for each response
    for (const response of responses) {
      for (const questionResponse of response.questionResponses) {
        if (typeof questionResponse.answer !== 'number') {
          continue;
        }

        const number = questionResponse.answer;
        total += number;
        numbers.push(number);
        if (!occurrences[number]) occurrences[number] = 0;
        occurrences[number]++;
      }
    }

    // Calculate mean
    mean = Math.round((total / numbers.length) * 100) / 100;

    // Calculate median
    numbers.sort((a, b) => a - b); // Sort numbers in ascending order
    if (numbers.length % 2 !== 0) {
      median = Math.round(numbers[Math.floor(numbers.length / 2)] * 100) / 100;
    } else {
      median =
        Math.round(
          ((numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) /
            2) *
            100
        ) / 100;
    }

    // Calculate mode
    occurrences.forEach((num, i) => {
      if (occurrences[i] > maxOccur) {
        mode = [i];
        maxOccur = occurrences[i];
      } else if (occurrences[i] === maxOccur) {
        mode.push(i);
      }
    });

    // Prepare chart data
    const chartData = [['Number', 'Frequency']];
    occurrences.forEach((count, number) => {
      if (count > 0) {
        chartData.push([number, count]);
      }
    });

    return {
      mean,
      median,
      mode,
      chartData,
    };
  }, [responses]);

  return (
    <>
      {/* Display Statistics */}
      <List>
        <ListItem>
          <ListItemText>Mean: {mean}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Median: {median}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Mode: {mode.length ? mode.join(', ') : 'None'}
          </ListItemText>
        </ListItem>
      </List>

      {/* Render Histogram */}
      <Chart
        chartType="Histogram"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          title: 'Histogram of Responses',
          legend: { position: 'none' },
          hAxis: { title: 'Numbers' },
          vAxis: { title: 'Frequency' },
        }}
      />
    </>
  );
}
