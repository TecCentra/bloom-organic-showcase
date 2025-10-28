import { createContext, useContext, useState, ReactNode, useCallback, SyntheticEvent } from 'react';
import { Snackbar, Alert, AlertColor, AlertTitle, Button } from '@mui/material';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  title?: string;
  description?: string;
  message?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
  action?: ToastAction;
}

interface Toast {
  id: string;
  title?: string;
  description?: string;
  severity: AlertColor;
  duration: number;
  action?: ToastAction;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(7);
    
    // Map variant to MUI severity
    let severity: AlertColor = 'info';
    if (options.variant === 'success') severity = 'success';
    else if (options.variant === 'destructive') severity = 'error';
    else severity = 'info';

    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description || options.message,
      severity,
      duration: options.duration || 6000,
      action: options.action,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const handleClose = (id: string) => (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.map((t, index) => (
        <Snackbar
          key={t.id}
          open={true}
          autoHideDuration={t.duration}
          onClose={handleClose(t.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            top: `${24 + index * 70}px !important`,
          }}
        >
          <Alert
            onClose={handleClose(t.id)}
            severity={t.severity}
            variant="filled"
            sx={{ 
              width: '100%',
              minWidth: 300,
              boxShadow: 3,
            }}
            action={
              t.action && (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    t.action!.onClick();
                    handleClose(t.id)();
                  }}
                  sx={{ 
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  {t.action.label}
                </Button>
              )
            }
          >
            {t.title && <AlertTitle>{t.title}</AlertTitle>}
            {t.description}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
}

export function useMaterialToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useMaterialToast must be used within a ToastProvider');
  }
  return context;
}

