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
  Tabs,
  Tab,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Visibility,
  Delete,
  Refresh,
  Security,
  Settings,
  Webhook,
  Science
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';

const SettingsScreen = () => {
  const { apiKeys, pricing, syncPricing } = useData();
  const [activeTab, setActiveTab] = useState(0);
  const [addKeyDialog, setAddKeyDialog] = useState(false);
  const [webhookTestDialog, setWebhookTestDialog] = useState(false);
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    environment: 'sandbox'
  });

  const handleAddApiKey = () => {
    console.log('Adding API key:', newApiKey);
    setAddKeyDialog(false);
    setNewApiKey({ name: '', environment: 'sandbox' });
  };

  const handleWebhookTest = () => {
    console.log('Testing webhook...');
    setWebhookTestDialog(false);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box style={{ paddingTop: '2rem' }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        System Settings
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: '12px' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"         
          scrollButtons="auto"         
          allowScrollButtonsMobile     
          sx={{ borderBottom: '1px solid #e5e7eb' }}
        >
          <Tab label="API Keys" icon={<Security />} />
          <Tab label="Pricing" icon={<Settings />} />
          <Tab label="Webhooks" icon={<Webhook />} />
          <Tab label="Testing Tools" icon={<Science />} />
        </Tabs>

        {/* API Keys Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box style={{ padding: '2rem' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                API Key Management
              </Typography>
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => setAddKeyDialog(true)}
                style={{ backgroundColor: '#10b981', color: 'white' }}
              >
                Add API Key
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#f8fafc' }}>
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Environment</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Created</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Last Used</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id} hover>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          {key.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6b7280', fontFamily: 'monospace' }}>
                          ••••••••••••{key.id.slice(-4)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={key.environment}
                          size="small"
                          style={{
                            backgroundColor: key.environment === 'production' ? '#fee2e2' : '#fef3c7',
                            color: key.environment === 'production' ? '#dc2626' : '#d97706',
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={key.status}
                          size="small"
                          style={{
                            backgroundColor: key.status === 'active' ? '#dcfce7' : '#fee2e2',
                            color: key.status === 'active' ? '#16a34a' : '#dc2626',
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#6b7280' }}>
                          {key.createdAt}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#6b7280' }}>
                          {key.lastUsed}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box style={{ display: 'flex', gap: '0.25rem' }}>
                          <IconButton size="small" style={{ color: '#3b82f6' }}>
                            <Visibility />
                          </IconButton>
                          <IconButton size="small" style={{ color: '#f59e0b' }}>
                            <Refresh />
                          </IconButton>
                          <IconButton size="small" style={{ color: '#ef4444' }}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        {/* Pricing Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box style={{ padding: '2rem' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Pricing Configuration
              </Typography>
              <Button
                startIcon={<Refresh />}
                variant="contained"
                onClick={syncPricing}
                style={{ backgroundColor: '#10b981', color: 'white' }}
              >
                Sync Meta Pricing
              </Button>
            </Box>

            <Grid container spacing={2} >
              <Grid
                item
                xs={12}
                md={6}
                sx={{ width: { xs: '100%', sm: '100%', md: '50%' }, mx: 'auto' }}
              >
                <Paper sx={{ p: 3, backgroundColor: '#f8fafc', borderRadius: '12px', width: '100%' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Meta Pricing (Base Rates)
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    Last synced: {new Date(pricing.lastSynced).toLocaleString()}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Object.entries(pricing.rates).map(([country, rate]) => (
                      <Box key={country} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{country}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          ${rate.toFixed(3)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ width: { xs: '100%', sm: '100%', md: '45%' }, mx: 'auto' }}
              >
                <Paper sx={{ p: 3, backgroundColor: '#f0fdf4', borderRadius: '12px', width: '100%' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Distribution Pricing (Customer Rates)
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    Includes markup for platform costs
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Object.entries(pricing.rates).map(([country, rate]) => (
                      <Box key={country} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{country}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                          ${(rate * 1.2).toFixed(3)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>

          </Box>
        </TabPanel>

        {/* Webhooks Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Webhook Configuration
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ width: { xs: '100%', sm: '100%', md: '48%' }, }}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc', height: '270px' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Webhook Settings
                  </Typography>

                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                      fullWidth
                      label="Webhook URL"
                      value="https://api.platform.com/webhooks/whatsapp"
                      variant="outlined"
                    />

                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable webhook notifications"
                    />

                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Verify webhook signatures"
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} sx={{ width: { xs: '100%', sm: '100%', md: '48%' } }}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', height: '270px' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Event Types
                  </Typography>

                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Message delivered"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Message read"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Message failed"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Template status changed"
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box style={{ marginTop: '2rem' }}>
              <Button
                startIcon={<Science />}
                variant="outlined"
                onClick={() => setWebhookTestDialog(true)}
                style={{ borderColor: '#10b981', color: '#10b981' }}
              >
                Test Webhook
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* Testing Tools Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Testing & Simulation Tools
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} sx={{ width: { xs: '100%', sm: '100%', md: '48%' } }}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Webhook Testing Tool
                  </Typography>
                  <Typography variant="body2" style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Simulate webhook callbacks for testing integrations
                  </Typography>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#10b981', color: 'white' }}
                    onClick={() => setWebhookTestDialog(true)}
                  >
                    Open Webhook Tester
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} sx={{ width: { xs: '100%', sm: '100%', md: '48%' } }}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f0fdf4' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Sandbox Campaign Simulator
                  </Typography>
                  <Typography variant="body2" style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Preview campaign delivery, cost estimation, and risk analysis
                  </Typography>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#3b82f6', color: 'white' }}
                  >
                    Open Simulator
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      {/* Add API Key Dialog */}
      <Dialog open={addKeyDialog} onClose={() => setAddKeyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New API Key</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Key Name"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Environment</InputLabel>
                <Select
                  value={newApiKey.environment}
                  onChange={(e) => setNewApiKey({ ...newApiKey, environment: e.target.value })}
                  label="Environment"
                >
                  <MenuItem value="sandbox">Sandbox</MenuItem>
                  <MenuItem value="production">Production</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddKeyDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddApiKey}
            variant="contained"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Generate Key
          </Button>
        </DialogActions>
      </Dialog>

      {/* Webhook Test Dialog */}
      <Dialog open={webhookTestDialog} onClose={() => setWebhookTestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Webhook Testing Tool</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select defaultValue="delivered" label="Event Type">
                  <MenuItem value="delivered">Message Delivered</MenuItem>
                  <MenuItem value="read">Message Read</MenuItem>
                  <MenuItem value="failed">Message Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Message ID"
                value="MSG001"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Webhook Payload (JSON)"
                value={JSON.stringify({
                  event: "message.delivered",
                  messageId: "MSG001",
                  timestamp: new Date().toISOString(),
                  customerId: "CUST001"
                }, null, 2)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWebhookTestDialog(false)}>Cancel</Button>
          <Button
            onClick={handleWebhookTest}
            variant="contained"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Send Test Webhook
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsScreen;