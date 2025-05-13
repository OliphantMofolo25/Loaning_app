import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Card, Container,
  Button, Paper, Chip, Avatar, Stack,
  Tabs, Tab, Tooltip, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Info } from '@mui/icons-material';
import { FaHandHoldingUsd, FaChartLine, FaFileSignature } from 'react-icons/fa';

// Import bank logos - using URL encoded paths for spaces
const standardLesothoBankLogo = new URL('../../assets/images/Standard%20Lesotho%20Bank.jpeg', import.meta.url).href;
const postBankLesothoLogo = new URL('../../assets/images/Post%20Bank%20Lesotho.png', import.meta.url).href;
const fnbLogo = new URL('../../assets/images/FNB.png', import.meta.url).href;
const nedbankLogo = new URL('../../assets/images/NedBank.png', import.meta.url).href;

const lenders = [
  {
    id: 1,
    name: 'Standard Lesotho Bank',
    rate: '5.5%',
    description: 'Competitive rates with flexible repayment terms',
    image: standardLesothoBankLogo,
    color: '#003366',
    features: ['Up to M500,000', '12-60 months', 'No prepayment penalty'],
    maxAmount: 500000,
    minTerm: 12,
    maxTerm: 60
  },
  {
    id: 2,
    name: 'First National Bank',
    rate: '6.0%',
    description: 'Fast approval process with online application',
    image: fnbLogo,
    color: '#007C6E',
    features: ['Up to M300,000', '6-48 months', 'Mobile banking'],
    maxAmount: 300000,
    minTerm: 6,
    maxTerm: 48
  },
  {
    id: 3,
    name: 'Nedbank Lesotho',
    rate: '5.8%',
    description: 'Personalized loan solutions for all needs',
    image: nedbankLogo,
    color: '#006A4E',
    features: ['Up to M750,000', '12-84 months', 'Relationship discounts'],
    maxAmount: 750000,
    minTerm: 12,
    maxTerm: 84
  },
  {
    id: 4,
    name: 'Lesotho PostBank',
    rate: '6.2%',
    description: 'Government-backed secure lending options',
    image: postBankLesothoLogo,
    color: '#B8860B',
    features: ['Up to M200,000', '6-36 months', 'Low documentation'],
    maxAmount: 200000,
    minTerm: 6,
    maxTerm: 36
  },
];

const loanServices = [
  { 
    title: 'Loan Calculator', 
    icon: <FaChartLine size={20} />, 
    path: '/services/loan-calculator',
    description: 'Estimate your monthly payments and total cost',
    color: '#4CAF50'
  },
  { 
    title: 'Application Status', 
    icon: <FaFileSignature size={20} />, 
    path: '/services/loan-status',
    description: 'Track your existing loan applications',
    color: '#2196F3'
  },
  { 
    title: 'Pre-Approval', 
    icon: <FaHandHoldingUsd size={20} />, 
    path: '/services/pre-approval',
    description: 'Check your eligibility without credit impact',
    color: '#FF9800'
  }
];

const LoanServicesPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApplyNow = (lender) => {
    navigate('/services/pre-approval', {
      state: {
        selectedLender: lender,
        step: 0 // Start at first step
      }
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/services')}
            sx={{ mr: 2 }}
          >
            Back to Services
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600, display: 'inline-block' }}>
            Loan Services
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Chip label="Active Offers" color="primary" variant="outlined" />
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <FaHandHoldingUsd />
          </Avatar>
        </Stack>
      </Box>

      {/* Loan Services Quick Access */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Loan Tools
        </Typography>
        
        <Grid container spacing={3}>
          {loanServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  p: 2.5, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  borderLeft: `3px solid ${service.color}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
                elevation={0}
              >
                <Box sx={{ 
                  display: 'inline-flex',
                  p: 1.5,
                  mb: 2,
                  borderRadius: '50%',
                  backgroundColor: `${service.color}20`,
                  color: service.color
                }}>
                  {service.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {service.description}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<span style={{ marginLeft: 5 }}>→</span>}
                  sx={{ 
                    alignSelf: 'flex-start',
                    color: service.color,
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  onClick={() => navigate(service.path)}
                >
                  Access Tool
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Lender Comparison Tabs */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Featured Lenders" />
          <Tab label="Interest Rates" />
          <Tab label="Eligibility" />
        </Tabs>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            {lenders.map((lender) => (
              <Grid item xs={12} sm={6} md={3} key={lender.id}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: `4px solid ${lender.color}`,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={lender.image}
                      alt={lender.name}
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        mr: 2,
                        border: `2px solid ${lender.color}`
                      }}
                    />
                    <Box>
                      <Typography variant="h6">{lender.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lender.rate} interest rate
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
                    {lender.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    {lender.features.map((feature, i) => (
                      <Chip 
                        key={i}
                        label={feature}
                        size="small"
                        sx={{ 
                          mr: 1, 
                          mb: 1,
                          backgroundColor: `${lender.color}20`,
                          color: lender.color
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: lender.color,
                      '&:hover': {
                        backgroundColor: lender.color,
                        opacity: 0.9
                      }
                    }}
                    onClick={() => handleApplyNow(lender)}
                  >
                    Apply Now
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Current Market Rates
            </Typography>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2}>
                {lenders.map((lender) => (
                  <Grid item xs={12} sm={6} md={3} key={lender.id}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderLeft: `3px solid ${lender.color}`
                    }}>
                      <Avatar src={lender.image} sx={{ width: 40, height: 40, mr: 2 }} />
                      <Box>
                        <Typography variant="body1">{lender.name}</Typography>
                        <Typography variant="h6" color={lender.color}>
                          {lender.rate}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            <Typography variant="body2" color="text.secondary">
              <Info sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              Rates are subject to change based on credit profile and loan amount.
            </Typography>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              General Eligibility Requirements
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Basic Requirements
                  </Typography>
                  <ul>
                    <li><Typography variant="body2">Lesotho citizen or permanent resident</Typography></li>
                    <li><Typography variant="body2">Minimum age of 18 years</Typography></li>
                    <li><Typography variant="body2">Valid government-issued ID</Typography></li>
                    <li><Typography variant="body2">Proof of income (3 months minimum)</Typography></li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Credit Requirements
                  </Typography>
                  <ul>
                    <li><Typography variant="body2">Minimum credit score of 600</Typography></li>
                    <li><Typography variant="body2">No active defaults</Typography></li>
                    <li><Typography variant="body2">Debt-to-income ratio below 40%</Typography></li>
                    <li><Typography variant="body2">At least 6 months credit history</Typography></li>
                  </ul>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Loan Process Steps */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          How It Works
        </Typography>
        <Grid container spacing={3}>
          {[
            { 
              title: 'Check Eligibility', 
              description: 'Quick pre-approval with no credit impact',
              action: () => navigate('/services/pre-approval')
            },
            { 
              title: 'Compare Offers', 
              description: 'View rates from multiple lenders',
              action: () => navigate('/services/loan-offers')
            },
            { 
              title: 'Submit Application', 
              description: 'Complete your application online',
              action: () => navigate('/services/pre-approval')
            },
            { 
              title: 'Receive Funds', 
              description: 'Get money deposited in 1-3 business days',
              action: () => navigate('/services/loan-status')
            }
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box 
                sx={{ 
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
                onClick={step.action}
              >
                <Avatar sx={{ 
                  bgcolor: 'primary.main', 
                  mb: 2,
                  width: 56,
                  height: 56,
                  fontSize: '1.25rem'
                }}>
                  {index + 1}
                </Avatar>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoanServicesPage;