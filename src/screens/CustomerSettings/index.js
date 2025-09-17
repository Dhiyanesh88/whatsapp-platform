import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Support,
  Public,
  Edit,
  Add
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const CustomerSettings = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+1234567890',
    company: 'Acme Corp'
  });
  const [supportDialog, setSupportDialog] = useState(false);
  const [ticketData, setTicketData] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profileData);
  };

  const handlePasswordReset = () => {
    console.log('Sending password reset email');
  };

  const handleSubmitTicket = () => {
    console.log('Submitting support ticket:', ticketData);
    setSupportDialog(false);
    setTicketData({ subject: '', description: '', priority: 'medium' });
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box style={{ paddingTop: '2rem' }}>{children}</Box>}
    </div>
  );

  const supportTickets = [
    {
      id: 'TICK001',
      subject: 'Template approval taking too long',
      status: 'open',
      priority: 'high',
      created: '2024-01-20'
    },
    {
      id: 'TICK002',
      subject: 'Question about pricing',
      status: 'resolved',
      priority: 'low',
      created: '2024-01-18'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#ef4444';
      case 'in_progress': return '#f59e0b';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <Box>
      <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        Account Settings
      </Typography>

      <Paper elevation={2} style={{ borderRadius: '12px' }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          style={{ borderBottom: '1px solid #e5e7eb' }}
        >
          <Tab label="Profile" icon={<Person />} />
          <Tab label="Security" icon={<Security />} />
          <Tab label="Notifications" icon={<Notifications />} />
          <Tab label="Environment" icon={<Public />} />
          <Tab label="Support" icon={<Support />} />
        </Tabs>

        {/* Profile Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Profile Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={profileData.company}
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleProfileUpdate}
                  style={{ backgroundColor: '#10b981', color: 'white' }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Security Settings
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Password
                  </Typography>
                  <Typography variant="body2" style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Last changed: 30 days ago
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handlePasswordReset}
                    style={{ borderColor: '#10b981', color: '#10b981' }}
                  >
                    Reset Password
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Two-Factor Authentication
                  </Typography>
                  <Typography variant="body2" style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Add an extra layer of security to your account
                  </Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable 2FA"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    API Access
                  </Typography>
                  <Typography variant="body2" style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Manage API keys for integrations
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{ borderColor: '#10b981', color: '#10b981' }}
                  >
                    Manage API Keys
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Notification Preferences
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Email Notifications
                  </Typography>
                  
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Campaign completion notifications"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Template approval status"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Low balance alerts"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="System maintenance notifications"
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    In-App Notifications
                  </Typography>
                  
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Real-time campaign updates"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Failure alerts"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Marketing updates"
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Environment Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Environment Settings
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Current Environment
                  </Typography>
                  
                  <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Chip
                      label={currentUser?.environment || 'Sandbox'}
                      style={{
                        backgroundColor: currentUser?.environment === 'production' ? '#fee2e2' : '#fef3c7',
                        color: currentUser?.environment === 'production' ? '#dc2626' : '#d97706',
                        textTransform: 'capitalize'
                      }}
                    />
                    <Typography variant="body2" style={{ color: '#6b7280' }}>
                      {currentUser?.environment === 'production' 
                        ? 'You have access to production environment'
                        : 'You are currently in sandbox mode'
                      }
                    </Typography>
                  </Box>

                  {currentUser?.environment === 'sandbox' && (
                    <Alert severity="info">
                      To request production access, please contact support with your use case details.
                    </Alert>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Environment Features
                  </Typography>
                  
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Typography variant="body2">
                      <strong>Sandbox:</strong> Test campaigns, unlimited testing, no real message delivery
                    </Typography>
                    <Typography variant="body2">
                      <strong>Production:</strong> Real message delivery, billing applies, rate limits enforced
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Support Tab */}
        <TabPanel value={activeTab} index={4}>
          <Box style={{ padding: '2rem' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Support & Help
              </Typography>
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => setSupportDialog(true)}
                style={{ backgroundColor: '#10b981', color: 'white' }}
              >
                New Ticket
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Recent Support Tickets
                  </Typography>
                  
                  <List>
                    {supportTickets.map((ticket) => (
                      <ListItem key={ticket.id} style={{ padding: '0.5rem 0' }}>
                        <ListItemIcon>
                          <Support style={{ color: getStatusColor(ticket.status) }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                {ticket.subject}
                              </Typography>
                              <Chip
                                label={ticket.status}
                                size="small"
                                style={{
                                  backgroundColor: `${getStatusColor(ticket.status)}20`,
                                  color: getStatusColor(ticket.status),
                                  textTransform: 'capitalize'
                                }}
                              />
                              <Chip
                                label={ticket.priority}
                                size="small"
                                style={{
                                  backgroundColor: `${getPriorityColor(ticket.priority)}20`,
                                  color: getPriorityColor(ticket.priority),
                                  textTransform: 'capitalize'
                                }}
                              />
                            </Box>
                          }
                          secondary={`Ticket #${ticket.id} • Created ${ticket.created}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Quick Help
                  </Typography>
                  
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{ borderColor: '#10b981', color: '#10b981', justifyContent: 'flex-start' }}
                    >
                      📚 Documentation
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{ borderColor: '#10b981', color: '#10b981', justifyContent: 'flex-start' }}
                    >
                      💬 Live Chat
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{ borderColor: '#10b981', color: '#10b981', justifyContent: 'flex-start' }}
                    >
                      📧 Email Support
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{ borderColor: '#10b981', color: '#10b981', justifyContent: 'flex-start' }}
                    >
                      🎥 Video Tutorials
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      {/* Support Ticket Dialog */}
      <Dialog open={supportDialog} onClose={() => setSupportDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Support Ticket</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={ticketData.subject}
                onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Description"
                value={ticketData.description}
                onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
                helperText="Please provide as much detail as possible"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSupportDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitTicket}
            variant="contained"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Submit Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerSettings;