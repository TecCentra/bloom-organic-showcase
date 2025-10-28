# Material UI Integration Guide

This project now uses Material UI (MUI) for all confirmation dialogs and toast notifications, providing a consistent and professional user experience.

## Overview

Material UI has been integrated to replace native browser alerts and provide enhanced toast notifications with action buttons.

## Features Implemented

### 1. **Material UI Confirmation Dialogs**
- Beautiful modal dialogs for user confirmations
- Customizable button text and colors
- Async/await pattern for easy usage
- Replace all `window.confirm()` calls

### 2. **Material UI Toast Notifications**
- Snackbar-based notifications at the top center of the screen
- Support for success, error, and info variants
- **Action buttons** for undo, retry, and other actions
- Auto-dismiss with configurable duration
- Multiple toasts stack vertically

## Installation

Material UI and dependencies have been installed:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled --legacy-peer-deps
```

## Components Created

### 1. `MaterialUIProvider.tsx`
Provides the MUI theme configuration with colors matching the organic theme.

### 2. `useMaterialConfirm.tsx`
Hook for creating confirmation dialogs.

### 3. `useMaterialToast.tsx`
Hook for displaying toast notifications with optional action buttons.

## Usage

### Confirmation Dialogs

```tsx
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';

function MyComponent() {
  const { confirm } = useMaterialConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'error', // 'primary', 'secondary', 'error', 'warning', 'info', 'success'
    });

    if (confirmed) {
      // User clicked confirm
      // Perform delete action
    } else {
      // User clicked cancel
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### Toast Notifications

#### Basic Toast

```tsx
import { useMaterialToast } from '@/hooks/useMaterialToast';

function MyComponent() {
  const { toast } = useMaterialToast();

  const handleSave = () => {
    // Perform save operation
    toast({
      title: 'Success',
      description: 'Your changes have been saved',
      variant: 'success', // 'success', 'destructive', 'default'
      duration: 4000, // Optional, defaults to 6000ms
    });
  };

  return <button onClick={handleSave}>Save</button>;
}
```

#### Toast with Action Button

```tsx
const handleRemoveItem = (item) => {
  // Remove the item
  removeFromCart(item.id);

  // Show toast with undo action
  toast({
    title: 'Item removed',
    description: `${item.name} removed from cart`,
    variant: 'default',
    action: {
      label: 'Undo',
      onClick: () => {
        addToCart(item);
        toast({
          title: 'Item restored',
          description: `${item.name} added back to cart`,
          variant: 'success',
          duration: 3000,
        });
      },
    },
    duration: 8000, // Give user time to click undo
  });
};
```

## Configuration Options

### Confirmation Dialog Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | 'Confirm' | Dialog title |
| `message` | string | Required | Confirmation message |
| `confirmText` | string | 'Confirm' | Confirm button text |
| `cancelText` | string | 'Cancel' | Cancel button text |
| `confirmColor` | string | 'primary' | Button color variant |

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | Optional | Toast title |
| `description` | string | Optional | Toast message |
| `message` | string | Optional | Alias for description |
| `variant` | string | 'default' | 'success', 'destructive', 'default' |
| `duration` | number | 6000 | Auto-dismiss duration in ms |
| `action` | object | Optional | Action button configuration |
| `action.label` | string | Required | Action button label |
| `action.onClick` | function | Required | Action button click handler |

## Files Updated

The following files have been updated to use Material UI:

1. **`src/App.tsx`** - Added MUI providers
2. **`src/pages/admin/AdminCategories.tsx`** - Uses confirmation dialogs and toasts
3. **`src/context/CartContext.tsx`** - Uses toasts with undo actions
4. **`src/pages/ForgotPassword.tsx`** - Uses toasts for notifications
5. **`src/components/ForgotPasswordModal.tsx`** - Uses toasts for notifications

## Examples

See `src/examples/MaterialUIExamples.tsx` for comprehensive examples of:
- Basic toasts (success, error, info)
- Toasts with actions (undo, retry)
- Simple confirmations
- Delete confirmations with custom styling
- Custom confirmation dialogs

## Theme Customization

The Material UI theme is configured in `src/components/MaterialUIProvider.tsx`:

```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981', // Green to match organic theme
    },
    secondary: {
      main: '#059669',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
  },
});
```

You can customize these colors to match your brand.

## Benefits

✅ **Professional UI** - Material Design provides a polished, modern look  
✅ **Action Buttons** - Enable undo, retry, and other actions directly from toasts  
✅ **Consistent Experience** - All confirmations and notifications use the same design  
✅ **Better UX** - Non-blocking notifications that don't interrupt user flow  
✅ **Customizable** - Easy to style and configure per use case  
✅ **Accessible** - Built-in keyboard navigation and screen reader support  

## Migration from Old System

The old Radix UI toast system and `window.confirm()` calls have been replaced:

- ❌ `window.confirm()` → ✅ `useMaterialConfirm()`
- ❌ `useToast()` from Radix → ✅ `useMaterialToast()`

The API is compatible, so minimal code changes were needed.

## Best Practices

1. **Use appropriate variants**: Success for positive actions, destructive for errors
2. **Provide actions when useful**: Undo for deletions, Retry for failures
3. **Keep messages concise**: Short, clear descriptions work best
4. **Use confirmation for destructive actions**: Always confirm deletes and irreversible changes
5. **Set appropriate durations**: Longer for actions that need user response (undo), shorter for info

## Support

For questions or issues with Material UI components, refer to:
- [Material UI Documentation](https://mui.com/)
- `src/examples/MaterialUIExamples.tsx` for working examples


