import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface UserAuthContextType {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  removeToken: () => void;
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
    if (token) {
      setIsAuthenticated(true);
      setLastActivityTime(Date.now());
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

  // Check for token expiration
  useEffect(() => {
    if (!isAuthenticated || !lastActivityTime) return;

    const checkExpiration = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityTime;
      
      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
        // Token expired due to inactivity
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setLastActivityTime(null);
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('authChange'));
        
        console.log('Session expired due to inactivity');
      }
    };

    // Check expiration every 10 seconds for more precise timing
    const interval = setInterval(checkExpiration, 10 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, lastActivityTime]);

  const setToken = useCallback((token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setLastActivityTime(Date.now());
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setLastActivityTime(null);
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const value: UserAuthContextType = {
    isAuthenticated,
    setToken,
    removeToken,
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
