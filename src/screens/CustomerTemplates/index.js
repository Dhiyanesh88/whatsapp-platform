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
  Alert
} from '@mui/material';
import {
  Add,
  Edit,
  Visibility,
  Delete
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const CustomerTemplates = () => {
  const { currentUser } = useAuth();
  const [templates] = useState([
    {
      id: 'TEMP001',
      name: 'Welcome Message',
      status: 'approved',
      environment: 'production',
      language: 'en',
      category: 'marketing',
      createdAt: '2024-01-15'
    },
    {
      id: 'TEMP002',
      name: 'Order Confirmation',
      status: 'pending',
      environment: 'sandbox',
      language: 'en',
      category: 'utility',
      createdAt: '2024-01-20'
    },
    {
      id: 'TEMP003',
      name: 'Password Reset',
      status: 'rejected',
      environment: 'sandbox',
      language: 'en',
      category: 'authentication',
      createdAt: '2024-01-18',
      rejectionReason: 'Template content does not comply with WhatsApp policies'
    }
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'marketing',
    language: 'en',
    content: ''
  });

  const handleAddTemplate = () => {
    console.log('Adding template:', newTemplate);
    setAddDialogOpen(false);
    setNewTemplate({
      name: '',
      category: 'marketing',
      language: 'en',
      content: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      case 'draft': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'marketing': return '#8b5cf6';
      case 'utility': return '#3b82f6';
      case 'authentication': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937' }}>
          My Templates
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setAddDialogOpen(true)}
          style={{ backgroundColor: '#10b981', color: 'white' }}
        >
          Create Template
        </Button>
      </Box>

      {/* Template Guidelines */}
      <Alert severity="info" style={{ marginBottom: '2rem', borderRadius: '8px' }}>
        <Typography variant="body2">
          <strong>Template Guidelines:</strong> All templates must be approved by WhatsApp before use. 
          Marketing templates require pre-approval, while utility templates are reviewed faster.
        </Typography>
      </Alert>

      {/* Template Stats */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#10b981' }}>
              {templates.filter(t => t.status === 'approved').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Approved Templates
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#f59e0b' }}>
              {templates.filter(t => t.status === 'pending').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Pending Review
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#ef4444' }}>
              {templates.filter(t => t.status === 'rejected').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Rejected
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#3b82f6' }}>
              {templates.length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Total Templates
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Templates Table */}
      <Paper elevation={2} style={{ borderRadius: '12px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f8fafc' }}>
                <TableCell style={{ fontWeight: 'bold' }}>Template</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Language</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Environment</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Created</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" style={{ color: '#6b7280' }}>
                        ID: {template.id}
                      </Typography>
                      {template.rejectionReason && (
                        <Typography variant="caption" style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>
                          Reason: {template.rejectionReason}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={template.status}
                      size="small"
                      style={{
                        backgroundColor: `${getStatusColor(template.status)}20`,
                        color: getStatusColor(template.status),
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={template.category}
                      size="small"
                      style={{
                        backgroundColor: `${getCategoryColor(template.category)}20`,
                        color: getCategoryColor(template.category),
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" style={{ textTransform: 'uppercase' }}>
                      {template.language}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={template.environment}
                      size="small"
                      style={{
                        backgroundColor: template.environment === 'production' ? '#fee2e2' : '#fef3c7',
                        color: template.environment === 'production' ? '#dc2626' : '#d97706',
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" style={{ color: '#6b7280' }}>
                      {template.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box style={{ display: 'flex', gap: '0.25rem' }}>
                      <IconButton size="small" style={{ color: '#3b82f6' }}>
                        <Visibility />
                      </IconButton>
                      {template.status === 'draft' || template.status === 'rejected' ? (
                        <IconButton size="small" style={{ color: '#6b7280' }}>
                          <Edit />
                        </IconButton>
                      ) : null}
                      {template.status === 'draft' && (
                        <IconButton size="small" style={{ color: '#ef4444' }}>
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Template Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Template Name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                helperText="Choose a descriptive name for your template"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  label="Category"
                >
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="utility">Utility</MenuItem>
                  <MenuItem value="authentication">Authentication</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={newTemplate.language}
                  onChange={(e) => setNewTemplate({...newTemplate, language: e.target.value})}
                  label="Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Template Content"
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                helperText="Use {{1}}, {{2}} for dynamic variables. Example: Hello {{1}}, your order {{2}} is ready!"
              />
            </Grid>
          </Grid>
          
          <Alert severity="warning" style={{ marginTop: '1rem' }}>
            <Typography variant="body2">
              <strong>Note:</strong> Templates will be submitted for WhatsApp approval. 
              Marketing templates may take 24-48 hours for review.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddTemplate}
            variant="contained"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Submit for Approval
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerTemplates;