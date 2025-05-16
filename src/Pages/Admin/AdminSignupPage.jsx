import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography, Paper, Divider, TextField, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';

const AdminSignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          employeeId: formData.employeeId,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
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
              Admin Sign Up
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
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: '#adb5bd', mr: 1 }} />,
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
              id="employeeId"
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              InputProps={{
                startAdornment: <BadgeIcon sx={{ color: '#adb5bd', mr: 1 }} />,
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
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
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/admin/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ 
                    color: '#00b4d8',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#48cae4'
                    }
                  }}>
                    Already have an account? Sign In
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

export default AdminSignupPage;
