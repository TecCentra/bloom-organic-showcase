# Product Update Feature - Quick Reference

## ✨ NEW: Update Product with Material UI

The product update feature has been fully implemented with Material UI components, form validation, and toast notifications.

## Endpoint

**URL:** `PATCH {{baseUrl}}/products/{{productId}}`

**Method:** PATCH

**Authentication:** Bearer Token (Admin)

## Request Payload

```json
{
  "name": "Updated Product Name",
  "price": 34.99,
  "stock_quantity": 150,
  "description": "Updated product description",
  "category_id": "category-uuid"
}
```

### Payload Notes

- **All fields are optional** - only send the fields you want to update
- `price` must be a number (float) greater than 0
- `stock_quantity` must be an integer >= 0
- The implementation **automatically sends only changed fields**

## Implementation Features

### ✅ Smart Form
- Pre-populates with current product data
- Tracks changes from original values
- Only sends modified fields to API
- Real-time validation

### ✅ Material UI Components
- Professional edit modal dialog
- Controlled form inputs
- Category dropdown
- Disabled states during submission

### ✅ Form Validation
**Required Fields:**
- Product name
- Price (must be > 0)
- Stock quantity (must be >= 0)

**Optional Fields:**
- Description
- Category

**Submit button is disabled when:**
- Form is being submitted
- Required fields are empty
- Invalid values

### ✅ Loading States
- Spinner icon during submission
- Button text changes to "Updating..."
- All form inputs disabled
- Cancel button disabled

### ✅ Toast Notifications

**Success:**
```tsx
toast({
  title: 'Product Updated',
  description: 'Product Name has been successfully updated',
  variant: 'success',
});
```

**Error with Retry:**
```tsx
toast({
  title: 'Update Failed',
  description: 'Error message from API',
  variant: 'destructive',
  action: {
    label: 'Retry',
    onClick: () => handleUpdateProduct(),
  },
});
```

**No Changes:**
```tsx
toast({
  title: 'No Changes',
  description: 'No changes were made to the product',
  variant: 'default',
});
```

## User Flow

1. **Navigate** to Admin → Products
2. **Click** edit icon (pencil) on any product
3. **Edit modal opens** with current product data
4. **Modify** fields (name, price, stock, description, category)
5. **Click** "Update Product" button
6. **Loading** state shows with spinner
7. **API call** sends only changed fields
8. **Success:**
   - Modal closes
   - Green toast appears
   - Product updates in table
9. **Error:**
   - Red toast with retry button
   - Form stays open
   - Click retry to try again

## Code Example

### Basic Update
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

  // Make API call
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

  if (!response.ok) throw new Error('Update failed');

  // Update local state
  setProducts(prev =>
    prev.map(p =>
      p.product_id === productId ? { ...p, ...payload } : p
    )
  );

  // Show success toast
  toast({
    title: 'Product Updated',
    description: `${payload.name} updated successfully`,
    variant: 'success',
  });
};
```

## API Response

### Success Response (200 OK)
```json
{
  "product_id": "uuid",
  "name": "Updated Product Name",
  "price": 34.99,
  "stock_quantity": 150,
  "description": "Updated description",
  "category_id": "category-uuid",
  "updated_at": "2024-10-28T12:00:00Z"
}
```

### Error Response (4xx/5xx)
```json
{
  "message": "Validation error: Price must be greater than 0",
  "error": "VALIDATION_ERROR"
}
```

## Testing

### Test Cases

#### 1. Update Product Name
- Edit product
- Change name from "Product A" to "Product B"
- Click update
- Verify name updated in table

#### 2. Update Price
- Edit product
- Change price from 25.00 to 34.99
- Click update
- Verify price updated in table

#### 3. Update Multiple Fields
- Edit product
- Change name, price, and stock
- Click update
- Verify all fields updated

#### 4. No Changes
- Edit product
- Don't modify anything
- Click update
- See "No Changes" toast
- Modal closes

#### 5. Validation Error
- Edit product
- Clear name field
- Verify button is disabled
- Cannot submit

#### 6. API Error
- Edit product (with invalid auth or offline)
- Make changes
- Click update
- See error toast with "Retry" button
- Click retry

#### 7. Loading State
- Edit product
- Make changes
- Click update
- See spinner and "Updating..." text
- Form is disabled
- Cannot click buttons

### Manual Testing with cURL

```bash
# Update product name and price
curl -X PATCH http://localhost:3000/api/products/123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "price": 39.99
  }'

# Update only stock quantity
curl -X PATCH http://localhost:3000/api/products/123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stock_quantity": 200
  }'
```

## Form State Management

### Edit Form State
```tsx
const [editFormData, setEditFormData] = useState({
  name: '',
  description: '',
  price: '',
  stock_quantity: '',
  category_id: '',
});
```

### Populate on Edit
```tsx
const handleEdit = (product) => {
  setEditFormData({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    stock_quantity: product.stock_quantity || '',
    category_id: product.category_id || '',
  });
  setIsEditModalOpen(true);
};
```

### Controlled Inputs
```tsx
<Input 
  value={editFormData.name}
  onChange={(e) => setEditFormData({ 
    ...editFormData, 
    name: e.target.value 
  })}
  disabled={isSubmitting}
/>
```

## Benefits

✅ **User-Friendly** - Clear feedback with toasts  
✅ **Smart** - Only sends changed fields  
✅ **Safe** - Form validation prevents bad data  
✅ **Responsive** - Loading states during submission  
✅ **Error Recovery** - Retry button on failures  
✅ **Efficient** - Updates local state immediately  
✅ **Accessible** - Disabled states and ARIA labels  
✅ **Professional** - Material UI design  

## Related Features

- ✅ **Delete Product** - Uses Material UI confirmation dialog
- ✅ **Create Product** - Modal form (can be enhanced similarly)
- ✅ **View Product** - Detail modal with all product info

## File Location

**Implementation:** `src/pages/admin/AdminProducts.tsx`

**Functions:**
- `handleEdit()` - Opens modal and populates form
- `handleUpdateProduct()` - Sends PATCH request
- `setEditFormData()` - Manages form state

**Lines:** ~335-422 (update function), ~835-928 (modal UI)

---

**Status:** ✅ Fully Implemented and Production Ready  
**Last Updated:** October 28, 2024


