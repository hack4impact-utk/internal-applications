import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { FormQuestionResponse, FormSubmissionResponse } from '@hack4impact-utk/internal-models';

interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

export default function NumericQuestionAnalytics({
  question,
  responses,
}: Props) {
  const { mean, median, mode } = useMemo(() => {
    let mean: number | undefined = undefined, median: number | undefined = undefined, mode: number[] = [];
    const numbers: number[] = []; 
    let total = 0, occurrences: number[] = [], maxOccur = 0; 

    for (const response of responses) {
      for (const questionResponse of response.questionResponses) {
        if (typeof questionResponse.answer !== 'number') {
          continue;
        }

        let number = questionResponse.answer; 
        total += number; 
        numbers.push(number);
        if(!occurrences[number]) occurrences[number] = 0; 
        occurrences[number]++;
      }
    }

    mean = Math.round(total / numbers.length * 100) / 100; 

    numbers.sort; 
    if(numbers.length%2 !== 0){
      median = Math.round(numbers[Math.floor(numbers.length/2)] * 100) / 100; 
    } else{
      median = Math.round((numbers[numbers.length/2 - 1] + numbers[numbers.length/2])/2 * 100) / 100; 
    }

    occurrences.forEach(num => {
      if(occurrences[num] > maxOccur){
        mode = [num]; 
        maxOccur = occurrences[num]; 
      } else if(occurrences[num] == maxOccur){
        mode.push(num); 
      }
    })

    return {
      mean,
      mode,
      median,
    };
  }, [responses]);

  return (
    <List>
      <ListItem>
        <ListItemText>Mean: {mean}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Median: {median}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Mode: {mode}</ListItemText>
      </ListItem>
    </List>
  );
}
