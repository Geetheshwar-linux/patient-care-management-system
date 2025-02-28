import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: 'admin' | 'caretaker' | 'family';
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  role 
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};