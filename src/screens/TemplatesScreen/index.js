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
  InputLabel,useTheme, useMediaQuery

} from '@mui/material';
import {
  Sync,
  CheckCircle,
  Cancel,
  Visibility,
  Edit,
  Search
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';

const TemplatesScreen = () => {
  const { templates, customers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [syncing, setSyncing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || template.environment === environmentFilter;
    return matchesSearch && matchesStatus && matchesEnvironment;
  });

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncing(false);
  };

  const handleApprove = (templateId) => {
    // Simulate approval
    console.log('Approving template:', templateId);
  };

  const handleReject = (templateId) => {
    // Simulate rejection
    console.log('Rejecting template:', templateId);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:isMobile?"column":"row", alignItems: { xs: "flex-start", md: "center" }, marginBottom: '2rem' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1f2937' }}>
          Template Management
        </Typography>
        <Button
          startIcon={<Sync />}
          variant="contained"
          onClick={handleSync}
          disabled={syncing}
          style={{ backgroundColor: '#10b981', color: 'white', minWidth: 150, height: 40, textTransform: 'none',margin:10 }}
        >
          {syncing ? 'Syncing...' : 'Sync Templates'}
        </Button>
      </Box>

      {/* Template Stats */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} md={3} sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#10b981' }}>
              {templates.filter(t => t.status === 'approved').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Approved Templates
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#f59e0b' }}>
              {templates.filter(t => t.status === 'pending').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Pending Review
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
          <Paper elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Typography variant="h3" style={{ fontWeight: 'bold', color: '#ef4444' }}>
              {templates.filter(t => t.status === 'rejected').length}
            </Typography>
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              Rejected
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}  sx={{ width:{xs: '100%',md: '48%' ,lg: '23%' ,xl: '23%',sm:'48%'}}}>
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

      {/* Filters */}
      <Paper elevation={2} style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '12px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search style={{ color: '#6b7280', marginRight: '0.5rem' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ width:{xs: '100%',md: '21%' ,lg: '24%' ,xl: '22%'}}}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sx={{ width:{xs: '100%',md: '21%' ,lg: '24%' ,xl: '22%'}}}>
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
            <Typography variant="body2" style={{ color: '#6b7280' }}>
              {filteredTemplates.length} templates
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Templates Table */}
      <Paper elevation={2} style={{ borderRadius: '12px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f8fafc' }}>
                <TableCell style={{ fontWeight: 'bold' }}>Template</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Language</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Environment</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTemplates.map((template) => {
                const customer = customers.find(c => c.id === template.customerId);
                
                return (
                  <TableRow key={template.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          {template.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6b7280' }}>
                          ID: {template.id}
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
                      <Box style={{ display: 'flex', gap: '1rem' }}>
                        {template.status === 'pending' && (
                          <>
                            <IconButton 
                              size="small"
                              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}

                            >
                              <CheckCircle />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => handleReject(template.id)}
                              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}
                            >
                              <Cancel />
                            </IconButton>
                          </>
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
    </Box>
  );
};

export default TemplatesScreen;