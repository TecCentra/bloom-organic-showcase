import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { buildApiUrl, API_CONFIG } from '@/lib/config';

interface UserAuthContextType {
  isAuthenticated: boolean;
  setToken: (token: string, refreshToken?: string, accessTokenExpires?: string, refreshTokenExpires?: string) => void;
  removeToken: () => void;
  refreshToken: () => Promise<boolean>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

interface UserAuthProviderProps {
  children: ReactNode;
}

export const UserAuthProvider: React.FC<UserAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token is expired
  const isTokenExpired = (expiresAt: string | null): boolean => {
    if (!expiresAt) return true;
    return new Date(expiresAt) <= new Date();
  };

  // Check for existing token on mount
  useEffect(() => {
    const checkInitialToken = async () => {
      const token = localStorage.getItem('token');
      const accessTokenExpires = localStorage.getItem('token_expires');
      
      if (token) {
        // Check if token is expired
        if (isTokenExpired(accessTokenExpires)) {
          // Try to refresh token
          const storedRefreshToken = localStorage.getItem('refresh_token');
          const refreshTokenExpires = localStorage.getItem('refresh_token_expires');
          
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
                  localStorage.setItem('token', newToken);
                  if (newAccessTokenExpires) localStorage.setItem('token_expires', newAccessTokenExpires);
                  if (newRefreshToken) localStorage.setItem('refresh_token', newRefreshToken);
                  if (newRefreshTokenExpires) localStorage.setItem('refresh_token_expires', newRefreshTokenExpires);
                  setIsAuthenticated(true);
                  window.dispatchEvent(new Event('authChange'));
                  return;
                }
              }
            } catch (e) {
              console.error('Initial token refresh failed:', e);
            }
          }
          // Both tokens expired or refresh failed, clear tokens
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('token_expires');
          localStorage.removeItem('refresh_token_expires');
          setIsAuthenticated(false);
          window.dispatchEvent(new Event('authChange'));
          return;
        }
        
        setIsAuthenticated(true);
      }
    };

    checkInitialToken();
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expires');
    localStorage.removeItem('refresh_token_expires');
    setIsAuthenticated(false);
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const refreshUserToken = useCallback(async (): Promise<boolean> => {
    // Check if refresh token is expired before attempting refresh
    const refreshTokenExpires = localStorage.getItem('refresh_token_expires');
    if (isTokenExpired(refreshTokenExpires)) {
      console.error('Refresh token has expired');
      removeToken();
      return false;
    }

    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        console.error('No refresh token found');
        removeToken();
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
        console.error('Refresh token failed:', response.status);
        removeToken();
        return false;
      }

      const data = await response.json();
      const newToken = data.data?.accessToken || data.accessToken || data.token || data.access_token;
      const newRefreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
      const accessTokenExpires = data.data?.accessTokenExpires || data.accessTokenExpires;
      const refreshTokenExpires = data.data?.refreshTokenExpires || data.refreshTokenExpires;
      
      if (!newToken) {
        console.error('No new token received');
        removeToken();
        return false;
      }

      localStorage.setItem('token', newToken);
      
      // Store expiration times
      if (accessTokenExpires) {
        localStorage.setItem('token_expires', accessTokenExpires);
      }
      
      // Update refresh token if a new one is provided
      if (newRefreshToken) {
        localStorage.setItem('refresh_token', newRefreshToken);
      }
      
      if (refreshTokenExpires) {
        localStorage.setItem('refresh_token_expires', refreshTokenExpires);
      }
      
      setIsAuthenticated(true);
      window.dispatchEvent(new Event('authChange'));
      
      return true;
    } catch (e) {
      console.error('Refresh token error:', e);
      removeToken();
      return false;
    }
  }, [removeToken]);

  const setToken = useCallback((token: string, refreshToken?: string, accessTokenExpires?: string, refreshTokenExpires?: string) => {
    localStorage.setItem('token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    if (accessTokenExpires) {
      localStorage.setItem('token_expires', accessTokenExpires);
    }
    if (refreshTokenExpires) {
      localStorage.setItem('refresh_token_expires', refreshTokenExpires);
    }
    setIsAuthenticated(true);
    window.dispatchEvent(new Event('authChange'));
  }, []);

  // Check token expiration periodically and refresh if needed
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkAndRefreshToken = async () => {
      const accessTokenExpires = localStorage.getItem('token_expires');
      
      if (isTokenExpired(accessTokenExpires)) {
        // Token expired, try to refresh
        await refreshUserToken();
      }
    };

    // Check every minute
    const interval = setInterval(checkAndRefreshToken, 60 * 1000);
    
    // Also check immediately
    checkAndRefreshToken();

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshUserToken]);

  const value: UserAuthContextType = {
    isAuthenticated,
    setToken,
    removeToken,
    refreshToken: refreshUserToken,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = (): UserAuthContextType => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
