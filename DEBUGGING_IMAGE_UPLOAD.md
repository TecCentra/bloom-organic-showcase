# Debugging Image Upload Issue

## What I Fixed

1. ✅ Added comprehensive console logging throughout the image upload flow
2. ✅ Added toast notifications for success/error states
3. ✅ Improved error handling with specific error messages

## How to Debug

### Step 1: Open Browser DevTools
1. Press `F12` or right-click → Inspect
2. Go to the **Console** tab
3. Make sure all log levels are enabled (Verbose, Info, Warnings, Errors)

### Step 2: Try Creating a Product with Images

1. Navigate to Admin Panel → Products
2. Click "Add Product"
3. Fill in the form:
   - Name: "Test Product"
   - SKU: "TEST-001"
   - Price: 19.99
   - Stock: 50
   - Category: Select any
4. Click "Select Images" and choose 1-2 images
5. Click "Create Product"

### Step 3: Check Console Logs

You should see logs in this order:

```
🚀 Starting product creation...
Form data: {...}
Selected images count: 2
Product payload: {...}
Product creation response status: 201
✅ Product created successfully: {...}
Extracted product ID: abc-123-def
📤 Proceeding to upload images...
📸 Starting image upload for product: abc-123-def
Number of images to upload: 2
Adding image 1: {name: "...", type: "...", size: ...}
Adding image 2: {name: "...", type: "...", size: ...}
Upload URL: https://bloom-backend-hqu8.onrender.com/api/v1/products/abc-123-def/images
Image upload response status: 200
✅ Images uploaded successfully: {...}
```

## Common Issues and Solutions

### Issue 1: Product ID Not Found
**Console shows:** `❌ No product ID found in response`

**Solution:** The API response structure might be different. Check the full response:
```javascript
// Look for the product ID in the response
console.log('Full API response:', data);
```

Expected response structure:
```json
{
  "success": true,
  "data": {
    "product_id": "uuid-here"
  }
}
```

### Issue 2: Image Upload Fails (404)
**Console shows:** `Image upload response status: 404`

**Problem:** Endpoint not found

**Check:**
1. Verify the endpoint exists on the backend
2. Check the URL being called (shown in console)
3. Expected: `https://bloom-backend-hqu8.onrender.com/api/v1/products/{productId}/images`

### Issue 3: Image Upload Fails (401)
**Console shows:** `Image upload response status: 401`

**Problem:** Authentication issue

**Solution:**
- Check if admin token is valid
- Token might have expired - try logging out and back in
- Check if token is being sent in Authorization header

### Issue 4: Image Upload Fails (400/422)
**Console shows:** `Image upload response status: 400` or `422`

**Problem:** Invalid request format

**Possible causes:**
1. Field name wrong - backend might expect `images` instead of `image`
2. File type not supported
3. File size too large

**To fix field name:**
```typescript
// Try changing line 202 in AdminProducts.tsx from:
formData.append('image', image);

// To:
formData.append('images', image);

// Or try singular without array:
formData.append('file', image);
```

### Issue 5: CORS Error
**Console shows:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Backend needs to allow your origin
- Check backend CORS configuration

### Issue 6: Network Error
**Console shows:** `Failed to fetch` or `NetworkError`

**Solution:**
1. Check internet connection
2. Check if backend server is running
3. Try the API directly in Postman/Insomnia

## Testing the API Directly

### Test with curl:

```bash
# 1. Create a product first
curl -X POST "https://bloom-backend-hqu8.onrender.com/api/v1/products" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "slug": "test-product",
    "description": "Test",
    "price": 19.99,
    "stock_quantity": 50,
    "sku": "TEST-001",
    "category_id": "fc0ef0fa-db5d-4a32-b051-c90d0cabf525",
    "is_active": true
  }'

# Note the product_id from response

# 2. Upload an image
curl -X POST "https://bloom-backend-hqu8.onrender.com/api/v1/products/PRODUCT_ID_HERE/images" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "image=@/path/to/your/image.jpg"
```

## What to Look For in Console

### ✅ Success Path:
- All emojis should be green checkmarks (✅)
- Status codes: 201 (product), 200 (images)
- Toast notification appears
- Page reloads after 1 second

### ❌ Error Path:
- Red X marks (❌) in console
- Error status codes (4xx, 5xx)
- Error toast notification
- Check the error message details

## Get Your Admin Token

To test in curl, get your admin token:
1. Open DevTools → Application tab
2. Look in Local Storage
3. Find key like `adminToken` or `admin_auth`
4. Copy the token value

## Alternative: Check Network Tab

1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Try creating a product again
4. Look for requests to:
   - `/products` (POST)
   - `/products/{id}/images` (POST)
5. Click each request to see:
   - Request Headers
   - Request Payload
   - Response
   - Status Code

## Backend Requirements

The backend endpoint should accept:

**Endpoint:** `POST /products/{productId}/images`

**Headers:**
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data` (auto-set)

**Body:**
- FormData with field name `image` (or `images` - check backend)
- Multiple files can be sent with same field name
- Each file should be an actual File object

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "image_id": "uuid",
        "image_url": "https://...",
        "is_primary": true
      }
    ]
  }
}
```

## Quick Fixes to Try

### 1. Check if backend expects different field name:

In `src/pages/admin/AdminProducts.tsx` line 202, try:
```typescript
// Current:
formData.append('image', image);

// Try these alternatives:
formData.append('images', image);  // Plural
formData.append('file', image);     // Different name
formData.append('files', image);    // Plural files
```

### 2. Add file metadata:

```typescript
formData.append('image', image, image.name);
```

### 3. Check file size limit:

```typescript
selectedImages.forEach((image, index) => {
  // Add file size check
  if (image.size > 5 * 1024 * 1024) { // 5MB limit
    console.error('File too large:', image.name, image.size);
    return;
  }
  formData.append('image', image);
});
```

## Next Steps

1. Try creating a product with images
2. Share the console output with me
3. Let me know which step fails
4. Check the Network tab for actual request/response

Once I see the console output, I can provide a targeted fix!

