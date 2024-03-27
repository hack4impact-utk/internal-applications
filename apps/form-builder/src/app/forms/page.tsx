// export default function Forms() {
//   return (
//     <div>
//       <p>forms will go here, hopefully!</p>
//     </div>
//   );
// }
// 'use client';
// import * as React from 'react';
// import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
// import { FormSubmissionResponse } from '@hack4impact-utk/internal-models';

// const columns: GridColDef[] = [
//   { field: 'col1', headerName: 'Submission ID', width: 150 },
//   { field: 'col2', headerName: 'Responder Email', width: 150 },
//   { field: 'col3', headerName: 'Date Submitted', width: 150 },
// ];

// const rows: GridRowsProp = [
//   { id: 1, col1: 'ID 1', col2: 'johndoe@gmail.com', col3: 'MM/DD/YYYY' },
//   { id: 2, col1: 'ID 2', col2: 'johndoe@gmail.com', col3: 'MM/DD/YYYY' },
//   { id: 3, col1: 'ID 3', col2: 'johndoe@gmail.com', col3: 'MM/DD/YYYY' },
// ];

// interface Props {
//   formSubmissions: FormSubmissionResponse[];
// }

// export default function FormSubmissionTable(props: Props) {
//   //props: Props;
//   return (
//     <div style={{ height: 200, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns} />
//     </div>
//   );
// }

import * as React from 'react';
import { getFormSubmissions } from '@/server/actions/formSubmissions';
import FormSubmissionTable from '@/components/FormSubmissions/FormSubmissionTable';

export default async function test() {
  const submissions = await getFormSubmissions('656ea21e70fac31f8c4aab52');
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
}
