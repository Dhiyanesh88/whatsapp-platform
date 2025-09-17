import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  AccountBalanceWallet,
  Campaign,
  Article,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const CustomerHome = () => {
  const { currentUser } = useAuth();

  const stats = [
    {
      title: 'Account Balance',
      value: '$1,250.00',
      icon: <AccountBalanceWallet />,
      color: '#10b981',
      change: '-$45 today'
    },
    {
      title: 'Active Campaigns',
      value: '3',
      icon: <Campaign />,
      color: '#3b82f6',
      change: '+1 this week'
    },
    {
      title: 'Approved Templates',
      value: '12',
      icon: <Article/>,
      color: '#8b5cf6',
      change: '+2 pending'
    },
    {
      title: 'Messages Sent (MTD)',
      value: '8,450',
      icon: <TrendingUp />,
      color: '#f59e0b',
      change: '+15% vs last month'
    }
  ];

  const recentCampaigns = [
    { name: 'Holiday Sale 2024', status: 'active', sent: 1250, delivered: 1200 },
    { name: 'Welcome Series', status: 'completed', sent: 850, delivered: 820 },
    { name: 'Product Launch', status: 'scheduled', sent: 0, delivered: 0 }
  ];

  const alerts = [
    { text: 'Account balance is running low', type: 'warning', time: '2 hours ago' },
    { text: 'Template "Summer Sale" approved', type: 'success', time: '1 day ago' },
    { text: 'Campaign "Holiday Sale" completed successfully', type: 'info', time: '2 days ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'completed': return '#3b82f6';
      case 'scheduled': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <Warning style={{ color: '#f59e0b' }} />;
      case 'success': return <CheckCircle style={{ color: '#10b981' }} />;
      case 'info': return <Schedule style={{ color: '#3b82f6' }} />;
      default: return <Schedule style={{ color: '#6b7280' }} />;
    }
  };

  return (
    <Box>
      <Box style={{ marginBottom: '2rem' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
          Welcome back, {currentUser?.name || 'Customer'}!
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="body1" style={{ color: '#6b7280' }}>
            Here's your WhatsApp Business overview
          </Typography>
          <Chip
            label={`Environment: ${currentUser?.environment || 'Sandbox'}`}
            style={{
              backgroundColor: currentUser?.environment === 'production' ? '#fee2e2' : '#fef3c7',
              color: currentUser?.environment === 'production' ? '#dc2626' : '#d97706'
            }}
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2} style={{ borderRadius: '12px', height: '100%' }}>
              <CardContent>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" style={{ color: '#6b7280', marginTop: '0.5rem' }}>
                      {stat.change}
                    </Typography>
                  </Box>
                  <Box 
                    style={{ 
                      backgroundColor: `${stat.color}20`,
                      borderRadius: '12px',
                      padding: '12px',
                      color: stat.color
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Campaigns */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Recent Campaigns
              </Typography>
              <Button
                variant="outlined"
                style={{ borderColor: '#10b981', color: '#10b981' }}
              >
                View All
              </Button>
            </Box>

            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentCampaigns.map((campaign, index) => {
                const deliveryRate = campaign.sent > 0 ? (campaign.delivered / campaign.sent) * 100 : 0;
                
                return (
                  <Box key={index} style={{ 
                    padding: '1rem', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        {campaign.name}
                      </Typography>
                      <Chip
                        label={campaign.status}
                        size="small"
                        style={{
                          backgroundColor: `${getStatusColor(campaign.status)}20`,
                          color: getStatusColor(campaign.status),
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                    
                    {campaign.sent > 0 && (
                      <Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <Typography variant="caption" style={{ color: '#6b7280' }}>
                            {campaign.delivered}/{campaign.sent} delivered
                          </Typography>
                          <Typography variant="caption" style={{ color: '#6b7280' }}>
                            {deliveryRate.toFixed(1)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={deliveryRate}
                          style={{ height: '6px', borderRadius: '3px' }}
                          sx={{
                            backgroundColor: '#e5e7eb',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#10b981'
                            }
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Alerts & Notifications */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Recent Alerts
            </Typography>

            <List style={{ padding: 0 }}>
              {alerts.map((alert, index) => (
                <ListItem key={index} style={{ padding: '0.5rem 0', alignItems: 'flex-start' }}>
                  <ListItemIcon style={{ minWidth: '32px', marginTop: '4px' }}>
                    {getAlertIcon(alert.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" style={{ color: '#374151', lineHeight: 1.4 }}>
                        {alert.text}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" style={{ color: '#6b7280' }}>
                        {alert.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Button
              fullWidth
              variant="outlined"
              style={{ 
                borderColor: '#10b981', 
                color: '#10b981',
                marginTop: '1rem'
              }}
            >
              View All Notifications
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerHome;