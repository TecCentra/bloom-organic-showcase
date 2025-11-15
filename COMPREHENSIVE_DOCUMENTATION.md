# Organic Bloom - Complete Website Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [User Experience & Navigation](#user-experience--navigation)
3. [User-Facing Features](#user-facing-features)
4. [Admin Panel Documentation](#admin-panel-documentation)
5. [Admin Features & Functionalities](#admin-features--functionalities)

---

## Introduction

Organic Bloom is a comprehensive e-commerce platform specializing in organic products including weight management supplements, fertility care products, natural skincare, and nutritional supplements. The platform offers a seamless shopping experience for customers while providing powerful administrative tools for managing products, orders, and business operations.

---

## User Experience & Navigation

### Landing Experience

When visitors first arrive at Organic Bloom, they are greeted by:

**Homepage (`/`)**
- A stunning hero section with the tagline "Nurture Life, Naturally" and a "Shop Now" button that directs users to browse products
- Featured Products section displaying the latest 8 products from your inventory, organized in responsive grids:
  - **Mobile devices**: 2 products per row
  - **Tablet devices**: 3 products per row  
  - **Desktop**: 4 products per row
- Shop By Lifestyle section showcasing 5 product categories:
  - Weight Management Products
  - Yoni & Female Fertility Care
  - Men's Boosters & Fertility Support
  - Natural Skin Care
  - Nutritional Supplements
- Why Choose Organic Bloom section highlighting benefits (100% Organic, Quality Assured, Health First, Pure & Natural)
- Customer testimonials from satisfied buyers
- Certifications display (USDA Organic, Non-GMO, Gluten-Free, Fair Trade)
- Newsletter subscription section

### Navigation Bar

The website header is always visible and contains:

**Desktop Navigation:**
- **Logo & Brand Name**: Clicking returns to homepage
- **Home**: Link to homepage
- **Products**: Dropdown menu with 5 categories:
  - Weight Management Products
  - Yoni & Female Fertility Care
  - Men's Boosters & Fertility Support
  - Natural Skin Care
  - Nutritional Supplements
  - *Note: The Products button itself doesn't redirect - only subcategories do*
- **Featured Blogs**: Access to blog articles
- **FAQs**: Frequently asked questions
- **Contact Us**: Contact form (highlighted with border styling)
- **Profile Icon**: Visible only when logged in, links to user profile
- **Shopping Cart Icon**: Shows a badge with item count when cart has products, links to cart page

**Mobile Navigation:**
- Compact header with logo
- Hamburger menu button (three lines icon)
- Profile icon (when logged in) and cart icon in the header
- Expanding menu with all navigation options when hamburger is clicked
- Products dropdown works the same on mobile

### Floating Elements

**WhatsApp Button:**
- A circular green WhatsApp icon fixed at bottom-right of screen
- Hovering shows "Chat with us on WhatsApp" tooltip
- Clicking opens WhatsApp chat with pre-filled message: "Hello! I am interested in your organic products."
- Phone number: 254704086080

**Scroll to Top:**
- Automatically scrolls to top when navigating between pages

---

## User-Facing Features

### 1. Product Discovery

**All Products Page (`/shop`)**
- Displays all active products from your inventory
- Products are fetched from your backend API
- Responsive grid layout (2/3/4 columns based on screen size)
- Each product card shows:
  - Product image (or placeholder if no image)
  - Category badge
  - Product name
  - Price in Kenyan Shillings (Ksh)
  - Hover effect reveals "Add to Cart" button overlay
- Clicking any product card navigates to product detail page

**Categories Page (`/products`)**
- Shows products organized by category
- Category cards display:
  - Category image
  - Category name
  - Category description
- Clicking a category navigates to that category's product listing

**Category Products Page (`/products/:slug`)**
- Shows all products within a specific category
- Examples:
  - `/products/weight-management`
  - `/products/female-care`
  - `/products/mens-health`
  - `/products/skin-care`
  - `/products/supplements`
- Same product card layout as All Products page

### 2. Product Detail Page (`/product/:id`)

When a user clicks on any product, they see:

**Product Information:**
- Large product image gallery (main image + 4 thumbnail images)
- Product name and category badge
- Stock status badge (In Stock / Out of Stock)
- Star ratings and review count
- Short description
- Price display (current price and original price with discount badge)
- Certification badges
- Full product description section
- Key advantages section (4 feature highlights with icons)
- Health benefits list
- "How to Use" instructions
- Nutrition information table

**Interactive Features:**
- Image thumbnails - clicking switches main image
- Quantity selector (increase/decrease buttons, can't go below 1)
- **Add to Cart button**: 
  - Disabled if product is out of stock
  - Shows success toast notification when item added
  - Updates cart count in header immediately
  - Does NOT redirect to cart (stays on product page)
- Trust badges section (Free Shipping, Easy Returns, Secure Payment)

### 3. Shopping Cart (`/cart`)

**Empty Cart State:**
- Shopping cart icon illustration
- "Your Cart is Empty" message
- "Continue Shopping" button (returns to homepage)

**Cart with Items:**
- Lists all products in cart with:
  - Product thumbnail image
  - Product name
  - Price per item
  - Quantity controls (increase/decrease buttons)
  - Total price for that item
  - Remove item button (trash icon)
- Order Summary sidebar (sticky on desktop):
  - Itemized list of all products and prices
  - Subtotal calculation
  - Shipping cost:
    - **FREE** if subtotal > Ksh 5,000
    - Ksh 350 if subtotal ≤ Ksh 5,000
  - Message showing how much more needed for free shipping (if applicable)
  - **Grand Total** in highlighted style
  - **Proceed to Checkout** button (disabled if cart empty)
- **Back to Shop** button at top

**Cart Features:**
- Real-time quantity updates
- Real-time price calculations
- Items persist using browser's localStorage (survives page refresh)
- Cart count badge updates automatically in header

### 4. Checkout Process (`/checkout`)

**Shipping Information Form:**
- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Street Address (required)
- City (required)
- County (required)
- All fields have validation and icons

**Payment Method Selection:**
- **M-Pesa Option**:
  - Shows green smartphone icon
  - When selected, reveals phone number input field
  - Format: 254712345678
  - Help text explaining it's for M-Pesa payment completion
- **Credit/Debit Card Option**:
  - Shows blue credit card icon
  - When selected, reveals card form:
    - Card Number
    - Expiry Date (MM/YY)
    - CVV (3 digits)

**Order Summary (Right Sidebar):**
- Same cart items display as cart page
- Shows quantity controls and remove options
- Price breakdown:
  - Subtotal
  - Shipping (FREE badge if applicable)
  - Total amount
- **Place Order Button**:
  - Shows total amount in button text
  - Displays "Processing..." with spinner during payment
  - M-Pesa users see "Check your phone for M-Pesa prompt" message

**Checkout Features:**
- All cart operations available (quantity change, remove items)
- Form validation
- Payment processing simulation
- Order success page after completion:
  - Green checkmark icon
  - "Order Successful!" message
  - Order ID display
  - Email confirmation message
  - "Track Your Order" button
  - "Continue Shopping" button

### 5. User Account Features

**Registration/Signup (`/signup`)**
- Registration form with:
  - First Name
  - Last Name
  - Email Address
  - Phone Number
  - Password
  - Confirm Password
- Form validation
- Password requirements
- Links to login if already registered
- Links to forgot password

**Forgot Password (`/forgot-password`)**
- Email input field
- Sends password reset instructions
- Confirmation message

**User Profile (`/profile`)**
- **Profile Information Section:**
  - Full name display
  - Email address
  - Phone number (if provided)
  - Account creation date
  - Role badge
  
- **Order History Section:**
  - Lists all past orders in cards showing:
    - Order ID
    - Order date
    - Status badge (color-coded):
      - Pending: Yellow
      - Processing: Blue
      - Shipped: Purple
      - Delivered: Green
      - Cancelled: Red
    - Total amount
    - Number of items
    - Payment method
    - Payment status
    - Shipping address
    - Tracking number (if available)
  
  - **Order Details Modal:**
    - Opens when clicking "View Details" on any order
    - Shows all order items with:
      - Product image
      - Product name and SKU
      - Quantity
      - Unit price
      - Item total
    - Complete order summary
    - Shipping and billing addresses
    - Payment information
  
  - **Cancel Order Feature:**
    - "Cancel Order" button appears for eligible orders (pending/processing status)
    - Opens cancellation modal requiring:
      - Cancellation reason (required text field)
    - Confirms cancellation and updates order status
  
- **Logout Button:**
  - Located in profile section
  - Clears session and redirects to homepage

**Profile Visibility:**
- Profile icon only appears in header when user is logged in
- Automatically redirects to signup if accessing `/profile` without login
- Profile data fetched from authenticated API

### 6. Blog System

**Featured Blogs Page (`/blogs`)**
- Lists all published blog articles
- Blog card display:
  - Featured image
  - Title
  - Excerpt/Preview text
  - Publication date
  - Read more button
- Clicking any blog card navigates to full article

**Blog Detail Page (`/blog/:id`)**
- Full blog article display:
  - Header image
  - Title
  - Publication date
  - Author information
  - Full article content
  - Related articles section
- Social sharing options (if implemented)
- Navigation back to blog listing

### 7. Contact & Support

**Contact Page (`/contact`)**
- Contact form with:
  - Name field
  - Email field
  - Subject field
  - Message field (textarea)
- Submit button
- Contact information display (if provided)
- Map integration (if implemented)

**FAQs Page (`/faqs`)**
- Frequently asked questions in accordion format
- Questions expand to show answers
- Search functionality (if implemented)
- Categories of questions

### 8. Search & Filter

**Search Functionality:**
- Available on product listing pages
- Search bar in header (if implemented)
- Searches product names and descriptions
- Real-time results update

**Filter Options:**
- Filter by category
- Filter by price range
- Filter by availability (in stock/out of stock)
- Sort options (price low to high, high to low, newest first, etc.)

### 9. Page Not Found (`404`)

When users navigate to non-existent pages:
- Friendly 404 error message
- "Page Not Found" heading
- "Return to Home" button
- Maintains site navigation

---

## Admin Panel Documentation

### Accessing the Admin Panel

**Admin Login (`/admin/login`)**
- Secure login page for administrators
- Email/Username and Password fields
- "Remember me" option (if implemented)
- Error messages for invalid credentials
- Successful login redirects to admin dashboard
- Session management with token authentication

**Security Features:**
- Protected routes requiring authentication
- Permission-based access control
- Automatic logout after session expiry
- Logout option available in admin panel

### Admin Panel Layout

**Sidebar Navigation:**
The admin panel features a collapsible sidebar with the following menu items:

1. **Dashboard** - Overview and statistics
2. **Products** - Product management
3. **Categories** - Category management
4. **Orders** - Active order management
5. **Cancelled Orders** - Cancelled order management
6. **Shipping** - Shipping management
7. **Images** - Image library management
8. **Blogs** - Blog post management
9. **Users** - User account management
10. **Reports & Sales** - Analytics and reports
11. **Audit Log** - System activity log
12. **System Health** - System monitoring

**Top Header:**
- Admin user name/email display
- Logout button
- Quick navigation breadcrumbs
- Notification indicators (if implemented)

**Mobile Responsive:**
- Hamburger menu for mobile devices
- Sidebar collapses on smaller screens
- All features accessible on mobile

---

## Admin Features & Functionalities

### 1. Dashboard (`/admin`)

**Overview Statistics:**
- Total Products count
- Total Orders count
- Total Revenue amount
- Active Users count
- Recent orders list
- Low stock alerts
- Sales trends chart/graph
- Quick action buttons
- Recent activity feed

**Features:**
- Real-time data updates
- Date range filtering
- Export options for reports
- Quick navigation to other sections

### 2. Product Management (`/admin/products`)

**Product List View:**
- Table/grid displaying all products with:
  - Product image thumbnail
  - Product name
  - SKU (Stock Keeping Unit)
  - Category
  - Price
  - Stock quantity
  - Active/Inactive status
  - Created date
  - Actions (Edit, Delete, View)
- Search bar to find products by name, SKU, or description
- Pagination controls (10 products per page)
- Filter options:
  - By category
  - By stock status
  - By active/inactive status
- Sort options

**Create New Product:**
- **Product Information Form:**
  - Product Name (required)
  - Slug (auto-generated from name, editable)
  - Description (rich text editor or textarea)
  - Price (required, decimal)
  - Stock Quantity (required, integer)
  - SKU (required, unique identifier)
  - Category selection (dropdown)
  - Active/Inactive toggle

- **Image Upload:**
  - Multiple image upload capability
  - Drag-and-drop interface
  - Image preview before upload
  - Set primary image
  - Delete images option
  - Image validation (size, format)

- **Save Options:**
  - "Create Product" button
  - Success/error notifications
  - Redirects to product list after creation

**Edit Product:**
- Opens product in edit mode
- Pre-fills all form fields with current data
- All create fields available for editing
- Update images (add/remove/set primary)
- "Update Product" button saves changes
- Cannot edit product ID or SKU (for data integrity)

**View Product:**
- Read-only detailed view
- All product information displayed
- All product images shown
- Order history for that product (if applicable)

**Delete Product:**
- Confirmation dialog before deletion
- Warning message about consequences
- Soft delete option (mark as inactive instead of permanent deletion)
- Products with existing orders may have deletion restrictions

**Bulk Operations:**
- Select multiple products with checkboxes
- Bulk activate/deactivate
- Bulk category assignment
- Bulk delete (with confirmation)

**Product Status Management:**
- Toggle active/inactive status
- Active products appear on website
- Inactive products hidden from customers
- Quick status toggle in list view

### 3. Category Management (`/admin/categories`)

**Category List:**
- Table showing all categories:
  - Category name
  - Description
  - Product count (number of products in category)
  - Created date
  - Actions (Edit, Delete)

**Create Category:**
- Category Name (required)
- Description (optional)
- Category image upload
- Slug (auto-generated or manual)
- Parent category selection (for subcategories, if implemented)
- "Create Category" button

**Edit Category:**
- Modify category name
- Update description
- Change category image
- Cannot edit if category has products (or shows warning)

**Delete Category:**
- Confirmation required
- Warning if category contains products
- Option to reassign products to another category before deletion

**Category Features:**
- Search categories
- Filter by product count
- Sort options
- Hierarchical display (if subcategories exist)

### 4. Order Management (`/admin/orders`)

**Orders List View:**
- Table displaying all orders with:
  - Order ID
  - Customer name
  - Customer email
  - Order date
  - Status badge (color-coded)
  - Total amount
  - Payment status
  - Payment method
  - Items count
  - Actions (View Details, Update Status)

**Order Details View:**
- Complete order information:
  - Order ID and date
  - Customer information (name, email, phone)
  - Shipping address (full address breakdown)
  - Billing address
  - All order items with:
    - Product image
    - Product name and SKU
    - Quantity
    - Unit price
    - Line total
  - Order totals:
    - Subtotal
    - Shipping cost
    - Total amount
  - Payment information:
    - Payment method
    - Payment status
    - Transaction ID (if available)
  - Shipping information:
    - Shipping method
    - Tracking number
    - Shipping status

**Update Order Status:**
- Status dropdown with options:
  - Pending
  - Processing
  - Shipped
  - Delivered
  - Cancelled
- Status update button
- Automatic notifications (if email notifications implemented)
- Tracking number input when marking as "Shipped"

**Order Actions:**
- Print invoice (if implemented)
- Resend confirmation email
- Cancel order (with reason)
- Refund order (if payment integration supports)
- Add notes/comments to order

**Filter & Search:**
- Search by order ID, customer name, or email
- Filter by:
  - Order status
  - Payment status
  - Date range (start date to end date)
- Sort by date, amount, status

**Order Statistics:**
- Total orders count
- Orders by status breakdown
- Revenue by status
- Average order value

### 5. Cancelled Orders Management (`/admin/cancelled-orders`)

**Cancelled Orders List:**
- Displays all cancelled orders
- Shows cancellation reason (if provided by customer or admin)
- Cancellation date
- Original order information
- Refund status (if applicable)
- Same filtering and search as active orders

**Features:**
- View cancellation details
- Process refunds
- Restore order (if cancellation was mistake)
- Analytics on cancellation reasons

### 6. Shipping Management (`/admin/shipping`)

**Shipping Methods:**
- Configure shipping methods:
  - Standard Shipping
  - Express Shipping
  - Free Shipping thresholds
  - Regional shipping rates
- Set shipping costs
- Define shipping zones (if implemented)
- Set delivery timeframes

**Order Shipping:**
- Assign tracking numbers
- Update shipping status
- Print shipping labels (if integrated)
- Track shipments
- Update delivery dates

**Shipping Rules:**
- Free shipping threshold (currently Ksh 5,000)
- Shipping cost for orders below threshold (currently Ksh 350)
- Weight-based shipping (if implemented)
- Location-based shipping (if implemented)

### 7. Image Management (`/admin/images`)

**Image Library:**
- Grid view of all uploaded images
- Image details:
  - Filename
  - File size
  - Dimensions
  - Upload date
  - Associated products (if any)
  - Usage count

**Upload Images:**
- Single or bulk upload
- Drag-and-drop interface
- Image optimization (automatic resizing if implemented)
- Format validation (JPG, PNG, etc.)
- Size limits

**Image Operations:**
- Delete unused images
- Replace images
- View image details
- Copy image URL
- Search images
- Filter by usage

**Image Organization:**
- Tag images
- Organize into folders (if implemented)
- Associate with products
- Set as primary product images

### 8. Blog Management (`/admin/blogs`)

**Blog Posts List:**
- Table/grid showing all blog posts:
  - Title
  - Featured image
  - Publication date
  - Status (Draft/Published)
  - Author
  - Views count (if tracked)
  - Actions (Edit, Delete, View)

**Create Blog Post:**
- Title (required)
- Slug (auto-generated)
- Featured image upload
- Content (rich text editor):
  - Text formatting (bold, italic, headings)
  - Links
  - Images
  - Lists
  - Code blocks (if supported)
- Excerpt/Summary
- Author selection
- Publication date
- Status (Draft/Published)
- Meta description (for SEO)
- Tags/Categories

**Edit Blog Post:**
- All create fields editable
- Update content
- Change featured image
- Modify publication date
- Update status

**Delete Blog Post:**
- Confirmation required
- Permanent deletion
- Option to unpublish instead

**Blog Features:**
- Search blog posts
- Filter by status, author, date
- Sort options
- Preview post before publishing

### 9. User Management (`/admin/users`)

**Users List:**
- Table showing all registered users:
  - User ID
  - Name (First & Last)
  - Email
  - Phone number
  - Role (Customer/Admin)
  - Registration date
  - Last login date
  - Status (Active/Banned)
  - Total orders count
  - Actions (View, Edit, Ban/Unban, Delete)

**User Details View:**
- Complete user profile:
  - Personal information
  - Contact details
  - Account status
  - Registration date
  - Order history
  - Payment methods saved (if applicable)
  - Addresses saved (if applicable)

**Edit User:**
- Modify user information:
  - Name
  - Email
  - Phone
  - Role (if admin has permission)
- Cannot change password (users must reset themselves)

**User Actions:**
- Ban/Unban user account
- Reset user password (sends reset email)
- Delete user account (with confirmation)
- View user's order history
- Send email to user (if implemented)

**User Roles:**
- Customer (default)
- Admin (with various permission levels)
- Permission management (if role-based access implemented)

**User Statistics:**
- Total users count
- New users (by time period)
- Active users
- Banned users count

### 10. Reports & Sales (`/admin/reports`)

**Sales Dashboard:**
- Revenue metrics:
  - Total revenue
  - Revenue by period (daily, weekly, monthly, yearly)
  - Revenue trends chart
  - Revenue by product category
  - Revenue by payment method
- Order metrics:
  - Total orders
  - Average order value
  - Orders by status
  - Orders by time period
- Customer metrics:
  - Total customers
  - New customers
  - Repeat customer rate
  - Customer lifetime value

**Product Performance:**
- Best selling products
- Low selling products
- Products by revenue
- Stock alerts
- Out of stock products

**Financial Reports:**
- Sales report by date range
- Revenue breakdown
- Tax calculations (if applicable)
- Shipping costs
- Refund statistics

**Export Options:**
- Export to CSV
- Export to Excel
- Export to PDF (if implemented)
- Email reports (if implemented)

**Report Filters:**
- Date range picker
- Category filter
- Product filter
- Customer filter
- Custom date ranges

**Analytics:**
- Sales trends
- Growth metrics
- Conversion rates
- Customer acquisition costs (if tracked)

### 11. Audit Log (`/admin/audit`)

**Activity Log:**
- Records all administrative actions:
  - User who performed action
  - Action type (Create, Update, Delete)
  - Entity affected (Product, Order, Category, etc.)
  - Entity ID
  - Timestamp
  - IP address (if tracked)
  - Changes made (before/after values)

**Log Features:**
- Search audit logs
- Filter by:
  - User/admin
  - Action type
  - Entity type
  - Date range
- Export logs
- View detailed change history

**Security & Compliance:**
- Track all data modifications
- Accountability for administrative actions
- Compliance with data protection regulations
- Troubleshooting tool

### 12. System Health (`/admin/health`)

**System Status:**
- Backend API status
- Database connectivity
- Server response times
- Error rates
- Uptime statistics

**Performance Metrics:**
- Page load times
- API response times
- Database query performance
- Cache status

**System Information:**
- Server information
- Application version
- Database version
- Environment (development/production)

**Alerts & Notifications:**
- Critical system errors
- Performance warnings
- Resource usage alerts

---

## Additional Features & Notes

### Data Persistence
- Shopping cart data stored in browser's localStorage
- User authentication tokens stored securely
- Admin session management with token expiration

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Optimized images and assets

### User Experience Enhancements
- Smooth page transitions
- Loading states for all data fetching
- Error handling with user-friendly messages
- Toast notifications for actions
- Confirmation dialogs for destructive actions

### Security Features
- Protected admin routes
- Permission-based access control
- Secure authentication
- Input validation
- XSS protection
- CSRF protection

### Integration Points
- Backend API connection (`https://bloom-backend-hqu8.onrender.com`)
- WhatsApp integration for customer support
- Payment gateway integration (M-Pesa, Card payments)
- Email notification system (if implemented)

---

## Support & Contact

For technical support or questions about the admin panel:
- Contact your system administrator
- Check the backend API documentation
- Review error logs in the Audit Log section

For customer support:
- Use the Contact page on the website
- Use the WhatsApp floating button
- Email support (if provided)

---

**Document Version:** 1.0  
**Last Updated:** Based on current codebase  
**Platform:** Organic Bloom E-commerce Website

