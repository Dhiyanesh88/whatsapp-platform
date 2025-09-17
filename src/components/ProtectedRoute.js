import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, impersonating } = useAuth();

  if (loading) {
    return (
      <Box 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to={requiredRole === 'customer' ? '/customer/login' : '/admin/login'} replace />;
  }

  if (requiredRole === 'super_admin' && user.role !== 'super_admin') {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole === 'customer' && user.role !== 'customer' && !impersonating) {
    return <Navigate to="/customer/login" replace />;
  }

  return children;
};

export default ProtectedRoute;