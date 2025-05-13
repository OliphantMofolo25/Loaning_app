// src/Pages/User/PaymentMethods.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

const PaymentMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with actual API URL to fetch payment methods
    const fetchMethods = async () => {
      try {
        const response = await axios.get('/api/payment-methods');  // Adjust the URL accordingly
        setMethods(response.data);
      } catch (err) {
        setError('Failed to load payment methods');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>
      <Grid container spacing={2}>
        {methods.length > 0 ? (
          methods.map((method) => (
            <Grid item xs={12} sm={6} md={4} key={method.id}>
              <Paper elevation={2} sx={{ padding: '15px' }}>
                <Typography variant="h6">{method.type}</Typography>
                <Typography variant="body1">Ending in: {method.last4}</Typography>
                <Typography variant="body1">Expires: {method.expiry}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No payment methods found.</Typography>
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={() => alert('Add a New Payment Method')}
      >
        Add Payment Method
      </Button>
    </Paper>
  );
};

export default PaymentMethods;
