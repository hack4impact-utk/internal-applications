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
  //create the rows for table using the map function that iterates each element in formSubmission.
  const rows: GridValidRowModel[] = props.formSubmissions
    .map((submission_element) => {
      let createdAtDate;
      let responderEmail;
      //check if the responderEmail is a string and if it exists. If string doesn't exists, print out Anonymous.
      if (typeof submission_element.responderEmail === 'string') {
        if (!submission_element.createdAt) {
          responderEmail = 'Anonymous';
        } else {
          responderEmail = submission_element.responderEmail;
        }
      } else {
        //if not a string, return null
        return null;
      }

      if (submission_element.createdAt instanceof Date) {
        // Check if submission_element.createdAt is a Date object
        createdAtDate = submission_element.createdAt;
      } else if (typeof submission_element.createdAt === 'string') {
        // If not a Date object, then parse the string object to a Date Object
        const parsedDate = Date.parse(submission_element.createdAt);
        if (!isNaN(parsedDate)) {
          //if successfully parsed, then createdAtDate equals the parsedDate.
          createdAtDate = new Date(parsedDate);
        } else {
          //if parsing fails, return null
          return null;
        }
      } else {
        //if neither a string or Date object, return null
        return null;
      }

      //return the const rows object with submission id and two fields, col1 and col2
      return {
        id: submission_element._id,
        col1: responderEmail,
        col2: createdAtDate.toLocaleDateString(),
      };
    })

    //filter out any null element and pass the rows array to GridValidRowModel[]
    .filter((row) => row !== null) as GridValidRowModel[];

  //define the const columns
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Responder Email', width: 300 },
    { field: 'col2', headerName: 'Date Submitted', width: 150 },
  ];
  //return the table. the height and width of the table can be adjusted easily from here.
  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

//test for the FormSubmissionTable Component
/*import * as React from 'react';
import { getFormSubmissions } from '@/server/actions/formSubmissions';
import FormSubmissionTable from '@/components/FormSubmissions/FormSubmissionTable';

export default async function test() {
  const submissions = JSON.parse(
    JSON.stringify(await getFormSubmissions('656ea21e70fac31f8c4aab56'))
  );
  console.log(submissions);
  //   console.log(submissions);
  if (!submissions) {
    return <>Not Found</>;
  }
  return (
    <div style={{ height: 300, width: '100%' }}>
      <FormSubmissionTable formSubmissions={submissions}></FormSubmissionTable>
    </div>
  );
} */
