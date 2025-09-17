import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password, 'super_admin');
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',padding: 0 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding:{xs:'1rem',sm:'2rem'},
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white'
        }}
      >
        <Box style={{ textAlign: 'center', marginBottom: '2rem', }}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Super Admin Portal
          </Typography>
          <Typography variant="body1" style={{ opacity: 0.9 }}>
            WhatsApp Business API Management
          </Typography>
        </Box>

        <Paper 
          style={{ 
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {error && (
                <Alert severity="error" style={{ borderRadius: '8px' }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                style={{ backgroundColor: '#f8fafc' }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                style={{ backgroundColor: '#f8fafc' }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '12px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  textTransform: 'none'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              <Box style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Typography variant="body2" style={{ color: '#6b7280' }}>
                  Demo credentials: admin@platform.com / admin123
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </Paper>
    </Container>
  );
};

export default SuperAdminLogin;