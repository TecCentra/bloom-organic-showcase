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
    },
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      USERS: '/admin/users',
      PRODUCTS: '/admin/products',
      CATEGORIES: '/admin/categories',
      ORDERS: '/admin/orders',
      CANCELLATION_REQUESTS: '/admin/orders/cancellation-requests',
      REPORTS: {
        SALES: '/admin/reports/sales',
      },
      AUDIT_LOG: '/admin/audit-log',
    },
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
    },
    SHIPPING: {
      ZONES: '/shipping/zones',
    },
    MPESA: {
      CALLBACK: '/mpesa/callback',
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get full endpoint URL
export const getApiUrl = (category: keyof typeof API_CONFIG.ENDPOINTS, endpoint: string): string => {
  const categoryEndpoints = API_CONFIG.ENDPOINTS[category];
  
  // Handle nested endpoints like ADMIN.REPORTS.SALES
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


