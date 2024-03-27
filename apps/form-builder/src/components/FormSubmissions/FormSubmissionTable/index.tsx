'use client';
import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { FormSubmissionResponse } from '@hack4impact-utk/internal-models';

// const rows: GridRowsProp = [
//   { id: 1, col1: '', col2: '' },
//   { id: 2, col1: '', col2: '' },
//   { id: 3, col1: '', col2: '', },
// ];

interface Props {
  formSubmissions: FormSubmissionResponse[];
}

export default function FormSubmissionTable(props: Props) {
  //props: Props;
  //props.formSubmissions[0].
  const rows: GridRowsProp = [
    {
      col1: props.formSubmissions[0].responderEmail,
      col2: props.formSubmissions[0].createdAt,
    },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Responder Email', width: 150 },
    { field: 'col2', headerName: 'Date Submitted', width: 150 },
  ];
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
