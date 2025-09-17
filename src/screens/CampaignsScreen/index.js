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
  LinearProgress
} from '@mui/material';
import {
  Add,
  PlayArrow,
  Pause,
  Stop,
  Edit,
  Visibility,
  Schedule
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';

const CampaignsScreen = () => {
  const { campaigns, customers, addCampaign, updateCampaign } = useData();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    customerId: '',
    environment: 'sandbox',
    scheduled: ''
  });

  const handleAddCampaign = () => {
    addCampaign(newCampaign);
    setAddDialogOpen(false);
    setNewCampaign({
      name: '',
      customerId: '',
      environment: 'sandbox',
      scheduled: ''
    });
  };
  const handleOpenViewDialog = (campaign) => {
    setSelectedCampaign(campaign);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setSelectedCampaign(null);
    setViewDialogOpen(false);
  };

  const handleCampaignAction = (campaignId, action) => {
    let newStatus;
    switch (action) {
      case 'play':
        newStatus = 'active';
        break;
      case 'pause':
        newStatus = 'paused';
        break;
      case 'stop':
        newStatus = 'stopped';
        break;
      default:
        return;
    }
    updateCampaign(campaignId, { status: newStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'paused': return '#f59e0b';
      case 'stopped': return '#ef4444';
      case 'draft': return '#6b7280';
      case 'completed': return '#3b82f6';
      default: return '#6b7280';
    }
  };
  const stats = [
    { value: '25', label: 'Active Campaigns', color: '#10b981' },
    { value: '12,500', label: 'Messages Sent', color: '#3b82f6' },
    { value: '11,800', label: 'Delivered', color: '#10b981' },
    { value: '700', label: 'Failed', color: '#ef4444' },
  ];
  const getDeliveryRate = (campaign) => {
    const total = campaign.sent || 0;
    const delivered = campaign.delivered || 0;
    return total > 0 ? (delivered / total) * 100 : 0;
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' }, // stack on xs
          mb: 4,
          gap: { xs: 1, sm: 0 } // spacing between stacked elements
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1f2937',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            // textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Campaign Management
        </Typography>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setAddDialogOpen(true)}
          sx={{
            mt: { xs: 1, sm: 0 }, // margin-top on stacked xs layout
            width: { xs: '165px', sm: 'auto' }, // full-width on xs
            fontSize: { xs: '0.75rem', sm: '1rem' },
            backgroundColor: '#10b981',
            color: 'white',
            '&:hover': { backgroundColor: '#059669' },
          }}
        >
          Create Campaign
        </Button>
      </Box>


      <Grid container spacing={3} sx={{ mb: '2rem' }}>
        {stats.map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{
              width: { xs: '100%', sm: '47%', md: '47%', lg: '48%' },
            }}
          >
            <Paper
              elevation={2}
              sx={{ p: '1.5rem', borderRadius: '12px', textAlign: 'center' }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: stat.color,
                  fontSize: { xs: '1.75rem', sm: '2.3rem' },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>


      {/* Campaigns Table */}
      <Box sx={{ width: 'clamp(30px, 98.5%, 1200px)' }}>
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
                <TableRow style={{ backgroundColor: '#f8fafc' }}>
                  <TableCell style={{ fontWeight: 'bold' }}>Campaign</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Customer</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Environment</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Progress</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Scheduled</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => {
                  const customer = customers.find(c => c.id === campaign.customerId);
                  const deliveryRate = getDeliveryRate(campaign);

                  return (
                    <TableRow key={campaign.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                            {campaign.name}
                          </Typography>
                          <Typography variant="body2" style={{ color: '#6b7280' }}>
                            ID: {campaign.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {customer?.name || 'Unknown'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={campaign.status}
                          size="small"
                          style={{
                            backgroundColor: `${getStatusColor(campaign.status)}20`,
                            color: getStatusColor(campaign.status),
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={campaign.environment}
                          size="small"
                          style={{
                            backgroundColor: campaign.environment === 'production' ? '#fee2e2' : '#fef3c7',
                            color: campaign.environment === 'production' ? '#dc2626' : '#d97706',
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box style={{ minWidth: '120px' }}>
                          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <Typography variant="caption">
                              {campaign.delivered || 0}/{campaign.sent || 0}
                            </Typography>
                            <Typography variant="caption">
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
                                backgroundColor: deliveryRate > 90 ? '#10b981' : deliveryRate > 70 ? '#f59e0b' : '#ef4444'
                              }
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#6b7280' }}>
                          {campaign.scheduled ? new Date(campaign.scheduled).toLocaleString() : 'Not scheduled'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box style={{ display: 'flex', gap: '0.25rem' }}>
                          {['draft', 'paused', 'stopped'].includes(campaign.status) && (
                            <IconButton
                              size="small"
                              onClick={() => handleCampaignAction(campaign.id, 'play')}
                              style={{ color: '#10b981' }}
                            >
                              <PlayArrow />
                            </IconButton>
                          )}

                          {campaign.status === 'active' ? (
                            <IconButton
                              size="small"
                              onClick={() => handleCampaignAction(campaign.id, 'pause')}
                              style={{ color: '#f59e0b' }}
                            >
                              <Pause />
                            </IconButton>
                          ) : null}
                          <IconButton
                            size="small"
                            onClick={() => handleCampaignAction(campaign.id, 'stop')}
                            style={{ color: '#ef4444' }}
                          >
                            <Stop />
                          </IconButton>
                          <IconButton
                            size="small"
                            style={{ color: '#3b82f6' }}
                            onClick={() => handleOpenViewDialog(campaign)}
                          >
                            <Visibility />
                          </IconButton>

                          <IconButton size="small" style={{ color: '#6b7280' }}>
                            <Edit />
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
      </Box>


      {/* Add Campaign Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Name"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  value={newCampaign.customerId}
                  onChange={(e) => setNewCampaign({ ...newCampaign, customerId: e.target.value })}
                  label="Customer"
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Environment</InputLabel>
                <Select
                  value={newCampaign.environment}
                  onChange={(e) => setNewCampaign({ ...newCampaign, environment: e.target.value })}
                  label="Environment"
                >
                  <MenuItem value="sandbox">Sandbox</MenuItem>
                  <MenuItem value="production">Production</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Scheduled Time"
                type="datetime-local"
                value={newCampaign.scheduled}
                onChange={(e) => setNewCampaign({ ...newCampaign, scheduled: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddCampaign}
            variant="contained"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Create Campaign
          </Button>
        </DialogActions>
      </Dialog>
      {/* view Campaign Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Campaign Details</DialogTitle>
        <DialogContent dividers>
          {selectedCampaign && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography><strong>Name:</strong> {selectedCampaign.name}</Typography>
              <Typography><strong>ID:</strong> {selectedCampaign.id}</Typography>
              <Typography><strong>Customer:</strong> {customers.find(c => c.id === selectedCampaign.customerId)?.name || 'Unknown'}</Typography>
              <Typography><strong>Status:</strong> {selectedCampaign.status}</Typography>
              <Typography><strong>Environment:</strong> {selectedCampaign.environment}</Typography>
              <Typography><strong>Scheduled:</strong> {selectedCampaign.scheduled ? new Date(selectedCampaign.scheduled).toLocaleString() : 'Not scheduled'}</Typography>
              <Typography><strong>Sent:</strong> {selectedCampaign.sent || 0}</Typography>
              <Typography><strong>Delivered:</strong> {selectedCampaign.delivered || 0}</Typography>
              <Typography><strong>Failed:</strong> {selectedCampaign.failed || 0}</Typography>
              <Typography><strong>Delivery Rate:</strong> {getDeliveryRate(selectedCampaign).toFixed(1)}%</Typography>
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

export default CampaignsScreen;