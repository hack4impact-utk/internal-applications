'use client';
import { useContext } from 'react';
import SnackbarProvider, {
  SnackbarContext,
  SnackbarContextType,
} from './SnackbarContext';

export default function useSnackbar() {
  const { openSnackbar, closeSnackbar } = useContext(
    SnackbarContext
  ) as SnackbarContextType;

  return { openSnackbar, closeSnackbar };
}

export { SnackbarProvider };
