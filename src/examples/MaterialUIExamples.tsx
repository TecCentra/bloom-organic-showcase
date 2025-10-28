/**
 * Material UI Toast and Confirmation Examples
 * 
 * This file demonstrates how to use Material UI components for
 * confirmations and toast notifications with actions.
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import { useMaterialToast } from '@/hooks/useMaterialToast';

export default function MaterialUIExamples() {
  const { confirm } = useMaterialConfirm();
  const { toast } = useMaterialToast();

  // Example 1: Simple success toast
  const handleSimpleToast = () => {
    toast({
      title: 'Success!',
      description: 'Operation completed successfully',
      variant: 'success',
    });
  };

  // Example 2: Error toast
  const handleErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  };

  // Example 3: Toast with action (e.g., Undo)
  const handleToastWithAction = () => {
    let count = 0;
    toast({
      title: 'Item deleted',
      description: 'The item has been removed',
      variant: 'default',
      action: {
        label: 'Undo',
        onClick: () => {
          count++;
          toast({
            title: 'Restored',
            description: 'Item has been restored',
            variant: 'success',
            duration: 3000,
          });
        },
      },
      duration: 8000, // Give user time to undo
    });
  };

  // Example 4: Simple confirmation dialog
  const handleSimpleConfirm = async () => {
    const confirmed = await confirm({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
    });

    if (confirmed) {
      toast({
        title: 'Confirmed',
        description: 'Action was confirmed',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Cancelled',
        description: 'Action was cancelled',
        variant: 'default',
      });
    }
  };

  // Example 5: Delete confirmation (with red button)
  const handleDeleteConfirm = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'error',
    });

    if (confirmed) {
      toast({
        title: 'Deleted',
        description: 'Item has been permanently deleted',
        variant: 'destructive',
      });
    }
  };

  // Example 6: Custom confirmation with custom text
  const handleCustomConfirm = async () => {
    const confirmed = await confirm({
      title: 'Save Changes',
      message: 'Do you want to save your changes before leaving?',
      confirmText: 'Save',
      cancelText: 'Discard',
      confirmColor: 'primary',
    });

    if (confirmed) {
      toast({
        title: 'Saved',
        description: 'Your changes have been saved',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Discarded',
        description: 'Your changes were not saved',
        variant: 'default',
      });
    }
  };

  // Example 7: Toast with retry action
  const handleRetryAction = () => {
    toast({
      title: 'Upload Failed',
      description: 'Failed to upload file. Click retry to try again.',
      variant: 'destructive',
      action: {
        label: 'Retry',
        onClick: () => {
          toast({
            title: 'Retrying...',
            description: 'Attempting to upload again',
            variant: 'default',
            duration: 3000,
          });
        },
      },
    });
  };

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Material UI Examples</h1>

      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSimpleToast} variant="default">
              Show Success Toast
            </Button>
            <Button onClick={handleErrorToast} variant="destructive">
              Show Error Toast
            </Button>
            <Button onClick={handleToastWithAction} variant="outline">
              Toast with Undo Action
            </Button>
            <Button onClick={handleRetryAction} variant="outline">
              Toast with Retry Action
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confirmation Dialogs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSimpleConfirm} variant="default">
              Simple Confirmation
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete Confirmation
            </Button>
            <Button onClick={handleCustomConfirm} variant="outline">
              Custom Confirmation
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Basic Toast:</h3>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
{`const { toast } = useMaterialToast();

toast({
  title: 'Success!',
  description: 'Operation completed',
  variant: 'success', // 'success', 'destructive', or 'default'
});`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Toast with Action:</h3>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
{`toast({
  title: 'Item deleted',
  description: 'Click undo to restore',
  action: {
    label: 'Undo',
    onClick: () => {
      // Undo logic here
    },
  },
});`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Confirmation Dialog:</h3>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
{`const { confirm } = useMaterialConfirm();

const confirmed = await confirm({
  title: 'Delete Item',
  message: 'Are you sure?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  confirmColor: 'error',
});

if (confirmed) {
  // User clicked confirm
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


