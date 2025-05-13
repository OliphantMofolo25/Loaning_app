import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link as MuiLink,
  Alert,
  CircularProgress,
  Fade,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  ArrowForward
} from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .max(100, 'Must be 100 characters or less'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Must be 50 characters or less')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      setLoginSuccess(false);
      
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email.trim().toLowerCase(),
            password: values.password
          }),
        });

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Login failed (${response.status})`);
        }

        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Visual feedback before redirect
        setLoginSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect based on role
        navigate(data.user.role === 'admin' ? '/admin' : '/services');

      } catch (err) {
        console.error('Login error:', err);
        setError(
          err.message.includes('500') 
            ? 'Server is currently unavailable. Please try again later.'
            : err.message.includes('credentials') || err.message.includes('401')
              ? 'Invalid email or password. Please try again.'
              : err.message
        );
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ 
      py: 8,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center'
    }}>
      <Fade in={true} timeout={500}>
        <Paper elevation={3} sx={{ 
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&:before': loginSuccess ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)',
            animation: 'progress 1.5s linear'
          } : {}
        }}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              color: 'primary.main'
            }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 1
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {loginSuccess && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                borderRadius: 1
              }}
            >
              Login successful! Redirecting...
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              margin="normal"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }}
              autoComplete="email"
              disabled={isLoading || loginSuccess}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    @
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 3 }}
              autoComplete="current-password"
              disabled={isLoading || loginSuccess}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
              disabled={isLoading || loginSuccess}
              startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
              endIcon={loginSuccess ? <ArrowForward /> : null}
            >
              {isLoading ? 'Signing In...' : 
               loginSuccess ? 'Success! Redirecting...' : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ 
            mt: 3, 
            display: 'flex', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1
          }}>
            <MuiLink 
              component={Link} 
              to="/forgot-password" 
              variant="body2"
              sx={{ color: 'text.secondary' }}
              underline="hover"
            >
              Forgot password?
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/signup" 
              variant="body2"
              sx={{ color: 'text.secondary' }}
              underline="hover"
            >
              Don't have an account? Sign Up
            </MuiLink>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default LoginPage;