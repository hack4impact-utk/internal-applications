import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  choices: string[];
  answers: string[][];
}

const RankedChoiceAnalytics: React.FC<Props> = ({ choices, answers }) => {
  // Clone answers to avoid mutation
  let activeAnswers = answers.map(r => [...r]);

  let remainingChoices = [...choices];
  let round = 1;
  let winner = '';
  let rankings: string[] = [];

  // Instant-Runoff Voting
  while (!winner && remainingChoices.length > 0) {
    const count: Record<string, number> = {};

    // Count first-choice votes
    for (let response of activeAnswers) {
      for (let choice of response) {
        if (remainingChoices.includes(choice)) {
          count[choice] = (count[choice] || 0) + 1;
          break;
        }
      }
    }

    const totalVotes = Object.values(count).reduce((a, b) => a + b, 0);

    // Check for majority
    for (let [choice, c] of Object.entries(count)) {
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
    </div>
  );
};

export default RankedChoiceAnalytics;