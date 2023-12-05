'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SnackbarProvider
      snackbar={(open, onClose, message, severity) => (
        <Snackbar
          open={open}
          message={message}
          autoHideDuration={6000}
          onClose={onClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={onClose}
            severity={severity as AlertColor}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
