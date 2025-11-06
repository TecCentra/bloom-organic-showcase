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

  // Check if token is expired
  const isTokenExpired = (expiresAt: string | null): boolean => {
    if (!expiresAt) return true;
    return new Date(expiresAt) <= new Date();
  };

  // Check for existing token on mount
  useEffect(() => {
    const checkInitialToken = async () => {
      const token = localStorage.getItem('admin_token');
      const userData = localStorage.getItem('admin_user');
      const accessTokenExpires = localStorage.getItem('admin_token_expires');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          
          // Check if token is expired
          if (isTokenExpired(accessTokenExpires)) {
            // Try to refresh token
            const storedRefreshToken = localStorage.getItem('admin_refresh_token');
            const refreshTokenExpires = localStorage.getItem('admin_refresh_token_expires');
            
            if (storedRefreshToken && !isTokenExpired(refreshTokenExpires)) {
              // Token expired but refresh token is still valid, refresh it inline
              try {
                const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH), {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ refreshToken: storedRefreshToken })
                });

                if (response.ok) {
                  const data = await response.json();
                  const newToken = data.data?.accessToken || data.accessToken || data.token || data.access_token;
                  const newRefreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
                  const newAccessTokenExpires = data.data?.accessTokenExpires || data.accessTokenExpires;
                  const newRefreshTokenExpires = data.data?.refreshTokenExpires || data.refreshTokenExpires;

                  if (newToken) {
                    setAdminToken(newToken);
                    setAdminUser(user);
                    localStorage.setItem('admin_token', newToken);
                    if (newAccessTokenExpires) localStorage.setItem('admin_token_expires', newAccessTokenExpires);
                    if (newRefreshToken) localStorage.setItem('admin_refresh_token', newRefreshToken);
                    if (newRefreshTokenExpires) localStorage.setItem('admin_refresh_token_expires', newRefreshTokenExpires);
                    setIsLoading(false);
                    return;
                  }
                }
              } catch (e) {
                console.error('Initial token refresh failed:', e);
              }
            }
            // Both tokens expired or refresh failed, log out
            logout();
            setIsLoading(false);
            return;
          }
          
          setAdminToken(token);
          setAdminUser(user);
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkInitialToken();
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
          const userRole = userData.role || userData.userType;
          const isAdmin = userData.is_admin === true || userRole === 'admin' || userRole === 'super_admin';
          
          // Extract expiration times
          const accessTokenExpires = data.data?.accessTokenExpires || data.accessTokenExpires;
          const refreshTokenExpires = data.data?.refreshTokenExpires || data.refreshTokenExpires;
          
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
          
          // Store expiration times
          if (accessTokenExpires) {
            localStorage.setItem('admin_token_expires', accessTokenExpires);
          }
          
          // Store refresh token if available
          if (refreshToken) {
            localStorage.setItem('admin_refresh_token', refreshToken);
          }
          
          if (refreshTokenExpires) {
            localStorage.setItem('admin_refresh_token_expires', refreshTokenExpires);
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
    localStorage.removeItem('admin_token_expires');
    localStorage.removeItem('admin_refresh_token_expires');
  };

  const refreshToken = async (): Promise<boolean> => {
    // Check if refresh token is expired before attempting refresh
    const refreshTokenExpires = localStorage.getItem('admin_refresh_token_expires');
    if (isTokenExpired(refreshTokenExpires)) {
      console.error('Refresh token has expired');
      logout();
      return false;
    }
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
      const accessTokenExpires = data.data?.accessTokenExpires || data.accessTokenExpires;
      const refreshTokenExpires = data.data?.refreshTokenExpires || data.refreshTokenExpires;
      
      if (!newToken) {
        console.error('No new token received');
        logout();
        return false;
      }

      setAdminToken(newToken);
      localStorage.setItem('admin_token', newToken);
      
      // Store expiration times
      if (accessTokenExpires) {
        localStorage.setItem('admin_token_expires', accessTokenExpires);
      }
      
      // Update refresh token if a new one is provided
      if (newRefreshToken) {
        localStorage.setItem('admin_refresh_token', newRefreshToken);
      }
      
      if (refreshTokenExpires) {
        localStorage.setItem('admin_refresh_token_expires', refreshTokenExpires);
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

  // Check token expiration periodically and refresh if needed
  useEffect(() => {
    if (!adminToken) return;

    const checkAndRefreshToken = async () => {
      const accessTokenExpires = localStorage.getItem('admin_token_expires');
      
      if (isTokenExpired(accessTokenExpires)) {
        // Token expired, try to refresh
        await refreshToken();
      }
    };

    // Check every minute
    const interval = setInterval(checkAndRefreshToken, 60 * 1000);
    
    // Also check immediately
    checkAndRefreshToken();

    return () => clearInterval(interval);
  }, [adminToken]);

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
