'use client';
import { FormResponse } from '@hack4impact-utk/internal-models';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface props {
  forms: FormResponse[];
}

export default function FormTable(props: props) {
  if (props.forms == null) {
    return <div>Error: Forms data is empty.</div>;
  }

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Form Title', flex: 1, maxWidth: 300 },
    {
      field: 'responderType',
      headerName: 'Responder Type',
      flex: 0.5,
      minWidth: 125,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'anon',
      headerName: 'Anonymous?',
      flex: 0.5,
      minWidth: 105,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'responseCount',
      headerName: 'Response Count',
      flex: 0.5,
      minWidth: 125,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'lastUpdate',
      headerName: 'Last Updated',
      flex: 0.5,
      minWidth: 115,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const rows: GridValidRowModel[] = props.forms.map((forms) => {
    const responseCount = forms.submissions.length;
    let anon;
    forms.isAnonymous ? (anon = 'Yes') : (anon = 'No');
    const updatedAtDate: Date = new Date(forms.updatedAt);
    return {
      title: forms.title,
      responderType: forms.responderType,
      anon: anon,
      responseCount: responseCount,
      lastUpdate: updatedAtDate.toLocaleDateString(),
    };
  });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row: any) =>
        row.title +
        row.responderType +
        row.anon +
        row.responseCount +
        row.lastUpdate
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
    />
  );
}
