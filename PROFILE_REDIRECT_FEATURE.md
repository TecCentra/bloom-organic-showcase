# Profile Redirect After STK Push Feature

## Overview
After a successful STK push (M-Pesa payment), users are now automatically redirected to their profile page where they can view their account details.

## Implementation Details

### 1. User Profile Page Created ✅
**File:** `src/pages/UserProfile.tsx`

**Features:**
- Fetches user data from `/auth/me` endpoint
- Displays user information (name, email, phone, role)
- Shows member since date
- Quick action buttons (Cart, Products, Admin Dashboard for admins, Logout)
- Account statistics (Orders, Addresses, User ID)
- Protected route - redirects to signup if no token

**API Integration:**
```typescript
GET https://bloom-backend-hqu8.onrender.com/api/v1/auth/me
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": {
    "user": {
      "user_id": "uuid",
      "email": "user@example.com",
      "first_name": "First",
      "last_name": "Last",
      "role": "customer|admin"
    }
  }
}
```

### 2. Route Added ✅
**File:** `src/App.tsx`

Added new route:
```typescript
<Route path="/profile" element={<UserProfile />} />
```

### 3. Checkout Updated ✅
**File:** `src/pages/checkoutPage.tsx`

**Changes:**
1. Removed `orderSuccess` state (no longer needed)
2. Removed success screen component
3. Added automatic redirect to profile after successful payment

**Flow:**
```typescript
// After successful payment response
if (response.ok && data.success) {
  clear(); // Clear cart
  setIsProcessing(false);
  
  // Redirect to profile page after 1.5 seconds
  setTimeout(() => {
    navigate('/profile');
  }, 1500);
}
```

## User Journey

### Before Payment:
1. User adds items to cart
2. User goes to checkout
3. User fills in shipping/payment details
4. User submits payment (STK push sent to phone)

### After Successful Payment:
1. ✅ Payment confirmed by backend
2. ✅ Cart cleared
3. ⏱️ Wait 1.5 seconds (gives time for backend to process)
4. ➡️ **Redirect to `/profile`**
5. 📄 Profile page loads with user data from `/auth/me`

## Profile Page Features

### User Information Card
- Full Name
- Email address
- Phone number (if available)
- User role (with colored badge)
- Member since date

### Quick Actions Card
- View My Cart
- Browse Products
- Admin Dashboard (only for admin users)
- Logout

### Account Stats
- Orders count (placeholder: 0)
- Addresses count (placeholder: 0)
- User ID (first 8 characters)

## Security & Error Handling

### Authentication
```typescript
// Check for token on profile page load
const token = localStorage.getItem('token');

if (!token) {
  navigate('/signup'); // Redirect if not logged in
  return;
}
```

### API Error Handling
```typescript
try {
  // Fetch user profile
  const response = await fetch('/auth/me', { ... });
  
  if (response.ok && data.success) {
    setUser(data.data?.user);
  } else {
    throw new Error('Failed to fetch profile');
  }
} catch (err) {
  console.error(err);
  // Redirect to signup after 2 seconds
  setTimeout(() => navigate('/signup'), 2000);
}
```

### Loading States
- Loading spinner while fetching profile
- Error screen if fetch fails
- Automatic redirect if unauthorized

## Testing Checklist

### ✅ Happy Path
- [ ] Complete a purchase with M-Pesa
- [ ] Verify STK push is received
- [ ] Complete payment on phone
- [ ] Wait for redirect (1.5 seconds)
- [ ] Should see profile page with user data
- [ ] Cart should be empty

### ✅ Edge Cases
- [ ] Try accessing `/profile` without login → Should redirect to `/signup`
- [ ] Try with expired token → Should show error and redirect
- [ ] Try with invalid token → Should show error and redirect
- [ ] Check admin user sees "Admin Dashboard" button
- [ ] Check customer user doesn't see admin button

### ✅ UI/UX
- [ ] Loading spinner shows while fetching
- [ ] User information displays correctly
- [ ] Role badge shows correct color
- [ ] Quick action buttons work
- [ ] Logout button clears token and redirects to home
- [ ] Responsive design works on mobile

## API Endpoints Used

### 1. Get User Profile
```http
GET /auth/me
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "user": {
      "user_id": "b80d2fbc-12b6-4733-840b-f700d4632eb1",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "customer",
      "phone": "254712345678",
      "created_at": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized"
}
```

## Future Enhancements (Optional)

1. **Order History on Profile**
   - Fetch and display user's past orders
   - Show order status, date, total
   - Link to order tracking page

2. **Address Management**
   - Save multiple shipping addresses
   - Set default address
   - Edit/delete addresses

3. **Edit Profile**
   - Allow users to update name, phone
   - Change password functionality
   - Upload profile picture

4. **Success Toast Before Redirect**
   - Show success message briefly
   - Then redirect to profile

5. **Profile Completion Progress**
   - Show % of profile completed
   - Encourage adding phone, address, etc.

## File Structure

```
src/
├── App.tsx                    # Added /profile route
├── pages/
│   ├── UserProfile.tsx       # NEW - User profile page
│   └── checkoutPage.tsx      # Modified - Added redirect
```

## Key Changes Summary

| File | Change | Status |
|------|--------|--------|
| `src/pages/UserProfile.tsx` | Created new profile page | ✅ Done |
| `src/App.tsx` | Added `/profile` route | ✅ Done |
| `src/pages/checkoutPage.tsx` | Removed success screen, added redirect | ✅ Done |

## How to Access Profile

1. **After successful payment:** Automatic redirect
2. **Direct URL:** Navigate to `/profile`
3. **From header:** Add profile link in header (optional)
4. **From cart:** Add "My Profile" link (optional)

---

**Status:** ✅ Complete - Ready for testing
**Last Updated:** October 28, 2024










