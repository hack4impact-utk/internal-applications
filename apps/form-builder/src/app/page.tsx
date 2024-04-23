import React from 'react';
import {
  FormQuestionResponse,
  FormSubmissionResponse,
} from '@hack4impact-utk/internal-models';
import MultipleChoiceQuestionAnalytics from '@/components/MultipleChoiceQuestionAnalytics/Index';

// Detailed mock data for the FormQuestionResponse
const mockQuestion: FormQuestionResponse = {
  _id: '656ea21e70fac31f8c4aab0f',
  title: 'Which design tools are you proficient in?',
  isRequired: true,
  questionType: 'MultipleChoice',
  multipleChoiceOptions: {
    options: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Figma',
      'Sketch',
      'InVision',
    ],
    allowOther: true,
    choiceType: 'Multiple',
  },
  createdAt: new Date('2023-12-05T04:07:58.579Z'),
  updatedAt: new Date('2023-12-05T04:07:58.579Z'),
};

// Correctly structured mock data for FormSubmissionResponse[]
const mockResponses: FormSubmissionResponse[] = [
  {
    _id: 'response1',
    createdAt: new Date(),
    updatedAt: new Date(),
    questionResponses: [
      {
        question: { ...mockQuestion },
        answer: 'Adobe Photoshop',
      },
    ],
  },
  {
    _id: 'response2',
    createdAt: new Date(),
    updatedAt: new Date(),
    questionResponses: [
      {
        question: { ...mockQuestion },
        answer: 'Adobe Illustrator',
      },
    ],
  },
  {
    _id: 'response3',
    createdAt: new Date(),
    updatedAt: new Date(),
    questionResponses: [
      {
        question: { ...mockQuestion },
        answer: 'Random',
      },
    ],
  },
  {
    _id: 'response3',
    createdAt: new Date(),
    updatedAt: new Date(),
    questionResponses: [
      {
        question: { ...mockQuestion },
        answer: 'Burger',
      },
    ],
  },
];

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <MultipleChoiceQuestionAnalytics
        question={mockQuestion}
        responses={mockResponses}
      />
    </div>
  );
}
