import React from 'react';
import { Typography, Box } from '@mui/material'; // Add Box import
import { BarChart } from '@mui/x-charts';
// import { string } from 'zod';

interface Props {
  choices: string[];
  answers: string[][];
}

const RankedChoiceAnalytics: React.FC<Props> = ({ choices, answers }) => {
  // Clone answers to avoid mutation
  const activeAnswers = answers.map(r => [...r]);

  let remainingChoices = [...choices];
  let round = 1;
  let winner = '';
  const rankings: string[] = [];

  // Instant-Runoff Voting
  while (!winner && remainingChoices.length > 0) {
    const count: Record<string, number> = {};

    // Count first-choice votes
    for (const response of activeAnswers) {
      for (const choice of response) {
        if (remainingChoices.includes(choice)) {
          count[choice] = (count[choice] || 0) + 1;
          break;
        }
      }
    }

    const totalVotes = Object.values(count).reduce((a, b) => a + b, 0);

    // Check for majority
    for (const [choice, c] of Object.entries(count)) {
      if (c > totalVotes / 2) {
        winner = choice;
      }
    }

    // Eliminate lowest if no winner
    if (!winner) {
      const minVotes = Math.min(...Object.values(count));
      const toEliminate = Object.keys(count).filter(
        (c) => count[c] === minVotes
      )[0];

      remainingChoices = remainingChoices.filter((c) => c !== toEliminate);
      rankings.push(`${round}. Eliminated: ${toEliminate} (${minVotes} votes)`);
      round++;
    }
  }

  if (winner) {
    rankings.push(`${round}. Winner: ${winner}`);
  }

  // Find "Other" answers not in official choices
  const allChoicesSet = new Set(choices);
  const otherAnswers: string[] = [];

  answers.forEach((response, i) => {
    response.forEach((ans, j) => {
      if (!allChoicesSet.has(ans)) {
        otherAnswers.push(`Responder ${i + 1} - Rank ${j + 1}: ${ans}`);
      }
    });
  });

  // Prepare data for stacked bar chart
  // Count frequency of each choice at each rank position
  const chartData: Record<string, Record<string, number>> = {};
  
  // Initialize chartData with all choices
  choices.forEach(choice => {
    chartData[choice] = {};
  });
  
  // Count occurrences of each choice at each rank
  answers.forEach(response => {
    response.forEach((answer, rankIndex) => {
      // Only include answers that are among the official choices
      if (choices.includes(answer)) {
        const rankLabel = `Rank ${rankIndex + 1}`;
        chartData[answer][rankLabel] = (chartData[answer][rankLabel] || 0) + 1;
      }
    });
  });
  
  // Determine all possible rank labels
  const rankLabels = Array.from(
    new Set(
      Object.values(chartData)
        .flatMap(ranks => Object.keys(ranks))
    )
  ).sort((a, b) => {
    // Extract numbers from "Rank X" and sort numerically
    const numA = parseInt(a.split(' ')[1]);
    const numB = parseInt(b.split(' ')[1]);
    return numA - numB;
  });
  
  // Format data for BarChart component
  const series = rankLabels.map(rankLabel => ({
    data: choices.map(choice => chartData[choice][rankLabel] || 0),
    label: rankLabel,
    stack: 'total',
  }));

  return (
    <div>
      <Typography variant="h6">Ranked Choice Results</Typography>
      {rankings.map((line, index) => (
        <Typography key={index}>{line}</Typography>
      ))}

      {otherAnswers.length > 0 && (
        <>
          <Typography variant="h6">Other Answers</Typography>
          {otherAnswers.map((line, idx) => (
            <Typography key={`other-${idx}`}>{line}</Typography>
          ))}
        </>
      )}

      {/* Stacked Bar Chart */}
      <Box sx={{ mt: 4, mb: 4, height: 400, width: '100%' }}>
        <Typography variant="h6">Choice Rankings Distribution</Typography>
        <BarChart
          xAxis={[{
            scaleType: 'band',
            data: choices,
            label: 'Choices',
          }]}
          yAxis={[{
            label: 'Frequency',
          }]}
          series={series}
        />
      </Box>

    </div>
  );
};

export default RankedChoiceAnalytics;