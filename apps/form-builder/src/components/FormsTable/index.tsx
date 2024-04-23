'use client';
import { FormResponse } from '@hack4impact-utk/internal-models';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

interface props {
  forms: FormResponse[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const responders = ['Student', 'Member', 'Anyone'];

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

  const [visibleForms, setVisibleForms] = useState<FormResponse[]>(props.forms);

  const rows: GridValidRowModel[] = visibleForms.map((form) => {
    const responseCount = form.submissions.length;
    let anon;
    form.isAnonymous ? (anon = 'Yes') : (anon = 'No');
    const updatedAtDate: Date = new Date(form.updatedAt);
    return {
      title: form.title,
      responderType: form.responderType,
      anon: anon,
      responseCount: responseCount,
      lastUpdate: updatedAtDate.toLocaleDateString(),
    };
  });

  const [responderTypeSelect, setResponderTypeSelect] = useState<string[]>([
    'Anyone',
  ]);

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
          MenuProps={MenuProps}
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
    </div>
  );
}
