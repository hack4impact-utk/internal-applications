'use client'; //this component runs with the client and thus requires 'use client'
import * as React from 'react';
import { GridValidRowModel } from '@mui/x-data-grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormSubmissionResponse } from '@hack4impact-utk/internal-models';

interface Props {
  formSubmissions: FormSubmissionResponse[];
}

//FormSubmissionTable Component that takes in FormSubmissionResponse[]
export default function FormSubmissionTable(props: Props) {
  // Check if formSubmissions is null or undefined** This is to prevent run time erros
  if (props.formSubmissions == null) {
    return <div>Error: Form submissions data is not available.</div>;
  }
  //create the rows for table using the map function that iterates each element in formSubmission.
  const rows: GridValidRowModel[] = props.formSubmissions.map(
    (submission_element) => {
      let responderEmail;
      if (!submission_element.responderEmail) {
        responderEmail = 'Anonymous';
      } else {
        responderEmail = submission_element.responderEmail;
      }
      const createdAtDate: Date = new Date(submission_element.createdAt);
      //return the const rows object with submission id and two fields, col1 and col2
      return {
        id: submission_element._id,
        col1: responderEmail,
        col2: createdAtDate.toLocaleDateString(),
      };
    }
  );
  //define the const columns
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Responder Email', width: 300 },
    { field: 'col2', headerName: 'Date Submitted', width: 150 },
  ];
  //return the table.
  return <DataGrid rows={rows} columns={columns} />;
}
