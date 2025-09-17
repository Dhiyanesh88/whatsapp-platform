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
  Button
} from '@mui/material';
import {
  TrendingUp,
  People,
  Campaign,
  Error,
  Sync,
  Notifications
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';

const DashboardHome = () => {
  const { customers, campaigns, failures, pricing, syncPricing } = useData();

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length,
      icon: <People />,
      color: '#10b981',
      change: '+12%'
    },
    {
      title: 'Active Campaigns',
      value: campaigns.filter(c => c.status === 'active').length,
      icon: <Campaign />,
      color: '#3b82f6',
      change: '+8%'
    },
    {
      title: 'Open Failures',
      value: failures.filter(f => f.status === 'open').length,
      icon: <Error />,
      color: '#ef4444',
      change: '-5%'
    },
    {
      title: 'Revenue (MTD)',
      value: '$12,450',
      icon: <TrendingUp />,
      color: '#8b5cf6',
      change: '+15%'
    }
  ];

  const recentActivities = [
    { text: 'New customer "TechCorp" registered', time: '2 hours ago', type: 'success' },
    { text: 'Campaign "Holiday Sale" completed', time: '4 hours ago', type: 'info' },
    { text: 'API rate limit exceeded for Customer #001', time: '6 hours ago', type: 'warning' },
    { text: 'Template "Welcome Message" approved', time: '1 day ago', type: 'success' }
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: '2rem',
          fontWeight: 'bold',
          color: '#1f2937',
          fontSize: { xs: '1.3rem', sm: '2rem' }
        }}
      >
        Super Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: '2rem' }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} 
            sx={{ width: { xs: '100%', sm: '47%', md: '47%', lg: '48%' } }}>
            <Card
              elevation={2}
              sx={{
                borderRadius: '12px',
                height: '100%'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        mb: '0.5rem',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        color: '#1f2937',
                        fontSize: { xs: '1.25rem', sm: '2rem' }
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        backgroundColor: stat.change.startsWith('+') ? '#dcfce7' : '#fee2e2',
                        color: stat.change.startsWith('+') ? '#16a34a' : '#dc2626',
                        mt: '0.5rem'
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: '12px',
                      p: '12px',
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
        {/* System Health */}
        <Grid item xs={12} md={8} sx={{ width: {  xs: '100%', sm: '100%', md: '47%', lg: '48%' } }}>
          <Paper elevation={2} sx={{ p: '1.5rem', borderRadius: '12px', height: '33vh' }}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: '1.5rem' }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', width: '50%', fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                System Health
              </Typography>
              <Button
                startIcon={<Sync />}
                onClick={syncPricing}
                sx={{ color: '#10b981', fontSize: { xs: '0.75rem', sm: '0.9rem' }, textTransform: 'none', justifyContent: 'flex-end', width: '50%', textAlign: 'center' }}
              >
                Sync Pricing
              </Button>
            </Box>

            <Box sx={{ mb: '1.5rem' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '0.5rem' }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>API Connectivity</Typography>
                <Typography variant="body2" sx={{ color: '#10b981', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>98.5%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={98.5}
                sx={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': { backgroundColor: '#10b981' }
                }}
              />
            </Box>

            <Box sx={{ mb: '1.5rem' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '0.5rem' }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Message Delivery Rate</Typography>
                <Typography variant="body2" sx={{ color: '#10b981', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>96.2%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={96.2}
                sx={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': { backgroundColor: '#10b981' }
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                Last pricing sync: {new Date(pricing.lastSynced).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4} sx={{ width: {  xs: '100%', sm: '100%', md: '47%', lg: '48%' } }}>
          <Paper elevation={2} sx={{ p: '1.5rem', borderRadius: '12px', height: '33vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '1.5rem' }}>
              <Notifications sx={{ color: '#10b981', mr: '0.5rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Recent Activities
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '20vh', overflowY: 'auto' }}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor:
                        activity.type === 'success' ? '#10b981' :
                          activity.type === 'warning' ? '#f59e0b' : '#3b82f6',
                      mt: '6px',
                      flexShrink: 0
                    }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.4, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                      {activity.text}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>

  );
};

export default DashboardHome;