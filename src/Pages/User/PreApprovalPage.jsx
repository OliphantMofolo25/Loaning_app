import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper,
  Grid, Button, TextField, Stepper,
  Step, StepLabel, Divider, Card,
  Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, Alert,
  Avatar, Chip, InputAdornment,
  CircularProgress, Snackbar, MenuItem
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { FaCheckCircle, FaUserShield, FaExclamationTriangle } from 'react-icons/fa';

const steps = ['Basic Information', 'Financial Details', 'Review & Submit'];

const loanPurposes = [
  { value: 'Home', label: 'Home Improvement' },
  { value: 'Car', label: 'Car Purchase' },
  { value: 'Education', label: 'Education' },
  { value: 'Business', label: 'Business' },
  { value: 'Personal', label: 'Personal Use' },
  { value: 'Medical', label: 'Medical Expenses' },
  { value: 'Debt Consolidation', label: 'Debt Consolidation' }
];

const employmentOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' }
];

const PreApprovalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(location.state?.step || 0);
  const [selectedLender, setSelectedLender] = useState(location.state?.selectedLender || null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    income: '',
    employment: '',
    loanAmount: '',
    loanPurpose: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
      setFormData(prev => ({
        ...prev,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone ? userData.phone.replace('+266', '') : '',
        employment: userData.employmentStatus?.toLowerCase() || '',
        income: userData.annualIncome ? (userData.annualIncome / 12).toFixed(2) : ''
      }));
    }

    if (selectedLender) {
      const amountFeature = selectedLender.features.find(f => f.includes('Up to M'));
      const amount = amountFeature ? amountFeature.replace('Up to M', '').replace(',', '') : '';
      
      setFormData(prev => ({
        ...prev,
        loanAmount: amount
      }));
    }
  }, [selectedLender]);

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 0) {
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Invalid email format';
      }
      if (!formData.phone) {
        errors.phone = 'Phone number is required';
      } else if (!/^\d{8}$/.test(formData.phone)) {
        errors.phone = 'Phone must be 8 digits';
      }
    }
    
    if (step === 1) {
      if (!formData.income || isNaN(formData.income)) {
        errors.income = 'Valid monthly income is required';
      } else if (parseFloat(formData.income) < 1000) {
        errors.income = 'Minimum income is M1000';
      }
      if (!formData.employment) errors.employment = 'Employment status is required';
      if (!formData.loanPurpose) errors.loanPurpose = 'Loan purpose is required';
      if (!formData.loanAmount || isNaN(formData.loanAmount)) {
        errors.loanAmount = 'Valid loan amount is required';
      } else if (parseFloat(formData.loanAmount) < 1000) {
        errors.loanAmount = 'Minimum loan amount is M1000';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) {
      setError('Please fix all validation errors');
      setSnackbarOpen(true);
      return;
    }
    setActiveStep((prev) => prev + 1);
    setError(null);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'employment' ? value.toLowerCase() : value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(1)) {
      setError('Please fix all validation errors');
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const loanData = {
        loanAmount: parseFloat(formData.loanAmount),
        loanPurpose: formData.loanPurpose,
        loanTerm: 12,
        lenderId: selectedLender?.id || null,
        lenderName: selectedLender?.name || 'General Application',
        monthlyIncome: parseFloat(formData.income),
        employmentStatus: formData.employment.toLowerCase() // Ensure lowercase
      };

      const response = await fetch('http://localhost:3001/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(loanData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit loan application');
      }

      setSubmitted(true);
      localStorage.setItem('currentLoanApplication', JSON.stringify({
        id: responseData.loan.id,
        status: responseData.loan.status,
        lender: selectedLender?.name || 'General Application',
        amount: responseData.loan.loanAmount,
        purpose: responseData.loan.loanPurpose
      }));

    } catch (err) {
      console.error('Loan submission error:', err);
      setError(err.message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity="error" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/services/loan-offers')}>
          Back to Lenders
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {selectedLender ? `${selectedLender.name} Application` : 'Loan Pre-Approval'}
        </Typography>
      </Box>

      {selectedLender && (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <Avatar src={selectedLender.image} sx={{ width: 40, height: 40, mr: 2 }} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedLender.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Interest Rate: {selectedLender.rate}%
            </Typography>
          </Box>
        </Box>
      )}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {submitted ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <FaCheckCircle size={64} style={{ color: '#4CAF50', marginBottom: 16 }} />
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Application Submitted!</Typography>
          <Typography sx={{ mb: 3 }}>We'll contact you within 24 hours.</Typography>
          <Button variant="contained" onClick={() => navigate('/services/loan-status')} sx={{ mr: 2 }}>
            Track Application Status
          </Button>
          <Button variant="outlined" onClick={() => navigate('/services/loan-offers')}>
            Back to Loan Offers
          </Button>
        </Paper>
      ) : (
        <>
          {activeStep === 0 && (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Basic Information</Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth label="First Name" name="firstName" value={formData.firstName}
                    onChange={handleChange} error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName} required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth label="Last Name" name="lastName" value={formData.lastName}
                    onChange={handleChange} error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName} required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth label="Email" name="email" type="email" value={formData.email}
                    onChange={handleChange} error={!!validationErrors.email}
                    helperText={validationErrors.email} required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth label="Phone Number" name="phone" value={formData.phone}
                    onChange={handleChange} inputProps={{ maxLength: 8 }}
                    error={!!validationErrors.phone} helperText={validationErrors.phone} required
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Financial Details</Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth label="Monthly Income (M)" name="income" type="number"
                    value={formData.income} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start">M</InputAdornment> }}
                    error={!!validationErrors.income} helperText={validationErrors.income} required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth label="Loan Amount (M)" name="loanAmount" type="number"
                    value={formData.loanAmount} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start">M</InputAdornment> }}
                    error={!!validationErrors.loanAmount} helperText={validationErrors.loanAmount} required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    select fullWidth label="Employment Status" name="employment"
                    value={formData.employment} onChange={handleChange}
                    error={!!validationErrors.employment} helperText={validationErrors.employment} required
                  >
                    {employmentOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12}>
                  <FormControl component="fieldset" required error={!!validationErrors.loanPurpose}>
                    <FormLabel component="legend">Loan Purpose</FormLabel>
                    <RadioGroup name="loanPurpose" value={formData.loanPurpose} onChange={handleChange}>
                      {loanPurposes.map((purpose) => (
                        <FormControlLabel 
                          key={purpose.value} value={purpose.value}
                          control={<Radio />} label={purpose.label}
                        />
                      ))}
                    </RadioGroup>
                    {validationErrors.loanPurpose && (
                      <Typography color="error" variant="caption">{validationErrors.loanPurpose}</Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeStep === 2 && (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Review Your Information</Typography>
              
              {selectedLender && (
                <Card sx={{ p: 2, mb: 3, borderLeft: `3px solid ${selectedLender.color}` }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Selected Lender</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={selectedLender.image} sx={{ width: 40, height: 40, mr: 2 }} />
                    <Box>
                      <Typography>{selectedLender.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Interest Rate: {selectedLender.rate}%
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              )}

              <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">First Name</Typography></Grid>
                  <Grid xs={6}><Typography>{formData.firstName || 'Not provided'}</Typography></Grid>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Last Name</Typography></Grid>
                  <Grid xs={6}><Typography>{formData.lastName || 'Not provided'}</Typography></Grid>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Email</Typography></Grid>
                  <Grid xs={6}><Typography>{formData.email || 'Not provided'}</Typography></Grid>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Phone</Typography></Grid>
                  <Grid xs={6}><Typography>{formData.phone ? `+266${formData.phone}` : 'Not provided'}</Typography></Grid>
                </Grid>
              </Card>

              <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Financial Details</Typography>
                <Grid container spacing={2}>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Monthly Income</Typography></Grid>
                  <Grid xs={6}><Typography>M{formData.income || 'Not provided'}</Typography></Grid>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Loan Amount</Typography></Grid>
                  <Grid xs={6}><Typography>M{formData.loanAmount || 'Not provided'}</Typography></Grid>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Employment</Typography></Grid>
                  <Grid xs={6}><Typography>{employmentOptions.find(e => e.value === formData.employment)?.label || 'Not provided'}</Typography></Grid>
                  <Grid xs={6}><Typography variant="body2" color="text.secondary">Loan Purpose</Typography></Grid>
                  <Grid xs={6}><Typography>{loanPurposes.find(p => p.value === formData.loanPurpose)?.label || 'Not provided'}</Typography></Grid>
                </Grid>
              </Card>

              <Alert severity="info" sx={{ mb: 3 }}>
                <FaUserShield style={{ marginRight: 8 }} />
                This pre-approval check will not impact your credit score.
              </Alert>
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button onClick={handleBack} disabled={activeStep === 0 || loading} variant="outlined">
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} disabled={loading}>
                Next
              </Button>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default PreApprovalPage;