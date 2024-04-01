// 'use client';
// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// interface Props {
//   choices: string[];
//   answers: string[][];
// }

// export default function BarGraphAnalytics({ choices, answers }: Props) {
//   // Hardcoded choices and answers for testing
//   const testChoices = ['Option 1', 'Option 2', 'Option 3'];
//   const testAnswers = [
//     ['Option 1', 'Option 2', 'Option 4'],
//     ['Option 1', 'Option 3'],
//     ['Option 2', 'Option 2', 'Option 3'],
//     ['Option 3'],
//     ['Option 1', 'Option 2', 'Option 3', 'Option 5'],
//     ['Option 1', 'Option 3'],
//     ['Option 1', 'Option 2'],
//     ['Option 2'],
//     ['Option 3', 'Option 3'],
//     ['Option 1', 'Option 2', 'Option 2'],
//   ];

//   // Initialize an object to store the counts of each choice
//   const choiceCounts: { [property: string]: number } = {};

//   // Loop through each choice, create a key for it in the object, and initialize its count to 0
//   testChoices.forEach((testChoice) => {
//     choiceCounts[testChoice] = 0;
//   });

//   // Loop through each answer and count the occurrences of each choice
//   testAnswers.forEach((answerSet) => {
//     answerSet.forEach((testAnswers) => {
//       if (choiceCounts.hasOwnProperty(testAnswers)) {
//         choiceCounts[testAnswers]++;
//       }
//     });
//   });

//   // Extract the counts to an array to use as data for the BarChart
//   const data = testChoices.map((testChoices) => choiceCounts[testChoices]);

//   return (
//     <BarChart
//       xAxis={[{ scaleType: 'band', data: testChoices }]}
//       series={[{ data: data }]}
//       width={500}
//       height={300}
//     />
//   );
// }

// import Box from '@mui/material/Box';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { FixedSizeList, ListChildComponentProps } from 'react-window';

// function renderRow(props: ListChildComponentProps) {
//   const { index, style } = props;

//   return (
//     <ListItem style={style} key={index} component="div" disablePadding>
//       <ListItemButton>
//         <ListItemText primary={`Item ${index + 1}`} />
//       </ListItemButton>
//     </ListItem>
//   );
// }

// export default function VirtualizedList() {
//   return (
//     <Box
//       sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
//     >
//       <FixedSizeList
//         height={400}
//         width={360}
//         itemSize={46}
//         itemCount={200}
//         overscanCount={5}
//       >
//         {renderRow}
//       </FixedSizeList>
//     </Box>
//   );
// }

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
  // Initialize an object to store the counts of each choice
  const choiceCounts: { [property: string]: number } = {};

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
        // Handle the scenario where the answer is not one of the choices
        // Increment the count for "Other"
        if (choiceCounts.hasOwnProperty('Other')) {
          choiceCounts['Other']++;
        } else {
          choiceCounts['Other'] = 1;
        }
      }
    });
  });

  // Extract the counts to an array to use as data for the BarChart
  const data = choices.map((choice) => choiceCounts[choice]);

  // Render function for the scrollable list (Copied from MUI)
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <BarChart
        xAxis={[{ scaleType: 'band', data: choices }]}
        series={[{ data: data }]}
        width={500}
        height={300}
      />
      <Box
        sx={{
          width: '100%',
          height: 400,
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={200}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
}
