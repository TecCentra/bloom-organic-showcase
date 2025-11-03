import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '@/context/UserAuthContext';

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * GuestRoute component - redirects authenticated users away from auth pages
 * Use this component to wrap authentication pages like login, signup, forgot password
 */
const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isAuthenticated } = useUserAuth();

  // If user is authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;


