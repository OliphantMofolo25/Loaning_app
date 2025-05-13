import React, { useState } from 'react';
import {
  Box, Typography, Container, Paper,
  Grid, Button, Slider, TextField,
  Divider, InputAdornment, Card
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { FaCalculator } from 'react-icons/fa';

const LoanCalculatorPage = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(8.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculatePayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm;
    const x = Math.pow(1 + monthlyRate, payments);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    if (isFinite(monthly)) {
      setMonthlyPayment(monthly.toFixed(2));
      setTotalInterest((monthly * payments - loanAmount).toFixed(2));
    } else {
      setMonthlyPayment(0);
      setTotalInterest(0);
    }
  };

  React.useEffect(() => {
    calculatePayment();
  }, [loanAmount, loanTerm, interestRate]);

  const handleAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleTermChange = (event, newValue) => {
    setLoanTerm(newValue);
  };

  const handleRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Loan Calculator
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FaCalculator size={24} style={{ marginRight: 12 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Calculate Your Payment
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Loan Amount: M{loanAmount.toLocaleString()}
              </Typography>
              <Slider
                value={loanAmount}
                onChange={handleAmountChange}
                min={10000}
                max={1000000}
                step={5000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `M${value.toLocaleString()}`}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Loan Term: {loanTerm} months
              </Typography>
              <Slider
                value={loanTerm}
                onChange={handleTermChange}
                min={3}
                max={84}
                step={3}
                marks={[
                  { value: 12, label: '1 yr' },
                  { value: 24, label: '2 yr' },
                  { value: 36, label: '3 yr' },
                  { value: 60, label: '5 yr' },
                  { value: 84, label: '7 yr' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Interest Rate: {interestRate}%
              </Typography>
              <Slider
                value={interestRate}
                onChange={handleRateChange}
                min={5}
                max={25}
                step={0.5}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Payment Summary
            </Typography>

            <Card sx={{ p: 2, mb: 3, borderLeft: '4px solid #4CAF50' }}>
              <Typography variant="body1" color="text.secondary">
                Monthly Payment
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                M{monthlyPayment}
              </Typography>
            </Card>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Loan Amount
                  </Typography>
                  <Typography variant="h6">
                    M{loanAmount.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Interest
                  </Typography>
                  <Typography variant="h6">
                    M{totalInterest}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Loan Term
                  </Typography>
                  <Typography variant="h6">
                    {loanTerm} months
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Interest Rate
                  </Typography>
                  <Typography variant="h6">
                    {interestRate}%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/services/loan-offers')}
              sx={{ mt: 2 }}
            >
              Apply for This Loan
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Amortization Schedule
        </Typography>
        <Typography color="text.secondary">
          Your detailed payment breakdown will appear here when you calculate a loan.
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoanCalculatorPage;