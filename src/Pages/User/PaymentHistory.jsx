// src/Pages/User/PaymentHistory.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payment-history');  // Replace with your API endpoint
        setPayments(response.data);
        setFilteredPayments(response.data);
      } catch (err) {
        setError('Failed to load payment history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter payments based on search term
  useEffect(() => {
    const filtered = payments.filter(
      (payment) =>
        payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.date.includes(searchTerm) ||
        payment.amount.toString().includes(searchTerm)
    );
    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>
      <TextField
        label="Search by Date, Status, or Amount"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '20px' }}
      />
      <Grid container spacing={2}>
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <Grid item xs={12} sm={6} md={4} key={payment.id}>
              <Paper elevation={2} sx={{ padding: '15px' }}>
                <Typography variant="h6">Payment ID: {payment.id}</Typography>
                <Typography variant="body1">Date: {payment.date}</Typography>
                <Typography variant="body1">Amount: ${payment.amount}</Typography>
                <Typography variant="body1">Status: {payment.status}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No payments found.</Typography>
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={() => alert('New Payment History Action')}
      >
        Perform Action
      </Button>
    </Paper>
  );
};

export default PaymentHistory;
