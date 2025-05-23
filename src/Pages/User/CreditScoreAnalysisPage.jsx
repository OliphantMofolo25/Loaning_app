import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Paper, 
  CircularProgress, Grid, Button, Divider,
  Card, CardContent, LinearProgress, Tooltip,
  Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const CreditScoreAnalysisPage = () => {
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchScoreData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/credit-score', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setScoreData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching score data:', err);
      setError(err.response?.data?.message || 'Failed to fetch credit score');
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to fetch credit score',
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshScore = async () => {
    try {
      setRefreshing(true);
      const response = await axios.post('/api/credit-score/refresh', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setScoreData(response.data);
      setSnackbar({
        open: true,
        message: 'Credit score refreshed successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error refreshing score:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to refresh credit score',
        severity: 'error'
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchScoreData();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 800) return '#4CAF50';
    if (score >= 740) return '#8BC34A';
    if (score >= 670) return '#FFC107';
    if (score >= 580) return '#FF9800';
    return '#F44336';
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading && !refreshing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error && !scoreData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<FaArrowLeft />}
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Credit Score Analysis
          </Typography>
        </Box>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={fetchScoreData}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Credit Score Analysis
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Your Current Credit Score
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date(scoreData.lastUpdated).toLocaleDateString()}
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            onClick={refreshScore}
            disabled={refreshing}
          >
            {refreshing ? <CircularProgress size={24} /> : 'Refresh Score'}
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          mb: 4
        }}>
          <Box sx={{
            position: 'relative',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `conic-gradient(${getScoreColor(scoreData.score)} 0% ${scoreData.score / 10}%, #eee ${scoreData.score / 10}% 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3
          }}>
            <Box sx={{
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 700,
                color: getScoreColor(scoreData.score)
              }}>
                {scoreData.score}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Credit Score
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
            Score Factors
          </Typography>
          <Grid container spacing={2}>
            {scoreData.factors.map((factor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {factor.name}
                      </Typography>
                      <Tooltip title={`Impact: ${factor.impact}`} arrow>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FaInfoCircle size={14} style={{ marginRight: 4 }} />
                          <Typography variant="body2">
                            {factor.impact}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={factor.value} 
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        mb: 1,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getScoreColor(scoreData.score),
                          borderRadius: 4
                        }
                      }} 
                    />
                    <Typography variant="body2" color="text.secondary">
                      Weight: {factor.value}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
            How to Improve Your Score
          </Typography>
          <Grid container spacing={2}>
            {[
              'Pay your bills on time, every time',
              'Keep credit card balances low',
              'Only apply for credit when needed',
              'Maintain a mix of credit types',
              'Regularly check your credit report for errors'
            ].map((tip, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </Box>
                  <Typography variant="body1">{tip}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreditScoreAnalysisPage;