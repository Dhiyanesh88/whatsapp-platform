import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Chip
} from '@mui/material';
import {
  Dashboard,
  Campaign,
  Article as Template,
  AccountBalanceWallet,
  Assessment,
  Settings,
  Logout,
  Menu as MenuIcon,
  Notifications
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Import customer screen components
import CustomerHome from '../CustomerHome';
import CustomerCampaigns from '../CustomerCampaigns';
import CustomerTemplates from '../CustomerTemplates';
import CustomerWallet from '../CustomerWallet';
import CustomerReports from '../CustomerReports';
import CustomerSettings from '../CustomerSettings';

const CustomerDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout, currentUser, impersonating } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/portal/dashboard' },
    { text: 'Campaigns', icon: <Campaign />, path: '/portal/campaigns' },
    { text: 'Templates', icon: <Template />, path: '/portal/templates' },
    { text: 'Wallet', icon: <AccountBalanceWallet />, path: '/portal/wallet' },
    { text: 'Reports', icon: <Assessment />, path: '/portal/reports' },
    { text: 'Settings', icon: <Settings />, path: '/portal/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/customer/login');
  };

  return (
    <Box style={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        style={{ 
          backgroundColor: '#10b981',
          zIndex: 1201
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            style={{ marginRight: '1rem' }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
            WhatsApp Business Portal
          </Typography>

          <Chip
            label={`Environment: ${currentUser?.environment || 'Sandbox'}`}
            style={{
              backgroundColor: currentUser?.environment === 'production' ? '#ef4444' : '#f59e0b',
              color: 'white',
              marginRight: '1rem'
            }}
          />

          {impersonating && (
            <Chip
              label="Impersonated Session"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                marginRight: '1rem'
              }}
            />
          )}

          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<Logout />}
            style={{ marginLeft: '1rem' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        style={{ zIndex: 1200 }}
      >
        <Box style={{ width: 250, paddingTop: '64px' }}>
          <Box style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <Typography variant="h6" style={{ color: '#10b981', fontWeight: 'bold' }}>
              {currentUser?.name || 'Customer'}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              {currentUser?.email}
            </Typography>
          </Box>
          
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                style={{
                  backgroundColor: location.pathname === item.path ? '#f0fdf4' : 'transparent',
                  borderRight: location.pathname === item.path ? '3px solid #10b981' : 'none'
                }}
              >
                <ListItemIcon style={{ color: location.pathname === item.path ? '#10b981' : '#6b7280' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  style={{ color: location.pathname === item.path ? '#10b981' : '#374151' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box 
        component="main" 
        style={{ 
          flexGrow: 1, 
          padding: '88px 24px 24px 24px',
          backgroundColor: '#f8fafc',
          minHeight: '100vh'
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<CustomerHome />} />
          <Route path="/campaigns" element={<CustomerCampaigns />} />
          <Route path="/templates" element={<CustomerTemplates />} />
          <Route path="/wallet" element={<CustomerWallet />} />
          <Route path="/reports" element={<CustomerReports />} />
          <Route path="/settings" element={<CustomerSettings />} />
          <Route path="/" element={<CustomerHome />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;