# API Endpoints Reference - Material UI Integration

This document lists all CRUD endpoints that have been integrated with Material UI confirmation dialogs and toast notifications.

## Product Endpoints

### 1. Update Product ✨ NEW
**Endpoint:** `PATCH {{baseUrl}}/products/{{productId}}`

**File:** `src/pages/admin/AdminProducts.tsx`

**Payload:**
```json
{
  "name": "Updated Product Name",
  "price": 34.99,
  "stock_quantity": 150,
  "description": "Updated description",
  "category_id": "category-uuid"
}
```

**Notes:**
- All fields are optional - only send fields you want to update
- Price is sent as a number (float)
- Stock quantity is sent as a number (integer)

**Implementation:**
```tsx
const handleUpdateProduct = async () => {
  // Prepare payload with only changed fields
  const payload: any = {};
  
  if (editFormData.name !== selectedProduct.name) {
    payload.name = editFormData.name;
  }
  if (editFormData.price !== selectedProduct.price) {
    payload.price = parseFloat(editFormData.price);
  }
  if (editFormData.stock_quantity !== selectedProduct.stock_quantity) {
    payload.stock_quantity = parseInt(editFormData.stock_quantity);
  }

  const response = await fetch(
    buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}`),
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
};
```

**Features:**
- ✅ Edit modal with form validation
- ✅ Only sends changed fields to API
- ✅ Success toast on update
- ✅ Error toast with **Retry action** on failure
- ✅ Loading state with spinner
- ✅ Disabled buttons during submission
- ✅ Updates local state after successful update
- ✅ Shows "No Changes" toast if nothing was modified

---

### 2. Delete Product
**Endpoint:** `DELETE {{baseUrl}}/products/{{productId}}`

**File:** `src/pages/admin/AdminProducts.tsx`

**Implementation:**
```tsx
const handleDelete = async (productId: number) => {
  const confirmed = await confirm({
    title: 'Delete Product',
    message: `Are you sure you want to delete "${productName}"?`,
    confirmText: 'Delete',
    confirmColor: 'error',
  });

  if (!confirmed) return;

  const response = await fetch(
    buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}`), 
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
- ✅ Error toast with **Retry action**
- ✅ Removes from local state

---

## User Endpoints

### 3. Delete User
**Endpoint:** `DELETE {{baseUrl}}/admin/users/{{userId}}`

**File:** `src/pages/admin/AdminUsers.tsx`

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Shows user's full name
- ✅ Success/error toasts
- ✅ Retry action on errors

---

## Category Endpoints

### 4. Delete Category
**Endpoint:** `DELETE {{baseUrl}}/categories/{{categoryId}}`

**File:** `src/pages/admin/AdminCategories.tsx`

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Success/error toasts
- ✅ Refreshes list after delete

---

## Image Endpoints

### 5. Delete Image (Ready for API)
**Endpoint:** `DELETE {{baseUrl}}/images/{{imageId}}`

**File:** `src/pages/admin/AdminImageManagement.tsx`

**Features:**
- ✅ Material UI confirmation dialog
- ✅ Success/error toasts with **Retry action**
- 🔄 API integration ready

---

## Common Material UI Features

### Update Operations

**Success Toast:**
```tsx
toast({
  title: 'Product Updated',
  description: `${productName} has been successfully updated`,
  variant: 'success',
});
```

**Error Toast with Retry:**
```tsx
toast({
  title: 'Update Failed',
  description: err.message || 'Failed to update product.',
  variant: 'destructive',
  action: {
    label: 'Retry',
    onClick: () => handleUpdateProduct(),
  },
});
```

**No Changes Toast:**
```tsx
toast({
  title: 'No Changes',
  description: 'No changes were made to the product',
  variant: 'default',
});
```

**Loading State:**
```tsx
<Button 
  onClick={handleUpdate}
  disabled={isSubmitting || !formData.name}
>
  {isSubmitting ? (
    <>
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      Updating...
    </>
  ) : (
    'Update Product'
  )}
</Button>
```

### Delete Operations

**Confirmation Dialog:**
```tsx
const confirmed = await confirm({
  title: 'Delete {Resource}',
  message: 'Are you sure? This action cannot be undone.',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  confirmColor: 'error',
});
```

**Success Toast:**
```tsx
toast({
  title: '{Resource} Deleted',
  description: `${resourceName} has been deleted`,
  variant: 'success',
});
```

**Error Toast:**
```tsx
toast({
  title: 'Delete Failed',
  description: err.message,
  variant: 'destructive',
  action: {
    label: 'Retry',
    onClick: () => handleDelete(id),
  },
});
```

---

## Implementation Checklist

### For Update Operations

- [x] Create edit form state
- [x] Populate form when edit button clicked
- [x] Handle form input changes
- [x] Validate required fields
- [x] Only send changed fields to API
- [x] Show loading state during submission
- [x] Disable form during submission
- [x] Update local state on success
- [x] Show success toast
- [x] Show error toast with retry action
- [x] Handle "no changes" scenario
- [x] Close modal on success

### For Delete Operations

- [x] Show Material UI confirmation dialog
- [x] Get resource name for display
- [x] Make DELETE API call
- [x] Update local state on success
- [x] Show success toast
- [x] Show error toast with retry action

---

## Form Validation

### Product Update Form

**Required Fields:**
- ✅ `name` - Product name (string)
- ✅ `price` - Price in KSH (number, > 0)
- ✅ `stock_quantity` - Stock quantity (integer, >= 0)

**Optional Fields:**
- `description` - Product description (string)
- `category_id` - Category UUID (string)

**Validation:**
```tsx
disabled={
  isSubmitting || 
  !editFormData.name || 
  !editFormData.price || 
  !editFormData.stock_quantity
}
```

---

## API Response Handling

### Success Response
Expected: 200 OK with updated resource

```tsx
if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
  throw new Error(errorData.message || 'Operation failed');
}

const updatedData = await response.json();
// Update local state
```

### Error Response
Expected: 4xx or 5xx with error message

```tsx
{
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

---

## Testing Guide

### Test Update Product

1. Go to Admin → Products
2. Click edit (pencil icon) on any product
3. Modify name, price, or stock quantity
4. Click "Update Product"
5. **Expected:**
   - Loading spinner appears
   - Button disabled
   - Form disabled
   - Modal closes on success
   - Green success toast appears
   - Product updated in table

### Test Validation

1. Edit a product
2. Clear the name field
3. Try to click "Update Product"
4. **Expected:**
   - Button is disabled
   - Cannot submit

### Test No Changes

1. Edit a product
2. Don't change anything
3. Click "Update Product"
4. **Expected:**
   - Info toast: "No changes were made"
   - Modal closes

### Test Error Handling

1. Edit a product (disconnect internet or use invalid auth)
2. Make changes and submit
3. **Expected:**
   - Red error toast appears
   - "Retry" button visible
   - Click retry to attempt again

### Test Delete Product

1. Click delete (trash icon) on any product
2. **Expected:**
   - Material UI dialog appears
   - Shows product name
   - Click "Cancel" - nothing happens
   - Click "Delete" - product removed, success toast

---

## Example cURL Commands

### Update Product
```bash
curl -X PATCH {{baseUrl}}/products/123 \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 34.99,
    "stock_quantity": 150
  }'
```

### Delete Product
```bash
curl -X DELETE {{baseUrl}}/products/123 \
  -H "Authorization: Bearer {token}"
```

---

## Summary

| Operation | Endpoint | Method | Material UI | Toast | Retry Action | Status |
|-----------|----------|--------|-------------|-------|--------------|--------|
| Update Product | `/products/{id}` | PATCH | ✅ Form | ✅ | ✅ | ✅ Implemented |
| Delete Product | `/products/{id}` | DELETE | ✅ Confirm | ✅ | ✅ | ✅ Implemented |
| Delete User | `/admin/users/{id}` | DELETE | ✅ Confirm | ✅ | ✅ | ✅ Implemented |
| Delete Category | `/categories/{id}` | DELETE | ✅ Confirm | ✅ | ✅ | ✅ Implemented |
| Delete Image | `/images/{id}` | DELETE | ✅ Confirm | ✅ | ✅ | 🔄 Ready |

---

**Last Updated:** October 28, 2024  
**Status:** ✅ All admin CRUD operations use Material UI


