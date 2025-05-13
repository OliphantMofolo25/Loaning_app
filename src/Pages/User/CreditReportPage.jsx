// src/pages/CreditReportPage.js

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper,
  CircularProgress, Button, Divider,
  Grid, Alert, Tabs, Tab, Chip,
  Tooltip, IconButton, Accordion,
  AccordionSummary, AccordionDetails, Stack, LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft, FaDownload, FaPrint, FaChevronDown,
  FaInfoCircle, FaHistory, FaBalanceScale
} from 'react-icons/fa';
import { MdAccountBalance, MdPayment, MdCreditScore } from 'react-icons/md';
import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const API_BASE_URL = 'http://localhost:3001';

const formatCurrency = (amount) => {
  if (isNaN(amount)) return 'M0.00';
  return new Intl.NumberFormat('en-LS', {
    style: 'currency',
    currency: 'LSL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : format(date, 'dd/MM/yyyy');
  } catch {
    return 'N/A';
  }
};

const CreditReportPage = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    creditScore: 0,
    scoreRange: 'No Credit History',
    accounts: [],
    inquiries: [],
    publicRecords: [],
    creditUtilization: '0%',
    totalDebt: 0,
    availableCredit: 0,
    openAccounts: 0
  });
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [expandedLoan, setExpandedLoan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/loans/credit-report`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const creditData = response.data;
        const formattedAccounts = creditData.accounts.map(account => ({
          ...account,
          opened: formatDate(account.opened),
          nextPaymentDate: formatDate(account.nextPaymentDate)
        }));

        setReportData({ ...creditData, accounts: formattedAccounts });
      } catch (error) {
        console.error('Error fetching credit report:', error);
        setError(error.response?.data?.message || 'Failed to load credit report.');
        setReportData({
          creditScore: 0,
          scoreRange: 'No Credit History',
          accounts: [],
          inquiries: [],
          publicRecords: [],
          creditUtilization: '0%',
          totalDebt: 0,
          availableCredit: 0,
          openAccounts: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleLoanExpand = (loanId) => setExpandedLoan(expandedLoan === loanId ? null : loanId);
  const handleRefresh = () => window.location.reload();

  const calculatePaymentHistoryScore = (history) => {
    if (!history || history.length === 0) return 0;
    const paid = history.filter(s => s === 'paid').length;
    return Math.round((paid / history.length) * 100);
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
          <Button startIcon={<FaArrowLeft />} onClick={() => navigate(-1)} variant="outlined">
            Back
          </Button>
          <Typography variant="h4" fontWeight={600}>
            Credit Report & Loan Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton color="primary" onClick={handleRefresh}>
              <FaHistory />
            </IconButton>
          </Tooltip>
          <Button startIcon={<FaDownload />} variant="outlined">Download</Button>
          <Button startIcon={<FaPrint />} variant="outlined">Print</Button>
          <Button startIcon={<FaBalanceScale />} variant="contained" color="secondary">
            Compare Loan Options
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700}>{reportData.creditScore}</Typography>
              <Chip label={reportData.scoreRange}
                color={reportData.creditScore >= 720 ? 'success' : reportData.creditScore >= 650 ? 'warning' : 'error'}
                sx={{ my: 1 }}
              />
              <Typography variant="body2" color="text.secondary">FICO Score 8</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}><SummaryCard title="Total Debt" value={formatCurrency(reportData.totalDebt)} /></Grid>
              <Grid item xs={6} sm={3}><SummaryCard title="Available Credit" value={formatCurrency(reportData.availableCredit)} /></Grid>
              <Grid item xs={6} sm={3}><SummaryCard title="Credit Utilization" value={reportData.creditUtilization} /></Grid>
              <Grid item xs={6} sm={3}><SummaryCard title="Open Accounts" value={reportData.openAccounts} /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
        <Tab label="Accounts & Loans" icon={<MdAccountBalance />} />
        <Tab label="Credit Inquiries" icon={<FaInfoCircle />} />
        <Tab label="Public Records" icon={<MdPayment />} />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          {reportData.accounts.map(loan => (
            <Accordion
              key={loan.id}
              expanded={expandedLoan === loan.id}
              onChange={() => handleLoanExpand(loan.id)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<FaChevronDown />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Box>
                    <Typography fontWeight={500}>{loan.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{loan.type} • Opened: {loan.opened}</Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography>{formatCurrency(loan.balance)}</Typography>
                    <Chip
                      label={loan.status}
                      color={loan.status === 'Active' ? 'success' : loan.status === 'Defaulted' ? 'error' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <LoanDetail loan={loan} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontWeight={500} mb={1}>Payment History</Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">On-time: {calculatePaymentHistoryScore(loan.paymentHistory)}%</Typography>
                      <Typography variant="body2">
                        {loan.paymentHistory.filter(p => p === 'paid').length}/{loan.paymentHistory.length}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      value={calculatePaymentHistoryScore(loan.paymentHistory)}
                      variant="determinate"
                      sx={{ height: 8, borderRadius: 4, my: 1 }}
                      color={
                        calculatePaymentHistoryScore(loan.paymentHistory) > 90 ? 'success' :
                          calculatePaymentHistoryScore(loan.paymentHistory) > 70 ? 'warning' : 'error'
                      }
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Container>
  );
};

const SummaryCard = ({ title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="body2" color="text.secondary">{title}</Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

const LoanDetail = ({ loan }) => (
  <>
    <Typography fontWeight={500} mb={1}>Loan Details</Typography>
    <Grid container spacing={1}>
      <Grid item xs={6}><Detail label="Original Amount" value={loan.originalAmount && formatCurrency(loan.originalAmount)} /></Grid>
      <Grid item xs={6}><Detail label="Interest Rate" value={loan.interestRate} /></Grid>
      <Grid item xs={6}><Detail label="Monthly Payment" value={loan.payment && formatCurrency(loan.payment)} /></Grid>
      <Grid item xs={6}><Detail label="Term" value={loan.term} /></Grid>
      {loan.remainingTerm && <Grid item xs={6}><Detail label="Remaining Term" value={loan.remainingTerm} /></Grid>}
      {loan.nextPaymentDate && <Grid item xs={6}><Detail label="Next Payment" value={loan.nextPaymentDate} /></Grid>}
      {loan.collateral && <Grid item xs={12}><Detail label="Collateral" value={loan.collateral} /></Grid>}
      {loan.repaymentPlan && <Grid item xs={12}><Detail label="Repayment Plan" value={loan.repaymentPlan} /></Grid>}
    </Grid>
  </>
);

const Detail = ({ label, value }) => (
  <>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography>{value || 'N/A'}</Typography>
  </>
);

export default CreditReportPage;
