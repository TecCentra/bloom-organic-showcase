// // API Configuration
// export const API_CONFIG = {
//   // Base URL for the API - can be changed based on environment
//   BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://bloom-backend-hqu8.onrender.com/api/v1',
  
//   // Endpoints
//   ENDPOINTS: {
//     AUTH: {
//       LOGIN: '/auth/login',
//       REGISTER: '/auth/register',
//       ME: '/auth/me',
//       REFRESH: '/auth/refresh-token',
//       FORGOT_PASSWORD: '/auth/forgot-password',
//       UPDATE_PASSWORD: '/auth/update-password',
//     },
//     ADMIN: {
//       DASHBOARD: '/admin/dashboard',
//       USERS: '/admin/users',
//       PRODUCTS: '/admin/products',
//       CATEGORIES: '/admin/categories',
//       ORDERS: '/admin/orders',
//       CANCELLATION_REQUESTS: '/admin/orders/cancellation-requests',
//       REPORTS: {
//         SALES: '/admin/reports/sales',
//       },
//       AUDIT_LOG: '/admin/audit-log',
//     },
//     HEALTH: '/health',
//     ORDERS: {
//       ALL: '/orders',
//       CHECKOUT: '/orders/checkout',
//     },
//     PUBLIC: {
//       CATEGORIES: '/categories',
//       PRODUCTS: '/products',
//     },
//     REVIEWS: {
//       CREATE: '/reviews',
//       BY_PRODUCT: '/reviews/products',
//     },
//     BLOGS: {
//       UPLOAD_PDF: '/blogs/upload-pdf',
//       LIST: '/blogs',
//       DETAIL: '/blogs',
//       CREATE: '/blogs',
//       UPLOAD_IMAGE: '/blogs/:id/image',
//       DELETE: '/blogs',
//     },
//     SHIPPING: {
//       ZONES: '/shipping/zones',
//     },
//     MPESA: {
//       CALLBACK: '/mpesa/callback',
//     },
//     NEWSLETTER: {
//       SUBSCRIBE: '/newsletter/subscribe',
//       UNSUBSCRIBE: '/newsletter/unsubscribe',
//     },
//     CONTACT: '/contact'
//   }
// };

// // Helper function to build full API URLs
// export const buildApiUrl = (endpoint: string): string => {
//   return `${API_CONFIG.BASE_URL}${endpoint}`;
// };

// // Helper function to get full endpoint URL
// export const getApiUrl = (category: keyof typeof API_CONFIG.ENDPOINTS, endpoint: string): string => {
//   const categoryEndpoints = API_CONFIG.ENDPOINTS[category];
  
//   // Handle nested endpoints like ADMIN.REPORTS.SALES
//   if (endpoint.includes('.')) {
//     const parts = endpoint.split('.');
//     let current: any = categoryEndpoints;
//     for (const part of parts) {
//       current = current[part];
//     }
//     return buildApiUrl(current);
//   }
  
//   return buildApiUrl(categoryEndpoints[endpoint as keyof typeof categoryEndpoints]);
// };


// API Configuration
export const API_CONFIG = {
  // Base URL for the API - can be changed based on environment
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://bloom-backend-hqu8.onrender.com/api/v1',
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
      REFRESH: '/auth/refresh-token',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      UPDATE_PASSWORD: '/auth/update-password',
    },
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      USERS: '/admin/users',
      PRODUCTS: '/admin/products',
      PRODUCTS_LOW_STOCK: '/admin/products/low-stock',
      CATEGORIES: '/admin/categories',
      ORDERS: '/admin/orders',
      ORDER_PACK: '/admin/orders/:orderId/pack',
      ORDER_ASSIGN_COURIER: '/admin/orders/:orderId/assign-courier',
      ORDER_PICKUP: '/admin/orders/:orderId/pickup',
      ORDER_OUT_FOR_DELIVERY: '/admin/orders/:orderId/out-for-delivery',
      ORDER_DELIVER: '/admin/orders/:orderId/deliver',
      ORDER_STATUS: '/admin/orders/:orderId/status',
      CANCELLATION_REQUESTS: '/admin/orders/cancellation-requests',
      APPROVE_CANCELLATION: '/admin/orders/:orderId/approve-cancellation',
      REJECT_CANCELLATION: '/admin/orders/:orderId/reject-cancellation',
      PAYMENTS: '/admin/payments',
      REPORTS: {
        SALES: '/admin/reports/sales',
        CUSTOMERS: '/admin/reports/customers',
        PRODUCTS: '/admin/reports/products',
        ORDERS: '/admin/reports/orders',
      },
      AUDIT_LOG: '/admin/audit-log',
    },
    HEALTH: '/health',
    ORDERS: {
      ALL: '/orders',
      CHECKOUT: '/orders/checkout',
    },
    PUBLIC: {
      CATEGORIES: '/categories',
      PRODUCTS: '/products',
    },
    REVIEWS: {
      CREATE: '/reviews',
      BY_PRODUCT: '/reviews/products',
    },
    BLOGS: {
      UPLOAD_PDF: '/blogs/upload-pdf',
      LIST: '/blogs',
      DETAIL: '/blogs',
      CREATE: '/blogs',
      UPLOAD_IMAGE: '/blogs/:id/image',
      DELETE: '/blogs',
    },
    SHIPPING: {
      ZONES: '/shipping/zones',
    },
    MPESA: {
      CALLBACK: '/mpesa/callback',
    },
    NEWSLETTER: {
      SUBSCRIBE: '/newsletter/subscribe',
      UNSUBSCRIBE: '/newsletter/unsubscribe',
    },
    CONTACT: '/contact'
  }
};

// Helper to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  if (endpoint.startsWith('api/v1/')) {
    return endpoint;
  }
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to replace URL parameters (e.g., :orderId -> actual ID)
export const replaceUrlParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  return result;
};

// Helper to get endpoint URL dynamically
export const getApiUrl = (category: keyof typeof API_CONFIG.ENDPOINTS, endpoint: string): string => {
  const categoryEndpoints = API_CONFIG.ENDPOINTS[category];
  
  if (endpoint.includes('.')) {
    const parts = endpoint.split('.');
    let current: any = categoryEndpoints;
    for (const part of parts) {
      current = current[part];
    }
    return buildApiUrl(current);
  }
  
  return buildApiUrl(categoryEndpoints[endpoint as keyof typeof categoryEndpoints]);
};


