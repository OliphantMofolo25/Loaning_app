import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Fade,
  Grid,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { PersonAdd, ArrowForward } from '@mui/icons-material';

const employmentOptions = [
  { value: 'Employed', label: 'Employed' },
  { value: 'Self-employed', label: 'Self-employed' },
  { value: 'Unemployed', label: 'Unemployed' },
  { value: 'Student', label: 'Student' },
  { value: 'Retired', label: 'Retired' }
];

const roleOptions = [
  { value: 'user', label: 'Standard User' },
  { value: 'premium', label: 'Premium User' }
];

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'user',
      employmentStatus: '',
      annualIncome: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('Required')
        .max(50, 'Must be 50 characters or less'),
      lastName: Yup.string()
        .required('Required')
        .max(50, 'Must be 50 characters or less'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required')
        .max(100, 'Must be 100 characters or less'),
      phone: Yup.string()
        .matches(/^\d{8}$/, 'Must be exactly 8 digits')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(/[a-z]/, 'Must contain lowercase letter')
        .matches(/[A-Z]/, 'Must contain uppercase letter')
        .matches(/[0-9]/, 'Must contain number')
        .matches(/[^a-zA-Z0-9]/, 'Must contain special character')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      employmentStatus: Yup.string().required('Required'),
      annualIncome: Yup.number()
        .min(0, 'Must be positive')
        .max(10000000, 'Must be less than 10,000,000')
        .required('Required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setIsLoading(true);
      
      try {
        const response = await fetch('https://backend-credit.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email: values.email.trim().toLowerCase(),
            phone: `+266${values.phone}`,
            password: values.password,
            role: values.role,
            employmentStatus: values.employmentStatus,
            annualIncome: Number(values.annualIncome)
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 
            data.error?.message || 
            'Registration failed. Please check your information.'
          );
        }

        setSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        navigate(data.user.role === 'admin' ? '/admin' : '/services');

      } catch (err) {
        setError(err.message || 'Failed to register. Please try again.');
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
  });

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      formik.setFieldValue('phone', value);
    }
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '80vh',
      justifyContent: 'center'
    }}>
      <Fade in={true} timeout={500}>
        <Paper elevation={3} sx={{ 
          p: { xs: 3, md: 4 }, 
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&:before': success ? {
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
          <Typography variant="h4" gutterBottom align="center" sx={{ 
            fontWeight: 'bold',
            mb: 3,
            color: 'primary.main'
          }}>
            Create New Account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Registration successful! Redirecting...
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  fullWidth
                  margin="normal"
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  fullWidth
                  margin="normal"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <TextField
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              margin="normal"
              disabled={isLoading}
            />

            <TextField
              name="phone"
              label="Lesotho Phone Number"
              value={formik.values.phone}
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={
                formik.touched.phone && formik.errors.phone || 
                "Enter 8 digits after +266"
              }
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">+266</InputAdornment>,
              }}
              inputProps={{ 
                maxLength: 8,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              disabled={isLoading}
            />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Role"
                    disabled={isLoading}
                  >
                    {roleOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl 
                  component="fieldset" 
                  fullWidth 
                  margin="normal"
                  error={formik.touched.employmentStatus && Boolean(formik.errors.employmentStatus)}
                >
                  <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                    Employment Status
                  </Typography>
                  <RadioGroup
                    row
                    name="employmentStatus"
                    value={formik.values.employmentStatus}
                    onChange={formik.handleChange}
                    sx={{ gap: 2 }}
                  >
                    {employmentOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        disabled={isLoading}
                      />
                    ))}
                  </RadioGroup>
                  {formik.touched.employmentStatus && formik.errors.employmentStatus && (
                    <Typography variant="caption" color="error">
                      {formik.errors.employmentStatus}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              name="annualIncome"
              label="Annual Income (M)"
              type="number"
              value={formik.values.annualIncome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.annualIncome && Boolean(formik.errors.annualIncome)}
              helperText={formik.touched.annualIncome && formik.errors.annualIncome}
              fullWidth
              margin="normal"
              InputProps={{ 
                startAdornment: <InputAdornment position="start">M</InputAdornment>,
                inputProps: { min: 0, step: 1000 }
              }}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ 
                mt: 3,
                py: 1.5,
                fontWeight: 'bold'
              }}
              disabled={isLoading || success || formik.isSubmitting}
              fullWidth
              startIcon={isLoading ? <CircularProgress size={20} /> : <PersonAdd />}
              endIcon={success ? <ArrowForward /> : null}
            >
              {isLoading ? 'Creating Account...' : 
               success ? 'Success! Redirecting...' : 'Create Account'}
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default SignupPage;