'use client';
import { FormResponse } from '@hack4impact-utk/internal-models';
import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
  GridToolbar,
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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [selectionModel, setSelectionModel] = useState<string[]>([]);

  const handleOpenDialog = (formId: string) => {
    setSelectedFormId(formId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFormId) {
      setVisibleForms((prev) =>
        prev.filter((form) => form._id !== selectedFormId)
      );
    }
    setOpenDialog(false);
    setSelectedFormId(null);
  };

  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Form Title',
      flex: 1,
      maxWidth: 300,
      renderCell: (params) => (
        <button
          onClick={() => {
            router.push('/forms/' + params.row.id);
          }}
          style={{
            width: '100%',
            height: '75%',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            padding: '8px 12px',
            cursor: 'pointer',
          }}
          title={params.value}
        >
          {params.value}
        </button>
      ),
    },
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
    {
      field: 'delete',
      headerName: 'Delete Form',
      flex: 0.5,
      minWidth: 115,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleOpenDialog(params.row.id)}
          style={{
            padding: '5px 10px',
            backgroundColor: '#f28b82',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  const rows: GridValidRowModel[] = visibleForms.map((form) => {
    const responseCount = form.submissions.length;
    const anon = form.isAnonymous ? 'Yes' : 'No';
    const updatedAtDate = new Date(form.updatedAt);

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
      typeof value === 'string' ? value.split(',') : value
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
        >
          {responders.map((responder) => (
            <MenuItem key={responder} value={responder}>
              <Checkbox checked={responderTypeSelect.includes(responder)} />
              <ListItemText primary={responder} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ClickAwayListener onClickAway={() => setSelectionModel([])}>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelection) =>
              setSelectionModel(newSelection as string[])
            }
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
      </ClickAwayListener>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to delete this form?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove the form from your view
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete Form
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
