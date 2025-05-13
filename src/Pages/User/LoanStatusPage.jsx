import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper,
  Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Chip, LinearProgress, Divider, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Refresh } from '@mui/icons-material';
import { FaFileAlt } from 'react-icons/fa';

const LoanStatusPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  // Status mapping with colors and progress values
  const statusConfig = {
    'Pending': { color: 'warning', progress: 30 },
    'Under Review': { color: 'warning', progress: 60 },
    'Approved': { color: 'success', progress: 90 },
    'Disbursed': { color: 'success', progress: 100 },
    'Rejected': { color: 'error', progress: 100 }
  };

  const fetchLoanApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch('https://backend-credit.onrender.com/api/loans/my-loans', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch loan applications');
      }

      const data = await response.json();
      setApplications(data.loans || []);
    } catch (err) {
      console.error('Error fetching loans:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  const refreshApplications = () => {
    fetchLoanApplications();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount).replace('$', 'M');
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
          Loan Application Status
        </Typography>
        <Button
          startIcon={<Refresh />}
          onClick={refreshApplications}
          sx={{ ml: 'auto' }}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : applications.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            p: 4,
            textAlign: 'center'
          }}>
            <FaFileAlt size={48} style={{ marginBottom: 16, color: '#9e9e9e' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No Active Applications
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              You don't have any active loan applications at this time.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/services/loan-offers')}
            >
              Apply for a Loan
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Loan Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Application Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id} hover>
                    <TableCell>{app._id.substring(18, 24).toUpperCase()}</TableCell>
                    <TableCell>{app.loanPurpose}</TableCell>
                    <TableCell>{formatCurrency(app.loanAmount)}</TableCell>
                    <TableCell>{formatDate(app.createdAt)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={statusConfig[app.status]?.color || 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={statusConfig[app.status]?.progress || 0} 
                          />
                        </Box>
                        <Typography variant="body2">
                          {statusConfig[app.status]?.progress || 0}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => navigate(`/services/loan-details/${app._id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Paper sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Need Help?
        </Typography>
        <Typography sx={{ mb: 2 }}>
          If you have questions about your application status, please contact our support team.
        </Typography>
        <Button variant="outlined">
          Contact Support
        </Button>
      </Paper>
    </Container>
  );
};

export default LoanStatusPage;