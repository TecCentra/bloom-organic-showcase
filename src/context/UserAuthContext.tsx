import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { buildApiUrl, API_CONFIG } from '@/lib/config';

interface UserAuthContextType {
  isAuthenticated: boolean;
  setToken: (token: string, refreshToken?: string) => void;
  removeToken: () => void;
  refreshToken: () => Promise<boolean>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

interface UserAuthProviderProps {
  children: ReactNode;
}

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export const UserAuthProvider: React.FC<UserAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState<number | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (token) {
      setIsAuthenticated(true);
      setLastActivityTime(Date.now());
      // Refresh token is stored but not set in state (we'll get it from localStorage when needed)
    }
  }, []);

  // Monitor user activity
  useEffect(() => {
    const updateActivity = () => {
      if (isAuthenticated) {
        setLastActivityTime(Date.now());
      }
    };

    // Listen to various user activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [isAuthenticated]);

  const refreshUserToken = useCallback(async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        console.error('No refresh token found');
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
        return false;
      }

      const data = await response.json();
      const newToken = data.data?.accessToken || data.accessToken || data.token || data.access_token;
      const newRefreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
      
      if (!newToken) {
        console.error('No new token received');
        return false;
      }

      localStorage.setItem('token', newToken);
      
      // Update refresh token if a new one is provided
      if (newRefreshToken) {
        localStorage.setItem('refresh_token', newRefreshToken);
      }
      
      setIsAuthenticated(true);
      setLastActivityTime(Date.now());
      window.dispatchEvent(new Event('authChange'));
      
      return true;
    } catch (e) {
      console.error('Refresh token error:', e);
      return false;
    }
  }, []);

  // Check for token expiration
  useEffect(() => {
    if (!isAuthenticated || !lastActivityTime) return;

    const checkExpiration = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityTime;
      
      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
        // Token expired due to inactivity
        // Try to refresh token before logging out
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          // Try to refresh token silently
          refreshUserToken().then((success) => {
            if (!success) {
              // If refresh fails, log out
              localStorage.removeItem('token');
              localStorage.removeItem('refresh_token');
              setIsAuthenticated(false);
              setLastActivityTime(null);
              window.dispatchEvent(new Event('authChange'));
              console.log('Session expired due to inactivity');
            } else {
              // If refresh succeeds, update activity time
              setLastActivityTime(Date.now());
            }
          });
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          setIsAuthenticated(false);
          setLastActivityTime(null);
          window.dispatchEvent(new Event('authChange'));
          console.log('Session expired due to inactivity');
        }
      }
    };

    // Check expiration every 10 seconds for more precise timing
    const interval = setInterval(checkExpiration, 10 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, lastActivityTime, refreshUserToken]);

  const setToken = useCallback((token: string, refreshToken?: string) => {
    localStorage.setItem('token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    setIsAuthenticated(true);
    setLastActivityTime(Date.now());
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setLastActivityTime(null);
    window.dispatchEvent(new Event('authChange'));
  }, []);

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
