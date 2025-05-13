import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper, CircularProgress, Button, Divider,
  Tabs, Tab, Tooltip, IconButton, Alert, Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaPrint, FaHistory, FaPlusCircle } from 'react-icons/fa';
import { MdPayment, MdAccountBalance } from 'react-icons/md';
import axios from 'axios';
import { motion } from 'framer-motion';
import PaymentHistory from './PaymentHistory';
import MakePayment from './MakePayment';
import PaymentMethods from './PaymentMethods';

const API_BASE_URL = 'http://localhost:3001';

const PaymentServicesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);
  const [loans, setLoans] = useState([]);
  const [noLoans, setNoLoans] = useState(false);
  const [pendingLoan, setPendingLoan] = useState(false);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/loans/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userLoans = response.data.loans || [];

      if (userLoans.length === 0) {
        setNoLoans(true);
      } else {
        setLoans(userLoans);
        const hasPending = userLoans.some((loan) => loan.status === 'Pending');
        setPendingLoan(hasPending);
      }
    } catch (err) {
      console.error('Error fetching loans:', err);
      setError(err.response?.data?.message || 'Failed to load loans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRefresh = () => {
    fetchLoans();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<FaArrowLeft />}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Payment Services
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} color="primary">
              <FaHistory />
            </IconButton>
          </Tooltip>
          <Button startIcon={<FaDownload />} variant="outlined" sx={{ mr: 1 }}>
            Download
          </Button>
          <Button startIcon={<FaPrint />} variant="outlined">
            Print
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {noLoans && (
        <Alert severity="info" sx={{ mb: 3 }}>
          You do not have any active loans.
        </Alert>
      )}

      {pendingLoan && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have a pending loan. Payment options are currently unavailable.
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdPayment /> Payment Services Overview
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<FaPlusCircle />}
            onClick={() => setTabValue(0)}
            disabled={pendingLoan}
          >
            Make a Payment
          </Button>
        </Stack>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Make a Payment" icon={<MdPayment />} />
          <Tab label="Payment History" icon={<FaHistory />} />
          <Tab label="Payment Methods" icon={<MdAccountBalance />} />
        </Tabs>
      </Box>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        {tabValue === 0 && <MakePayment loans={loans} disabled={pendingLoan} />}
        {tabValue === 1 && <PaymentHistory />}
        {tabValue === 2 && <PaymentMethods />}
      </Paper>
    </Container>
  );
};

export default PaymentServicesPage;
