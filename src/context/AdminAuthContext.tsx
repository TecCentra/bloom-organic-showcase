import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
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
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAdminToken(token);
        setAdminUser(user);
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
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
        
        // Try to extract user data from various possible locations
        const userData = data.data?.user || data.user || data.data || {};
        
        if (token) {
          const user: AdminUser = {
            id: userData.user_id || userData.id || userData._id || 'admin-001',
            email: userData.email || email,
            name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.name || userData.username || 'Admin User',
            role: userData.role || userData.userType || 'admin',
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
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://bloom-backend-hqu8.onrender.com/api/v1';
      const response = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        // If refresh fails, log out to clear invalid state
        logout();
        return false;
      }
      const data = await response.json();
      const newToken = data.data?.accessToken || data.accessToken || data.token || data.access_token;
      if (!newToken) return false;
      setAdminToken(newToken);
      localStorage.setItem('admin_token', newToken);
      return true;
    } catch (e) {
      console.error('Refresh token error:', e);
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
