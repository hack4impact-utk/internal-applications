import React from 'react';
import { createContext } from 'react';

export type SnackbarContextType = {
  openSnackbar: (message: string, severity: string) => void;
  closeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

type SnackbarProviderProps = {
  snackbar: (
    open: boolean,
    onClose: () => void,
    message?: string,
    severity?: string
  ) => React.ReactNode;
  children: React.ReactNode;
};

const SnackbarProvider = ({ snackbar, children }: SnackbarProviderProps) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');

  const onClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar: (message, severity) => {
          setOpen(true);
          setMessage(message);
          setSeverity(severity);
        },
        closeSnackbar: () => setOpen(false),
      }}
    >
      {children}
      {snackbar(open, onClose, message, severity)}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
