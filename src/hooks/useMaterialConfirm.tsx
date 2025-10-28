import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: 'Confirm',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmColor: 'primary',
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions({
        title: opts.title || 'Confirm',
        message: opts.message,
        confirmText: opts.confirmText || 'Confirm',
        cancelText: opts.cancelText || 'Cancel',
        confirmColor: opts.confirmColor || 'primary',
      });
      setResolver(() => resolve);
      setOpen(true);
    });
  }, []);

  const handleConfirm = () => {
    if (resolver) resolver(true);
    setOpen(false);
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    setOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 300,
          },
        }}
      >
        <DialogTitle id="confirm-dialog-title">{options.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {options.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCancel} variant="outlined">
            {options.cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={options.confirmColor}
            autoFocus
          >
            {options.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useMaterialConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useMaterialConfirm must be used within a ConfirmProvider');
  }
  return context;
}


