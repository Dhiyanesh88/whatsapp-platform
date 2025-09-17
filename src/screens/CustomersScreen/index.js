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
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  useMediaQuery
} from '@mui/material';
import {
  Add,
  Edit,
  Visibility,
  PersonAdd,
  Search,
  FileDownload,
  FileUpload
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const CustomersScreen = () => {
  const { customers, addCustomer, updateCustomer } = useData();
  const { impersonate } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    environment: 'sandbox',
    credits: 1000
  });

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const handleOpenViewDialog = (customer) => {
    setSelectedCustomer(customer);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setSelectedCustomer(null);
    setViewDialogOpen(false);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = () => {
    addCustomer(newCustomer);
    setAddDialogOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      environment: 'sandbox',
      credits: 1000
    });
  };

  const handleImpersonate = (customer) => {
    impersonate({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: 'customer',
      customerId: customer.id,
      environment: customer.environment
    });
    window.open('/portal/dashboard', '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'suspended': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 1, md: 2 } }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
        mb: '1.8rem'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f2937', fontSize: { xs: '1.3rem', sm: '2rem' } }}>
          Customer Management
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: '0.5rem', sm: '1rem' }, // smaller gap on xs
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' }, // stack buttons on small screens
            alignItems: { xs: 'stretch', sm: 'center' } // stretch buttons on xs
          }}
        >
          <Button
            startIcon={<FileUpload />}
            variant="outlined"
            sx={{
              borderColor: '#10b981',
              color: '#10b981',
              width: { xs: '165px', sm: 'auto' } // full width on xs
            }}
          >
            Import CSV
          </Button>
          <Button
            startIcon={<FileDownload />}
            variant="outlined"
            sx={{
              borderColor: '#10b981',
              color: '#10b981',
              width: { xs: '165px', sm: 'auto' }
            }}
          >
            Export
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setAddDialogOpen(true)}
            sx={{
              backgroundColor: '#10b981',
              color: 'white',
              width: { xs: '165px', sm: 'auto' }
            }}
          >
            Add Customer
          </Button>
        </Box>

      </Box>

      {/* Filters */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          mb: 4,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: 'clamp(380px, 100%, 1250px)' },
            borderRadius: '12px',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, }}>
                <TextField
                  fullWidth
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search
                        sx={{
                          color: '#6b7280',
                          mr: 1,
                          fontSize: { xs: '1rem', sm: '1.25rem' }, // responsive icon size
                        }}
                      />
                    ),
                  }}
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '1rem' }, // responsive text
                    '& input': {
                      fontSize: { xs: '0.85rem', sm: '1rem' },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: { xs: '10px 14px', sm: '16px 14px' },
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '1rem' }, // responsive text
                    '& input': {
                      fontSize: { xs: '0.85rem', sm: '1rem' },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: { xs: '10px 14px', sm: '16px 14px' },
                    }
                  }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Customers Count */}
            <Grid item xs={12} sm={6} md={3} textAlign={{ xs: 'left', md: 'right' }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                {filteredCustomers.length} customers found
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>


      <Box sx={{ width: 'clamp(30px, 100%, 1250px)' }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: '12px',
            mb: 4,
            width: '100%',
            overflowX: 'auto',
          }}
        >
          <TableContainer

            sx={{
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Table
              size="small"
              sx={{
                minWidth: 300,
                tableLayout: 'auto',
                TableContainer: { overflowX: 'auto' },
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Environment</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Credits</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Login</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }} noWrap>
                        {customer.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }} noWrap>
                        ID: {customer.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap>{customer.email}</Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }} noWrap>
                        {customer.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.status}
                        size="small"
                        sx={{
                          backgroundColor: `${getStatusColor(customer.status)}20`,
                          color: getStatusColor(customer.status),
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.environment}
                        size="small"
                        sx={{
                          backgroundColor:
                            customer.environment === 'production' ? '#fee2e2' : '#fef3c7',
                          color:
                            customer.environment === 'production' ? '#dc2626' : '#d97706',
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }} noWrap>
                        ${customer.credits}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#6b7280' }} noWrap>
                        {customer.lastLogin}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          sx={{ color: '#10b981' }}
                          onClick={() => handleImpersonate(customer)}
                        >
                          <PersonAdd />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#3b82f6' }}
                          onClick={() => handleOpenViewDialog(customer)}
                        >
                          <Visibility />
                        </IconButton>

                        <IconButton size="small" sx={{ color: '#6b7280' }}>
                          <Edit />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Add Customer Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Company Name" value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email Address" type="email" value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone Number" value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Environment</InputLabel>
                <Select value={newCustomer.environment}
                  onChange={(e) => setNewCustomer({ ...newCustomer, environment: e.target.value })}
                  label="Environment"
                >
                  <MenuItem value="sandbox">Sandbox</MenuItem>
                  <MenuItem value="production">Production</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Starting Credits" type="number" value={newCustomer.credits}
                onChange={(e) => setNewCustomer({ ...newCustomer, credits: parseInt(e.target.value) })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCustomer} variant="contained" sx={{ backgroundColor: '#10b981', color: 'white' }}>
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Visibility Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent dividers>
          {selectedCustomer && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography><strong>Name:</strong> {selectedCustomer.name}</Typography>
              <Typography><strong>ID:</strong> {selectedCustomer.id}</Typography>
              <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
              <Typography><strong>Phone:</strong> {selectedCustomer.phone}</Typography>
              <Typography><strong>Status:</strong> {selectedCustomer.status}</Typography>
              <Typography><strong>Environment:</strong> {selectedCustomer.environment}</Typography>
              <Typography><strong>Credits:</strong> ${selectedCustomer.credits}</Typography>
              <Typography><strong>Last Login:</strong> {selectedCustomer.lastLogin}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default CustomersScreen;
