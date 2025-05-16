import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography, Paper, Divider, TextField, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://backend-credit.onrender.com/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Container maxWidth="sm">
        <Paper sx={{ 
          p: 6,
          background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
          border: '2px solid rgba(0, 180, 216, 0.3)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
          borderRadius: '12px'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mb: 4 
          }}>
            <AdminPanelSettingsIcon sx={{ 
              fontSize: 50, 
              color: '#00b4d8', 
              mr: 2,
              filter: 'drop-shadow(0 0 12px rgba(0, 180, 216, 0.5))'
            }} />
            <Typography variant="h2" component="h1" sx={{ 
              color: '#f8f9fa',
              textShadow: '0 2px 15px rgba(0, 180, 216, 0.6)',
              fontSize: '2.5rem',
              fontWeight: 600
            }}>
              Admin Login
            </Typography>
          </Box>
          
          <Divider sx={{ 
            my: 4, 
            bgcolor: 'rgba(0, 180, 216, 0.4)',
            height: '2px'
          }} />
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <EmailIcon sx={{ color: '#adb5bd', mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 180, 216, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 180, 216, 0.8)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#adb5bd',
                },
                '& .MuiInputBase-input': {
                  color: '#f8f9fa',
                },
                mb: 3
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockIcon sx={{ color: '#adb5bd', mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 180, 216, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 180, 216, 0.8)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#adb5bd',
                },
                '& .MuiInputBase-input': {
                  color: '#f8f9fa',
                },
                mb: 3
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 2,
                background: 'linear-gradient(45deg, #00b4d8 0%, #0077b6 100%)',
                color: '#f8f9fa',
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0096c7 0%, #005f8a 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)'
                },
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/admin/signup" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ 
                    color: '#00b4d8',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#48cae4'
                    }
                  }}>
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            
            <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
              <Grid item>
                <Link to="/admin/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ 
                    color: '#adb5bd',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#f8f9fa'
                    }
                  }}>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLoginPage; 