'use client';

import useSnackbar from '@/hooks/useSnackbar';
import { Button } from '@mui/material';

export default function DashboardPage() {
  const { openSnackbar } = useSnackbar();
  return (
    <>
      <h1>Dashboard page</h1>
      <Button
        variant="contained"
        onClick={() => {
          openSnackbar('hello world', 'success');
        }}
      >
        open snackbar
      </Button>
    </>
  );
}
