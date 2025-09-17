import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  FileDownload,
  DateRange
} from '@mui/icons-material';

const CustomerReports = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('delivery');

  const reportStats = [
    {
      title: 'Total Messages Sent',
      value: '12,450',
      icon: <TrendingUp />,
      color: '#3b82f6',
      change: '+15% vs last period'
    },
    {
      title: 'Delivery Rate',
      value: '96.2%',
      icon: <Assessment />,
      color: '#10b981',
      change: '+2.1% vs last period'
    },
    {
      title: 'Failed Messages',
      value: '475',
      icon: <TrendingDown />,
      color: '#ef4444',
      change: '-8% vs last period'
    },
    {
      title: 'Total Cost',
      value: '$485.50',
      icon: <Assessment />,
      color: '#8b5cf6',
      change: '+12% vs last period'
    }
  ];

  const campaignPerformance = [
    {
      name: 'Holiday Sale 2024',
      sent: 5250,
      delivered: 5100,
      failed: 150,
      cost: 245.75,
      deliveryRate: 97.1
    },
    {
      name: 'Welcome Series',
      sent: 3200,
      delivered: 3050,
      failed: 150,
      cost: 152.80,
      deliveryRate: 95.3
    },
    {
      name: 'Product Launch',
      sent: 2800,
      delivered: 2650,
      failed: 150,
      cost: 134.40,
      deliveryRate: 94.6
    },
    {
      name: 'Customer Survey',
      sent: 1200,
      delivered: 1175,
      failed: 25,
      cost: 57.60,
      deliveryRate: 97.9
    }
  ];

  const failureAnalysis = [
    { reason: 'Rate Limit Exceeded', count: 185, percentage: 38.9 },
    { reason: 'Invalid Phone Number', count: 142, percentage: 29.9 },
    { reason: 'Template Not Approved', count: 89, percentage: 18.7 },
    { reason: 'Network Error', count: 59, percentage: 12.4 }
  ];

  const handleExport = (type) => {
    console.log('Exporting report:', type);
  };

  const getDeliveryRateColor = (rate) => {
    if (rate >= 95) return '#10b981';
    if (rate >= 90) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937' }}>
          Reports & Analytics
        </Typography>
        <Box style={{ display: 'flex', gap: '1rem' }}>
          <Button
            startIcon={<FileDownload />}
            variant="outlined"
            onClick={() => handleExport('csv')}
            style={{ borderColor: '#10b981', color: '#10b981' }}
          >
            Export CSV
          </Button>
          <Button
            startIcon={<FileDownload />}
            variant="outlined"
            onClick={() => handleExport('pdf')}
            style={{ borderColor: '#10b981', color: '#10b981' }}
          >
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Report Filters */}
      <Paper elevation={2} style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '12px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                label="Date Range"
              >
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                label="Report Type"
              >
                <MenuItem value="delivery">Delivery Report</MenuItem>
                <MenuItem value="failure">Failure Analysis</MenuItem>
                <MenuItem value="cost">Cost Analysis</MenuItem>
                <MenuItem value="campaign">Campaign Performance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {dateRange === 'custom' && (
            <>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      {/* Report Stats */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        {reportStats.map((stat, index) => (
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
        {/* Campaign Performance */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} style={{ borderRadius: '12px' }}>
            <Box style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Campaign Performance
              </Typography>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#f8fafc' }}>
                    <TableCell style={{ fontWeight: 'bold' }}>Campaign</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Sent</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Delivered</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Failed</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Delivery Rate</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaignPerformance.map((campaign, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                          {campaign.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {campaign.sent.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#10b981', fontWeight: 'bold' }}>
                          {campaign.delivered.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#ef4444', fontWeight: 'bold' }}>
                          {campaign.failed}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${campaign.deliveryRate}%`}
                          size="small"
                          style={{
                            backgroundColor: `${getDeliveryRateColor(campaign.deliveryRate)}20`,
                            color: getDeliveryRateColor(campaign.deliveryRate),
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                          ${campaign.cost}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Failure Analysis */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Failure Analysis
            </Typography>

            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {failureAnalysis.map((failure, index) => (
                <Box key={index} style={{ 
                  padding: '1rem', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc'
                }}>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      {failure.reason}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#ef4444', fontWeight: 'bold' }}>
                      {failure.count}
                    </Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box style={{ 
                      width: '100%', 
                      height: '6px', 
                      backgroundColor: '#e5e7eb', 
                      borderRadius: '3px',
                      marginRight: '0.5rem'
                    }}>
                      <Box style={{
                        width: `${failure.percentage}%`,
                        height: '100%',
                        backgroundColor: '#ef4444',
                        borderRadius: '3px'
                      }} />
                    </Box>
                    <Typography variant="caption" style={{ color: '#6b7280', minWidth: '40px' }}>
                      {failure.percentage}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth
              variant="outlined"
              style={{ 
                borderColor: '#10b981', 
                color: '#10b981',
                marginTop: '1rem'
              }}
            >
              View Detailed Analysis
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerReports;