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
    let mean: number; 
    let median: number; 
    let mode: number[] = [];
    const numbers: number[] = []; 
    let total = 0; 
    let occurrences: number[] = []; 
    let maxOccur = 2; 

    // total up responses and make array of occurences for each response
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

    // calculate mean
    mean = Math.round(total / numbers.length * 100) / 100; 
    
    // calculate median
    numbers.sort; 
    if(numbers.length % 2 !== 0){
      median = Math.round(numbers[Math.floor(numbers.length/2)] * 100) / 100; 
    } else{
      median = Math.round((numbers[numbers.length/2 - 1] + numbers[numbers.length/2])/2 * 100) / 100; 
    }

    // calculate mode
    occurrences.forEach((num, i) => {
      if(occurrences[i] > maxOccur){
        console.log(num, i); 
        mode = [i]; 
        maxOccur = occurrences[i]; 
      } else if(occurrences[i] == maxOccur){
        mode.push(i); 
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
        <ListItemText>Mode: {mode.length ? mode.join(", ") : "None"}</ListItemText>
      </ListItem>
    </List>
  );
}
