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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Add,
  PlayArrow,
  Pause,
  Stop,
  Edit,
  Visibility,
  Science
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const CustomerCampaigns = () => {
  const { currentUser } = useAuth();
  const [campaigns] = useState([
    {
      id: 'CAMP001',
      name: 'Holiday Sale 2024',
      status: 'active',
      environment: 'production',
      scheduled: '2024-01-21T10:00:00Z',
      sent: 1250,
      delivered: 1200,
      failed: 50,
      sandboxTested: true
    },
    {
      id: 'CAMP002',
      name: 'Welcome Series',
      status: 'draft',
      environment: 'sandbox',
      scheduled: null,
      sent: 0,
      delivered: 0,
      failed: 0,
      sandboxTested: false
    }
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    environment: 'sandbox',
    scheduled: ''
  });

  const handleAddCampaign = () => {
    console.log('Adding campaign:', newCampaign);
    setAddDialogOpen(false);
    setNewCampaign({
      name: '',
      environment: 'sandbox',
      scheduled: ''
    });
  };

  const handleSandboxTest = (campaignId) => {
    console.log('Running sandbox test for campaign:', campaignId);
  };

  const handlePromoteToProduction = (campaignId) => {
    console.log('Promoting campaign to production:', campaignId);
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

  const getDeliveryRate = (campaign) => {
    const total = campaign.sent || 0;
    const delivered = campaign.delivered || 0;
    return total > 0 ? (delivered / total) * 100 : 0;
  };

  const canPromoteToProduction = (campaign) => {
    return campaign.environment === 'sandbox' && 
           campaign.sandboxTested && 
           currentUser?.environment === 'production';
  };

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937' }}>
          My Campaigns
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setAddDialogOpen(true)}
          style={{ backgroundColor: '#10b981', color: 'white' }}
        >
          Create Campaign
        </Button>
      </Box>

      {/* Environment Notice */}
      {currentUser?.environment === 'sandbox' && (
        <Alert 
          severity="info" 
          style={{ marginBottom: '2rem', borderRadius: '8px' }}
        >
          You are in Sandbox mode. Test your campaigns here before requesting production access.
        </Alert>
      )}

      {/* Campaign Stats */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#10b981' }}>
              {campaigns.filter(c => c.status === 'active').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Active Campaigns
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#3b82f6' }}>
              {campaigns.reduce((sum, c) => sum + (c.sent || 0), 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Messages Sent
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#10b981' }}>
              {campaigns.reduce((sum, c) => sum + (c.delivered || 0), 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Delivered
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#ef4444' }}>
              {campaigns.reduce((sum, c) => sum + (c.failed || 0), 0)}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Failed
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Campaigns Table */}
      <Paper elevation={2} style={{ borderRadius: '12px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f8fafc' }}>
                <TableCell style={{ fontWeight: 'bold' }}>Campaign</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Environment</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Progress</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Scheduled</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => {
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
                        {!campaign.sandboxTested && campaign.environment === 'sandbox' && (
                          <Chip
                            label="Needs Testing"
                            size="small"
                            style={{
                              backgroundColor: '#fef3c7',
                              color: '#d97706',
                              marginTop: '4px'
                            }}
                          />
                        )}
                      </Box>
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
                        {campaign.sent > 0 ? (
                          <>
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
                          </>
                        ) : (
                          <Typography variant="caption" style={{ color: '#6b7280' }}>
                            Not started
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" style={{ color: '#6b7280' }}>
                        {campaign.scheduled ? new Date(campaign.scheduled).toLocaleString() : 'Not scheduled'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box style={{ display: 'flex', gap: '0.25rem' }}>
                        {campaign.environment === 'sandbox' && !campaign.sandboxTested && (
                          <IconButton 
                            size="small"
                            onClick={() => handleSandboxTest(campaign.id)}
                            style={{ color: '#f59e0b' }}
                          >
                            <Science />
                          </IconButton>
                        )}
                        
                        {canPromoteToProduction(campaign) && (
                          <Button
                            size="small"
                            onClick={() => handlePromoteToProduction(campaign.id)}
                            style={{ 
                              backgroundColor: '#10b981', 
                              color: 'white',
                              fontSize: '0.7rem',
                              padding: '2px 8px'
                            }}
                          >
                            Promote
                          </Button>
                        )}
                        
                        <IconButton size="small" style={{ color: '#3b82f6' }}>
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
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Environment</InputLabel>
                <Select
                  value={newCampaign.environment}
                  onChange={(e) => setNewCampaign({...newCampaign, environment: e.target.value})}
                  label="Environment"
                >
                  <MenuItem value="sandbox">Sandbox</MenuItem>
                  {currentUser?.environment === 'production' && (
                    <MenuItem value="production">Production</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Scheduled Time"
                type="datetime-local"
                value={newCampaign.scheduled}
                onChange={(e) => setNewCampaign({...newCampaign, scheduled: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          
          {newCampaign.environment === 'production' && (
            <Alert severity="warning" style={{ marginTop: '1rem' }}>
              Production campaigns require sandbox testing first and will consume real credits.
            </Alert>
          )}
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
    </Box>
  );
};

export default CustomerCampaigns;