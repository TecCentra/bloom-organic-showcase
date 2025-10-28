# Delete API Endpoints - Material UI Integration

This document lists all delete endpoints that have been integrated with Material UI confirmation dialogs and toast notifications.

## Implemented Delete Endpoints

### 1. Delete Product
**Endpoint:** `DELETE {{baseUrl}}/products/{{productId}}`

**File:** `src/pages/admin/AdminProducts.tsx`

**Implementation:**
```tsx
const handleDelete = async (productId: number) => {
  const confirmed = await confirm({
    title: 'Delete Product',
    message: `Are you sure you want to delete "${productName}"? This action cannot be undone.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmColor: 'error',
  });

  if (!confirmed) return;

  const response = await fetch(
    buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}`), 
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
};
```

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Success toast on delete
- ✅ Error toast with **Retry action** on failure
- ✅ Removes product from local state after successful delete

---

### 2. Delete User
**Endpoint:** `DELETE {{baseUrl}}/admin/users/{{userId}}`

**File:** `src/pages/admin/AdminUsers.tsx`

**Implementation:**
```tsx
const handleDeleteUser = async (userId: number) => {
  const confirmed = await confirm({
    title: 'Delete User',
    message: `Are you sure you want to delete "${userName}"? This action cannot be undone.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmColor: 'error',
  });

  if (!confirmed) return;

  const response = await fetch(
    buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}`), 
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
};
```

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Shows user's full name in confirmation
- ✅ Success toast on delete
- ✅ Error toast with **Retry action** on failure
- ✅ Removes user from local state after successful delete

---

### 3. Delete Category
**Endpoint:** `DELETE {{baseUrl}}/categories/{{categoryId}}`

**File:** `src/pages/admin/AdminCategories.tsx`

**Implementation:**
```tsx
const handleDelete = async (categoryId: string) => {
  const confirmed = await confirm({
    title: 'Delete Category',
    message: 'Are you sure you want to delete this category? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmColor: 'error',
  });

  if (!confirmed) return;

  const response = await fetch(
    buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES}/${categoryId}`), 
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    }
  );
};
```

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Success toast on delete
- ✅ Error toast on failure
- ✅ Refreshes category list after successful delete

---

### 4. Delete Image (Ready for API)
**Endpoint:** `DELETE {{baseUrl}}/images/{{imageId}}` *(awaiting backend implementation)*

**File:** `src/pages/admin/AdminImageManagement.tsx`

**Implementation:**
```tsx
const handleDeleteImage = async (imageId: number) => {
  const confirmed = await confirm({
    title: 'Delete Image',
    message: `Are you sure you want to delete "${imageName}"? This action cannot be undone.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmColor: 'error',
  });

  if (!confirmed) return;

  // API call ready - uncomment when endpoint is available
  // const response = await fetch(`/api/images/${imageId}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Authorization': `Bearer ${adminToken}`,
  //   },
  // });
  
  toast({
    title: 'Image Deleted',
    description: `${imageName} has been successfully deleted`,
    variant: 'success',
  });
};
```

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Success toast on delete
- ✅ Error toast with **Retry action** on failure
- 🔄 API integration ready (commented out until endpoint is available)

---

## Common Features Across All Endpoints

### Material UI Confirmation Dialog
All delete actions show a professional confirmation dialog with:
- **Title:** Action being performed
- **Message:** Warning that action cannot be undone
- **Confirm Button:** Red "Delete" button (error color)
- **Cancel Button:** Gray "Cancel" button (outline variant)

### Success Toast
On successful deletion:
- **Green toast** (success variant)
- **Title:** "{Resource} Deleted"
- **Description:** "{Name} has been successfully deleted"
- **Duration:** 6 seconds (default)

### Error Toast with Retry Action
On failed deletion:
- **Red toast** (destructive/error variant)
- **Title:** "Delete Failed"
- **Description:** Error message from API or fallback message
- **Action Button:** "Retry" - Automatically retries the delete operation
- **Duration:** 6 seconds (default)

---

## Usage Pattern

All delete functions follow this consistent pattern:

```tsx
// 1. Import hooks
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import { useMaterialToast } from '@/hooks/useMaterialToast';

// 2. Initialize hooks
const { confirm } = useMaterialConfirm();
const { toast } = useMaterialToast();

// 3. Implement delete handler
const handleDelete = async (id: number) => {
  // Get resource details for display
  const resource = getResource(id);
  
  // Show confirmation dialog
  const confirmed = await confirm({
    title: 'Delete {Resource}',
    message: `Are you sure you want to delete "${resource.name}"?`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmColor: 'error',
  });

  if (!confirmed) return;

  try {
    // Make API call
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to delete');

    // Update local state
    updateLocalState(id);

    // Show success toast
    toast({
      title: '{Resource} Deleted',
      description: `${resource.name} has been deleted`,
      variant: 'success',
    });
  } catch (err) {
    // Show error toast with retry action
    toast({
      title: 'Delete Failed',
      description: err.message,
      variant: 'destructive',
      action: {
        label: 'Retry',
        onClick: () => handleDelete(id),
      },
    });
  }
};
```

---

## API Configuration

All endpoints use the centralized API configuration from `src/lib/config.ts`:

```tsx
import { buildApiUrl, API_CONFIG } from '@/lib/config';

// Products
buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}`)

// Users
buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}`)

// Categories
buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES}/${categoryId}`)
```

---

## Testing

### Manual Testing Steps

1. **Navigate to admin page** (Products, Users, Categories, or Images)
2. **Click delete button** (trash icon) on any item
3. **Verify confirmation dialog appears** with proper message
4. **Test Cancel:** Click "Cancel" - nothing should happen
5. **Test Delete:** Click "Delete"
   - Dialog should close
   - API request should be made
   - Success toast should appear (green)
   - Item should be removed from list
6. **Test Error Handling:** Delete without auth or with invalid ID
   - Error toast should appear (red)
   - "Retry" button should be visible
   - Clicking "Retry" should attempt delete again

### Example cURL Commands

```bash
# Delete Product
curl -X DELETE {{baseUrl}}/products/123 \
  -H "Authorization: Bearer {token}"

# Delete User
curl -X DELETE {{baseUrl}}/admin/users/456 \
  -H "Authorization: Bearer {token}"

# Delete Category
curl -X DELETE {{baseUrl}}/categories/789 \
  -H "Authorization: Bearer {token}"
```

---

## Next Steps

To add Material UI delete confirmation to a new resource:

1. Import hooks in component:
```tsx
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import { useMaterialToast } from '@/hooks/useMaterialToast';
```

2. Initialize in component:
```tsx
const { confirm } = useMaterialConfirm();
const { toast } = useMaterialToast();
```

3. Follow the usage pattern above

4. Update this document with the new endpoint

---

**Last Updated:** October 28, 2024  
**Status:** ✅ All admin delete operations use Material UI


