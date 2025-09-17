import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import SuperAdminLogin from './screens/SuperAdminLogin';
import CustomerLogin from './screens/CustomerLogin';
import SuperAdminDashboard from './screens/SuperAdminDashboard';
import CustomerDashboard from './screens/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DataProvider>
          <Router>
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<SuperAdminLogin />} />
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <SuperAdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/portal/*" 
                  element={
                    <ProtectedRoute requiredRole="customer">
                      <CustomerDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;