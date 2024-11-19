import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import { Chart as GoogleChart } from 'react-google-charts';
import { Chart as ChartJSChart, LinearScale, CategoryScale, ChartConfiguration } from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';


interface Props {
  question: FormQuestionResponse;
  responses: FormSubmissionResponse[];
}

export default function NumericQuestionAnalytics({
  question,
  responses
}: Props) {
  const chartRef = useRef<ChartJSChart | null>(null); // Ref to store chart instance

  const { mean, median, mode, HistogramFormattedData, option, BoxAndWhiskerData } = useMemo(() => {
    let mean: number;
    let median: number;
    let mode: number[] = [];
    const numbers: number[] = [];
    let total = 0;
    const occurrences: number[] = [];
    let maxOccur = 2;

    // summary statistics for box and whisker plot:
    let min: number = 0;
    let max: number = 0;
    let q1: number = 0;
    let q3: number = 0;
    let outliers: number[] = [];

    // Assumes all questions have the same limits to answer choices.
    const min_x = responses[0].questionResponses?.[0]?.question.numericOptions?.minVal;
    const max_x = responses[0].questionResponses?.[0]?.question.numericOptions?.maxVal;

    const title = question.title;

    const HistogramFormattedData: [string, string | number][] = [
      [" ", title],
    ];

    const option = {
      title: "Histogram",
      legend: { position: "none" },
      hAxis: {
        title: title,
        minValue: min_x,
        maxValue: max_x
      },
      vAxis: {
        title: "Number of Responses",
      }
    };

    // Register BoxPlotController and other necessary components
    ChartJSChart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);

    // Total up responses and make array of occurrences for each response
    for (const response of responses) {
      let email = "null";
      if (typeof response.responderEmail !== 'undefined') {
        email = response.responderEmail;
      }
      for (const questionResponse of response.questionResponses) {
        if (typeof questionResponse.answer !== 'number') {
          continue;
        } 

        // Update histogram data
        HistogramFormattedData.push([email, questionResponse.answer]);

        // Mean, median, and mode updates
        const number = questionResponse.answer;
        total += number;
        numbers.push(number);
        if (!occurrences[number]) occurrences[number] = 0;
        occurrences[number]++;
      }
    }

    // Calculate mean
    let length = numbers.length;
    mean = Math.round((total / length) * 100) / 100;

    // Calculate median
    numbers.sort((a, b) => a - b);
    if (length % 2) {
      median = Math.round(((numbers[length / 2 - 1] + numbers[length / 2]) / 2) * 100) / 100;
      q1 = numbers[Math.floor(length / 4)];
      q3 = numbers[Math.floor(3 * length / 4)];
    } else {
      median = Math.round(numbers[Math.floor(length / 2)] * 100) / 100;
      q1 = (numbers[Math.floor(length / 4) - 1] + numbers[Math.floor(length / 4)]) / 2;
      q3 = (numbers[Math.floor(3 * length / 4) - 1] + numbers[Math.floor(3 * length / 4)]) / 2;
    }

    min = numbers[0];
    max = numbers[length - 1];

    // Calculate IQR for outliers
    const IQR = q3 - q1;

    // Check and append outliers
    for (let i = 0; i < length; i++) {
      if (numbers[i] < (q1 - 1.5 * IQR)) {
        outliers.push(numbers[i]);
      } else {
        break;
      }
    }
    for (let i = length - 1; i > -1; i--) {
      if (numbers[i] > (q3 + 1.5 * IQR)) {
        outliers.push(numbers[i]);
      } else {
        break;
      }
    }

    // Calculate mode and get rid of outliers
    occurrences.forEach((num, i) => {
      if (occurrences[i] > maxOccur) {
        mode = [i];
        maxOccur = occurrences[i];
      } else if (occurrences[i] === maxOccur) {
        mode.push(i);
      }
    });

    // Get box and whisker plot data. This took forever.
    const BoxAndWhiskerData = {
      labels: [title],  
      datasets: [{
        label: "Box and Whisker Plot",
        data: [{
          min: min,       
          q1: q1,        
          median: median, 
          q3: q3,          
          max: max,     
          outliers: outliers 
        }],
        borderColor: '#ADD8E6',
        backgroundColor: 'white', 
        medianColor: 'black',
        medianWidth: 30,
        whiskerColor: 'black', 
        whiskerWidth: 20
      }]
    };
    
    return { mean, mode, median, HistogramFormattedData, option, BoxAndWhiskerData };
  }, [responses]);

  // Chart initialization in useEffect to ensure DOM is updated before accessing canvas
  useEffect(() => {
    const ctx = document.getElementById('BoxPlot') as HTMLCanvasElement;
    if (ctx && !chartRef.current) {
      const chartConfig: ChartConfiguration<'boxplot'> = {
        type: 'boxplot',
        data: BoxAndWhiskerData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            }
          }
        }
      };
      chartRef.current = new ChartJSChart(ctx, chartConfig);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [BoxAndWhiskerData]);

  return (
    <Fragment>
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

      {/* Some HTML to make both the Histogram and Box and Whisker Plot look nice*/}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <GoogleChart
          chartType="Histogram"
          width="100%"
          height="400px"
          data={HistogramFormattedData}
          options={option}
        />
        <div style={{ flex: 1, maxWidth: '500px' }}>
          <canvas id="BoxPlot" style={{ width: '100%', height: '400px' }} />
        </div>
      </div>
    </Fragment>
  );
}