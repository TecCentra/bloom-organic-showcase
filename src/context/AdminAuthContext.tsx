import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { buildApiUrl, API_CONFIG } from '@/lib/config';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  is_admin?: boolean;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  adminToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  refreshToken: () => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    const refreshToken = localStorage.getItem('admin_refresh_token');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAdminToken(token);
        setAdminUser(user);
        // Refresh token is stored but not set in state (we'll get it from localStorage when needed)
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_refresh_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data); // Debug log
        
        // Try to extract token from various possible locations
        const token = data.data?.accessToken || 
                     data.token || 
                     data.accessToken || 
                     data.access_token;
        
        // Try to extract refresh token from various possible locations
        const refreshToken = data.data?.refreshToken || 
                           data.refreshToken || 
                           data.refresh_token;
        
        // Try to extract user data from various possible locations
        const userData = data.data?.user || data.user || data.data || {};
        
        if (token) {
          // Check if user is admin based on role or is_admin flag
          const userRole = userData.role || userData.userType;
          const isAdmin = userData.is_admin === true || userRole === 'admin' || userRole === 'super_admin';
          
          if (!isAdmin) {
            console.error('User is not an admin');
            setIsLoading(false);
            return false;
          }
          
          const user: AdminUser = {
            id: userData.user_id || userData.id || userData._id || 'admin-001',
            email: userData.email || email,
            name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.name || userData.username || 'Admin User',
            role: userRole || 'admin',
            is_admin: userData.is_admin || isAdmin,
            permissions: [
              'dashboard.view',
              'products.manage',
              'categories.manage',
              'orders.manage',
              'users.manage',
              'reports.view',
              'audit.view',
              'health.view'
            ]
          };
          
          setAdminUser(user);
          setAdminToken(token);
          
          localStorage.setItem('admin_token', token);
          localStorage.setItem('admin_user', JSON.stringify(user));
          
          // Store refresh token if available
          if (refreshToken) {
            localStorage.setItem('admin_refresh_token', refreshToken);
          }
          
          setIsLoading(false);
          return true;
        } else {
          console.error('No token received from API. Response:', data);
          setIsLoading(false);
          return false;
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login failed:', errorData);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_refresh_token');
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('admin_refresh_token');
      
      if (!refreshToken) {
        console.error('No refresh token found');
        logout();
        return false;
      }

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      });

      if (!response.ok) {
        // If refresh fails, log out to clear invalid state
        console.error('Refresh token failed:', response.status);
        logout();
        return false;
      }

      const data = await response.json();
      const newToken = data.data?.accessToken || data.accessToken || data.token || data.access_token;
      const newRefreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
      
      if (!newToken) {
        console.error('No new token received');
        logout();
        return false;
      }

      setAdminToken(newToken);
      localStorage.setItem('admin_token', newToken);
      
      // Update refresh token if a new one is provided
      if (newRefreshToken) {
        localStorage.setItem('admin_refresh_token', newRefreshToken);
      }
      
      return true;
    } catch (e) {
      console.error('Refresh token error:', e);
      logout();
      return false;
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!adminUser) return false;
    return adminUser.permissions.includes(permission) || adminUser.role === 'super_admin';
  };

  const value: AdminAuthContextType = {
    adminUser,
    adminToken,
    isAuthenticated: !!adminUser && !!adminToken,
    isLoading,
    login,
    logout,
    hasPermission,
    refreshToken,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
