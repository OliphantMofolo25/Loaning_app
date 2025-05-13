import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, MenuItem, Select,
  InputLabel, FormControl, Alert, CircularProgress
} from '@mui/material';

const MakePayment = () => {
  const [amount, setAmount] = useState('');
  const [loanId, setLoanId] = useState('');
  const [methodId, setMethodId] = useState('');
  const [loans, setLoans] = useState([]);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Empty useEffect for future API call
  useEffect(() => {
    // Placeholder for future API fetching logic
    // e.g., fetch loans and methods here and update state
  }, []);

  const handleSubmit = () => {
    if (!loanId || !amount || !methodId) {
      setFeedback({ type: 'error', message: 'Please fill all fields.' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setFeedback({ type: 'success', message: 'Payment submitted successfully (simulated).' });
      setAmount('');
      setLoanId('');
      setMethodId('');
      setLoading(false);
    }, 1000); // Simulated delay
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Make a Payment
      </Typography>

      {feedback.message && (
        <Alert severity={feedback.type} sx={{ mb: 2 }}>
          {feedback.message}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Loan</InputLabel>
        <Select
          value={loanId}
          label="Loan"
          onChange={(e) => setLoanId(e.target.value)}
          disabled
        >
          <MenuItem value="">
            <em>No loans available (yet)</em>
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Amount"
        fullWidth
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={methodId}
          label="Payment Method"
          onChange={(e) => setMethodId(e.target.value)}
          disabled
        >
          <MenuItem value="">
            <em>No methods available (yet)</em>
          </MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Payment'}
      </Button>
    </Box>
  );
};

export default MakePayment;
