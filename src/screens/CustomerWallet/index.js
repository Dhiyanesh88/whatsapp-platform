import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingDown,
  TrendingUp,
  Receipt,
  CreditCard,
  Download
} from '@mui/icons-material';

const CustomerWallet = () => {
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [rechargeDialog, setRechargeDialog] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');

  const walletStats = [
    {
      title: 'Current Balance',
      value: '$1,250.00',
      icon: <AccountBalanceWallet />,
      color: '#10b981',
      change: '-$45 today'
    },
    {
      title: 'This Month Spent',
      value: '$485.50',
      icon: <TrendingDown />,
      color: '#ef4444',
      change: '+15% vs last month'
    },
    {
      title: 'Messages Sent',
      value: '8,450',
      icon: <TrendingUp />,
      color: '#3b82f6',
      change: '2,150 this week'
    },
    {
      title: 'Avg. Cost per Message',
      value: '$0.057',
      icon: <Receipt />,
      color: '#8b5cf6',
      change: '-$0.003 vs last month'
    }
  ];

  const transactions = [
    {
      id: 'TXN001',
      type: 'debit',
      description: 'Campaign: Holiday Sale 2024',
      amount: -45.50,
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'credit',
      description: 'Account Top-up',
      amount: 500.00,
      date: '2024-01-18',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'debit',
      description: 'Campaign: Welcome Series',
      amount: -28.75,
      date: '2024-01-17',
      status: 'completed'
    },
    {
      id: 'TXN004',
      type: 'credit',
      description: 'Refund: Failed messages',
      amount: 12.30,
      date: '2024-01-15',
      status: 'completed'
    }
  ];

  const invoices = [
    {
      id: 'INV001',
      date: '2024-01-01',
      amount: 485.50,
      status: 'paid',
      dueDate: '2024-01-15'
    },
    {
      id: 'INV002',
      date: '2023-12-01',
      amount: 392.75,
      status: 'paid',
      dueDate: '2023-12-15'
    }
  ];

  const handleRecharge = () => {
    console.log('Processing recharge:', rechargeAmount);
    setRechargeDialog(false);
    setRechargeAmount('');
  };

  const getTransactionColor = (type) => {
    return type === 'credit' ? '#10b981' : '#ef4444';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Box>
      <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        Wallet & Billing
      </Typography>

      {/* Wallet Stats */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        {walletStats.map((stat, index) => (
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
        {/* Wallet Controls */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Wallet Controls
            </Typography>

            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<CreditCard />}
                onClick={() => setRechargeDialog(true)}
                style={{ backgroundColor: '#10b981', color: 'white', padding: '12px' }}
              >
                Add Credits
              </Button>

              <FormControlLabel
                control={
                  <Switch
                    checked={autoRecharge}
                    onChange={(e) => setAutoRecharge(e.target.checked)}
                    color="primary"
                  />
                }
                label="Auto-recharge when balance is low"
              />

              {autoRecharge && (
                <Alert severity="info" style={{ fontSize: '0.8rem' }}>
                  Auto-recharge will add $500 when balance drops below $100
                </Alert>
              )}
            </Box>
          </Paper>

          {/* Recent Invoices */}
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Recent Invoices
              </Typography>
              <Button
                size="small"
                startIcon={<Download />}
                style={{ color: '#10b981' }}
              >
                Download All
              </Button>
            </Box>

            <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {invoices.map((invoice) => (
                <Box key={invoice.id} style={{ 
                  padding: '0.75rem', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc'
                }}>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        {invoice.id}
                      </Typography>
                      <Typography variant="caption" style={{ color: '#6b7280' }}>
                        {invoice.date}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: 'right' }}>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        ${invoice.amount}
                      </Typography>
                      <Chip
                        label={invoice.status}
                        size="small"
                        style={{
                          backgroundColor: `${getStatusColor(invoice.status)}20`,
                          color: getStatusColor(invoice.status),
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} style={{ borderRadius: '12px' }}>
            <Box style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Transaction History
                </Typography>
                <Button
                  startIcon={<Download />}
                  style={{ color: '#10b981' }}
                >
                  Export CSV
                </Button>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#f8fafc' }}>
                    <TableCell style={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      <TableCell>
                        <Typography variant="body2" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                          {transaction.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {transaction.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          style={{ 
                            fontWeight: 'bold',
                            color: getTransactionColor(transaction.type)
                          }}
                        >
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#6b7280' }}>
                          {transaction.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          size="small"
                          style={{
                            backgroundColor: `${getStatusColor(transaction.status)}20`,
                            color: getStatusColor(transaction.status),
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recharge Dialog */}
      <Dialog open={rechargeDialog} onClose={() => setRechargeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Credits to Wallet</DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '1rem' }}>
            <TextField
              fullWidth
              label="Amount (USD)"
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              helperText="Minimum recharge amount is $50"
            />
            
            <Box style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[50, 100, 250, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  size="small"
                  variant="outlined"
                  onClick={() => setRechargeAmount(amount.toString())}
                  style={{ borderColor: '#10b981', color: '#10b981' }}
                >
                  ${amount}
                </Button>
              ))}
            </Box>

            <Alert severity="info" style={{ marginTop: '1rem' }}>
              Credits will be added to your account immediately after payment confirmation.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRechargeDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleRecharge}
            variant="contained"
            disabled={!rechargeAmount || parseFloat(rechargeAmount) < 50}
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Add Credits
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerWallet;