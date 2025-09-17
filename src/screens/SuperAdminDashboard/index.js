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
  Menu,
  MenuItem,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard,
  People,
  Campaign,
  Article,
  Error,
  Settings,
  Logout,
  Menu as MenuIcon,
  Notifications,
  PersonAdd
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
// Import screen components
import DashboardHome from '../DashboardHome';
import CustomersScreen from '../CustomersScreen';
import CampaignsScreen from '../CampaignsScreen';
import TemplatesScreen from '../TemplatesScreen';
import FailuresScreen from '../FailuresScreen';
import SettingsScreen from '../SettingsScreen';

const SuperAdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const { logout, user, impersonating, stopImpersonation } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Customers', icon: <People />, path: '/admin/customers' },
    { text: 'Campaigns', icon: <Campaign />, path: '/admin/campaigns' },
    { text: 'Templates', icon: <Article />, path: '/admin/templates' },
    { text: 'Failures', icon: <Error />, path: '/admin/failures' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // >= md screens


  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  return (
    <Box style={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#10b981',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen((prev) => !prev)}
            sx={{ mr: { xs: 2, sm: 0 } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '1rem' },
              minWidth: 0
            }}
            title="WhatsApp Business Platform - Super Admin"
          >
            WhatsApp Business Platform - Super Admin
          </Typography>

          {impersonating && (
            <Box style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '16px',
              marginRight: '1rem'
            }}>
              <Typography variant="body2">
                Impersonating: {impersonating.name}
              </Typography>
              <Button
                size="small"
                onClick={stopImpersonation}
                style={{ color: 'white', fontSize: '0.7rem' }}
              >
                Exit
              </Button>
            </Box>
          )}

          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
            sx={{
              p: { xs: 0.5, sm: 1 },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: { xs: "0.6rem", sm: "0.75rem" },
                  height: { xs: 14, sm: 20 },
                  minWidth: { xs: 14, sm: 20 },
                },
              }}
            >
              <Notifications
                sx={{ fontSize: { xs: 21, sm: 28 } }}
              />
            </Badge>
          </IconButton>

          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{
              ml: 1,
              minWidth: { xs: "40px", sm: "64px" }, // smaller tap area on xs
              px: { xs: 1, sm: 2 },                  // reduce horizontal padding
            }}
          >
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Logout
            </Box>
          </Button>

        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isMdUp ? true : drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant={isMdUp ? "persistent" : "temporary"}
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            top: { xs: 50, sm: 64 },
          },
        }}
      >
        <Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  if (!isMdUp) setDrawerOpen(false); // auto-close only on mobile
                }}
                style={{
                  backgroundColor:
                    location.pathname === item.path ? '#f0fdf4' : 'transparent',
                  borderRight:
                    location.pathname === item.path ? '3px solid #10b981' : 'none',
                }}
              >
                <ListItemIcon
                  style={{
                    color:
                      location.pathname === item.path ? '#10b981' : '#6b7280',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  style={{
                    color:
                      location.pathname === item.path ? '#10b981' : '#374151',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>


      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
      >
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2">New failure detected in Campaign #001</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2">Customer credits running low</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2">API key expires in 7 days</Typography>
        </MenuItem>
      </Menu>

      <Box
        component="main"
        style={{
          flexGrow: 1,
          padding: '88px 24px 24px 24px',
          backgroundColor: '#f8fafc',
          height: "clamp(110vh, 100%, 140vh)",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/customers" element={<CustomersScreen />} />
          <Route path="/campaigns" element={<CampaignsScreen />} />
          <Route path="/templates" element={<TemplatesScreen />} />
          <Route path="/failures" element={<FailuresScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/" element={<DashboardHome />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;