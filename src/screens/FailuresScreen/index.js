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
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Refresh,
  CheckCircle,
  Visibility,
  FileDownload,
  Search,
  FilterList,
  TrendingUp
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';

const FailuresScreen = () => {
  const { failures, customers, campaigns } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [errorCodeFilter, setErrorCodeFilter] = useState('all');
  const [detailsDialog, setDetailsDialog] = useState({ open: false, failure: null });

  const filteredFailures = failures.filter(failure => {
    const matchesSearch = failure.messageId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || failure.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || failure.environment === environmentFilter;
    const matchesErrorCode = errorCodeFilter === 'all' || failure.errorCode === errorCodeFilter;
    return matchesSearch && matchesStatus && matchesEnvironment && matchesErrorCode;
  });

  const handleRetry = (failureId) => {
    console.log('Retrying failure:', failureId);
  };

  const handleAcknowledge = (failureId) => {
    console.log('Acknowledging failure:', failureId);
  };

  const handleViewDetails = (failure) => {
    setDetailsDialog({ open: true, failure });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#ef4444';
      case 'acknowledged': return '#f59e0b';
      case 'resolved': return '#10b981';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getErrorCodeColor = (errorCode) => {
    switch (errorCode) {
      case 'RATE_LIMIT': return '#f59e0b';
      case 'INVALID_NUMBER': return '#ef4444';
      case 'TEMPLATE_ERROR': return '#8b5cf6';
      case 'NETWORK_ERROR': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const errorCodes = [...new Set(failures.map(f => f.errorCode))];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f2937', mb: { xs: 2, md: 0 } }}>
          Failure Management
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button
            startIcon={<FileDownload />}
            variant="outlined"
            style={{ borderColor: '#10b981', color: '#10b981' }}
          >
            Export
          </Button>
          <Button
            startIcon={<Refresh />}
            variant="contained"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Failure Stats */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} md={3} sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#ef4444' }}>
              {failures.filter(f => f.status === 'open').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Open Failures
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}  sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#f59e0b' }}>
              {failures.filter(f => f.status === 'acknowledged').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Acknowledged
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}  sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#10b981' }}>
              {failures.filter(f => f.status === 'resolved').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Resolved
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width: { xs: '100%', md: '48%', lg: '23%', xl: '23%', sm: '48%' } }}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#3b82f6' }}>
              {((failures.filter(f => f.status === 'resolved').length / failures.length) * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Resolution Rate
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper elevation={2} style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '12px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}sx={{ width:{xs: '100%',md: '50%' ,lg: '25%' ,xl: '23%'}}}>
            <TextField
              fullWidth
              placeholder="Search by Message ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search style={{ color: '#6b7280', marginRight: '0.5rem' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="acknowledged">Acknowledged</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Environment</InputLabel>
              <Select
                value={environmentFilter}
                onChange={(e) => setEnvironmentFilter(e.target.value)}
                label="Environment"
              >
                <MenuItem value="all">All Environments</MenuItem>
                <MenuItem value="sandbox">Sandbox</MenuItem>
                <MenuItem value="production">Production</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Error Code</InputLabel>
              <Select
                value={errorCodeFilter}
                onChange={(e) => setErrorCodeFilter(e.target.value)}
                label="Error Code"
              >
                <MenuItem value="all">All Errors</MenuItem>
                {errorCodes.map(code => (
                  <MenuItem key={code} value={code}>{code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              {filteredFailures.length} failures found
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Failures Table */}
      <Paper elevation={2} style={{ borderRadius: '12px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f8fafc' }}>
                <TableCell style={{ fontWeight: 'bold' }}>Message ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Campaign</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Error Code</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Environment</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Timestamp</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFailures.map((failure) => {
                const customer = customers.find(c => c.id === failure.customerId);
                const campaign = campaigns.find(c => c.id === failure.campaignId);
                
                return (
                  <TableRow key={failure.id} hover>
                    <TableCell>
                      <Typography variant="body2" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {failure.messageId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {customer?.name || 'Unknown'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {campaign?.name || 'Unknown'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={failure.errorCode}
                        size="small"
                        style={{
                          backgroundColor: `${getErrorCodeColor(failure.errorCode)}20`,
                          color: getErrorCodeColor(failure.errorCode),
                          fontFamily: 'monospace'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={failure.environment}
                        size="small"
                        style={{
                          backgroundColor: failure.environment === 'production' ? '#fee2e2' : '#fef3c7',
                          color: failure.environment === 'production' ? '#dc2626' : '#d97706',
                          textTransform: 'capitalize'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={failure.status}
                        size="small"
                        style={{
                          backgroundColor: `${getStatusColor(failure.status)}20`,
                          color: getStatusColor(failure.status),
                          textTransform: 'capitalize'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" style={{ color: '#6b7280' }}>
                        {new Date(failure.timestamp).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box style={{ display: 'flex', gap: '0.25rem' }}>
                        {failure.status === 'open' && (
                          <>
                            <IconButton 
                              size="small"
                              onClick={() => handleRetry(failure.id)}
                              style={{ color: '#10b981' }}
                            >
                              <Refresh />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => handleAcknowledge(failure.id)}
                              style={{ color: '#f59e0b' }}
                            >
                              <CheckCircle />
                            </IconButton>
                          </>
                        )}
                        <IconButton 
                          size="small"
                          onClick={() => handleViewDetails(failure)}
                          style={{ color: '#3b82f6' }}
                        >
                          <Visibility />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Details Dialog */}
      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, failure: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Failure Details</DialogTitle>
        <DialogContent>
          {detailsDialog.failure && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" style={{ color: '#6b7280' }}>Message ID</Typography>
                <Typography variant="body1" style={{ fontFamily: 'monospace', marginBottom: '1rem' }}>
                  {detailsDialog.failure.messageId}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" style={{ color: '#6b7280' }}>Error Code</Typography>
                <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                  {detailsDialog.failure.errorCode}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" style={{ color: '#6b7280' }}>Error Details</Typography>
                <Paper style={{ padding: '1rem', backgroundColor: '#f8fafc', marginTop: '0.5rem' }}>
                  <Typography variant="body2" style={{ fontFamily: 'monospace' }}>
                    Rate limit exceeded for customer. Current rate: 100 messages/minute. 
                    Attempted to send 150 messages in the last minute.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, failure: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FailuresScreen;