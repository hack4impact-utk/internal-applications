'use client';
import { FormResponse } from '@hack4impact-utk/internal-models';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridValidRowModel,
} from '@mui/x-data-grid';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface props {
  forms: FormResponse[];
}

const responders = ['Student', 'Member', 'Anyone'];

export default function FormTable(props: props) {
  const [visibleForms, setVisibleForms] = useState<FormResponse[]>(props.forms);

  const [responderTypeSelect, setResponderTypeSelect] = useState<string[]>([
    'Student',
    'Member',
    'Anyone',
  ]);

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

  const rows: GridValidRowModel[] = visibleForms.map((form) => {
    const responseCount = form.submissions.length;
    let anon;
    form.isAnonymous ? (anon = 'Yes') : (anon = 'No');
    const updatedAtDate: Date = new Date(form.updatedAt);
    return {
      id: form._id,
      title: form.title,
      responderType: form.responderType,
      anon: anon,
      responseCount: responseCount,
      lastUpdate: updatedAtDate.toLocaleDateString(),
    };
  });

  const handleChange = (
    event: SelectChangeEvent<typeof responderTypeSelect>
  ) => {
    const value = event.target.value;
    setResponderTypeSelect(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setVisibleForms(
      props.forms.filter((form) => value.includes(form.responderType))
    );
  };

  const router = useRouter();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push('/forms/' + params.row.id);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="ResponderCheckboxLabel">
          Filter Responder Type
        </InputLabel>
        <Select
          labelId="ResponderCheckboxLabel"
          id="ResponderCheckbox"
          multiple
          value={responderTypeSelect}
          onChange={handleChange}
          input={<OutlinedInput label="Filter Responder Type" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {responders.map((responder) => (
            <MenuItem key={responder} value={responder}>
              <Checkbox checked={responderTypeSelect.indexOf(responder) > -1} />
              <ListItemText primary={responder} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DataGrid
        onRowDoubleClick={handleRowClick}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
