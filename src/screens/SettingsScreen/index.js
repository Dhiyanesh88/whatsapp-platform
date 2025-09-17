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

      <Paper elevation={2} style={{ borderRadius: '12px' }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          style={{ borderBottom: '1px solid #e5e7eb' }}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="API Keys" icon={<Security />} iconPosition='start'/>
          <Tab label="Pricing" icon={<Settings />} iconPosition='start'/>
          <Tab label="Webhooks" icon={<Webhook />} iconPosition='start'/>
          <Tab label="Testing Tools" icon={<Science />} iconPosition='start'/>
        </Tabs>

        {/* API Keys Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 0 } }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                API Key Management
              </Typography>
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => setAddKeyDialog(true)}
                sx={{ backgroundColor: '#10b981', color: 'white' ,mt:{xs:1,sm:0},alignSelf:{xs:'flex-start',sm:'flex-end'}}}
              >
                Add API Key
              </Button>
            </Box>

            <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', tableLayout: 'fixed' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#f8fafc',minHeight: '280px' }}>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}  sx={{ width:{xs: '1000px',md: '3000px' ,lg: '2000%' ,xl: '1500px'}}}></Grid>
          </Grid>
          <Box style={{ padding: '2rem' }}>
            <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  flexDirection={{ xs: "column", sm: "row" }} // mobile = column, desktop = row
  gap={1.5}
  sx={{ mb: 3 }}
>
  <Typography variant="h6"
  textAlign={{ xs: "center", md: "left", }} // center on mobile, left on desktop
  >
    Pricing Configuration
    </Typography>

  <Button
    startIcon={<Refresh />}
    variant="contained"
    sx={{
      backgroundColor: "#10b981",
      color: "white",
      fontSize: { xs: "0.75rem", sm: "0.875rem" },
      px: { xs: 2, sm: 3 },
      py: { xs: 0.75, sm: 1 },
      minWidth: { xs: "100px", sm: "auto" },
    }}
    onClick={() => {
      console.log("Sync button clicked");
      syncPricing();
    }}
  >
    Sync Meta Pricing
  </Button>
</Box>


          <Grid container spacing={3}>
  {/* Meta Pricing */}
  <Grid item xs={12} md={6}>
    <Paper
      sx={{ p: 3, backgroundColor: "#f8fafc", height: "100%" ,width:{xs: '100%',md: '400px' ,lg: '540px' ,xl: '500px'}}}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Meta Pricing (Base Rates)
      </Typography>
      <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
        Last synced: {new Date(pricing.lastSynced).toLocaleString()}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {Object.entries(pricing.rates).map(([country, rate]) => (
          <Box
            key={country}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body2">{country}</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${rate.toFixed(3)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  </Grid>

  {/* Distribution Pricing */}
  <Grid item xs={12} md={6}>
    <Paper
      sx={{ p: 3, backgroundColor: "#f0fdf4", height: "100%" }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Distribution Pricing (Customer Rates)
      </Typography>
      <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
        Includes markup for platform costs
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {Object.entries(pricing.rates).map(([country, rate]) => (
          <Box
            key={country}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body2">{country}</Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#10b981" }}
            >
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

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}  sx={{ width:{xs: '100%',md: '400px' ,lg: '540px' ,xl: '500px'}}}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
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

              <Grid item xs={12} md={6}  sx={{ width:{xs: '100%',md: '400px' ,lg: '540px' ,xl: '400px'}}}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', }}>
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
     {/* Testing Tools Tab */}
<TabPanel value={activeTab} index={3}>
  <Box sx={{ p: 3 }}>
    <Typography
      variant="h6"
      sx={{ fontWeight: "bold", mb: 3 }}
    >
      Testing & Simulation Tools
    </Typography>

    {/* Responsive Grid */}
    <Grid
      container
      spacing={3}
      alignItems="stretch"
      sx={{ flexDirection: { xs: "column", md: "row-reverse", sm: "column", lg: "row" } }}
    >
      {/* Webhook Testing Tool (left) */}
      <Grid
        item
        xs={12}
        md={6}
      >
        <Paper
          sx={{
            p: 3,
            backgroundColor: "#f8fafc",
            height: "100%", // equal height
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Webhook Testing Tool
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", mb: 2 }}
          >
            Simulate webhook callbacks for testing integrations
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#10b981", color: "white" }}
            onClick={() => setWebhookTestDialog(true)}
          >
            Open Webhook Tester
          </Button>
        </Paper>
      </Grid>

      {/* Sandbox Campaign Simulator (right) */}
      <Grid
        item
        xs={12}
        md={6}
      >
        <Paper
          sx={{
            p: 3,
            backgroundColor: "#f0fdf4",
            height: "100%", // equal height
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Sandbox Campaign Simulator
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", mb: 2 }}
          >
            Preview campaign delivery, cost estimation, and risk analysis
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3b82f6", color: "white" }}
            onClick={() =>
              window.open("https://your-simulator-url.com", "_blank")
            }
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
            <Grid item xs={12} md={6} sx={{ width:{xs: '100%',md: '20%' ,lg: '25%' ,xl: '23%'}}}>
              <TextField
                fullWidth
                label="Key Name"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width:{xs: '100%',md: '20%' ,lg: '25%' ,xl: '23%'}}}>
              <FormControl fullWidth>
                <InputLabel>Environment</InputLabel>
                <Select
                  value={newApiKey.environment}
                  onChange={(e) => setNewApiKey({...newApiKey, environment: e.target.value})}
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
            <Grid item xs={12} md={6} sx={{ width:{xs: '100%',md: '20%' ,lg: '25%' ,xl: '23%'}}}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select defaultValue="delivered" label="Event Type">
                  <MenuItem value="delivered">Message Delivered</MenuItem>
                  <MenuItem value="read">Message Read</MenuItem>
                  <MenuItem value="failed">Message Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width:{xs: '100%',md: '20%' ,lg: '25%' ,xl: '23%'}}}>
              <TextField
                fullWidth
                label="Message ID"
                value="MSG001"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width:{xs: '100%',md: '20%' ,lg: '25%' ,xl: '23%'}}}>
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