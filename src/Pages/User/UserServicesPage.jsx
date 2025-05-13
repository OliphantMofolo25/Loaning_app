import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, Container,
  Button, Paper, CircularProgress,
  Chip, Avatar, Stack, Divider, Tooltip,
  Fade, Grow, Slide, Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  FaChartLine, FaFileInvoiceDollar, FaHandHoldingUsd,
  FaBell, FaCog, FaCrown, FaChevronRight, FaCreditCard,
  FaSignOutAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

// Gradient animation keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const SERVICES = [
  { 
    title: 'Credit Score Analysis', 
    icon: <FaChartLine size={20} />, 
    path: '/services/credit-score',
    description: 'Detailed breakdown of your credit factors and improvement tips',
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #8BC34A)'
  },
  { 
    title: 'Credit Report', 
    icon: <FaFileInvoiceDollar size={20} />, 
    path: '/services/credit-report',
    description: 'Full history from major bureaus with dispute options',
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #2196F3, #03A9F4)'
  },
  { 
    title: 'Loan Offers', 
    icon: <FaHandHoldingUsd size={20} />, 
    path: '/services/loan-offers',
    description: 'Personalized loan options from trusted lenders',
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800, #FFC107)'
  },
  { 
    title: 'Payment Services', 
    icon: <FaCreditCard size={20} />, 
    path: '/services/payment',
    description: 'Make payments and manage your credit accounts in one place',
    color: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0, #673AB7)'
  }
];

const UserServicesPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Simulate API delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = await fetch('http://localhost:3001/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch profile');
        }

        const data = await response.json();
        setUserData(data.user);
        localStorage.setItem('userData', JSON.stringify(data.user));
      } catch (err) {
        setError(err.message);
        const localData = JSON.parse(localStorage.getItem('userData'));
        if (localData) setUserData(localData);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const getScoreRating = (score) => {
    if (!score) return { label: 'N/A', color: '#9E9E9E' };
    if (score >= 800) return { label: 'Excellent', color: '#4CAF50' };
    if (score >= 740) return { label: 'Very Good', color: '#8BC34A' };
    if (score >= 670) return { label: 'Good', color: '#FFC107' };
    if (score >= 580) return { label: 'Fair', color: '#FF9800' };
    return { label: 'Poor', color: '#F44336' };
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CircularProgress size={60} thickness={4} sx={{ color: '#4CAF50' }} />
        </motion.div>
      </Box>
    );
  }

  const scoreRating = getScoreRating(userData?.creditScore);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Animated Gradient Header */}
      <Fade in={!loading} timeout={800}>
        <Box sx={{ 
          position: 'relative',
          mb: 4,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 3,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #ff8a00, #e52e71, #4CAF50, #2196F3)',
            backgroundSize: '400% 400%',
            animation: `${gradientAnimation} 8s ease infinite`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }
        }}>
          <Paper sx={{ 
            p: 3,
            pt: 4,
            borderRadius: '0 0 12px 12px',
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(2px)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 800, 
                  mb: 1,
                  background: 'linear-gradient(90deg, #4CAF50, #2196F3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  letterSpacing: '-0.5px'
                }}>
                  Welcome back, {userData?.firstName || 'User'} 👋
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Chip 
                      icon={<FaCrown style={{ fontSize: '14px', color: '#FFD700' }} />}
                      label="Premium Member" 
                      size="small"
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
                        color: 'white',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}
                    />
                  </motion.div>
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    fontStyle: 'italic',
                    fontSize: '0.9rem'
                  }}>
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Tooltip title="Notifications" arrow>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<FaBell />}
                      sx={{ 
                        minWidth: 'auto',
                        borderRadius: '12px',
                        width: '40px',
                        height: '40px',
                        borderColor: 'rgba(0,0,0,0.1)',
                        color: 'text.secondary'
                      }}
                    />
                  </motion.div>
                </Tooltip>
                <Tooltip title="Settings" arrow>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<FaCog />}
                      sx={{ 
                        minWidth: 'auto',
                        borderRadius: '12px',
                        width: '40px',
                        height: '40px',
                        borderColor: 'rgba(0,0,0,0.1)',
                        color: 'text.secondary'
                      }}
                    />
                  </motion.div>
                </Tooltip>
                <Tooltip title="Sign Out" arrow>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<FaSignOutAlt />}
                      onClick={handleSignOut}
                      sx={{ 
                        minWidth: 'auto',
                        borderRadius: '12px',
                        width: '40px',
                        height: '40px',
                        borderColor: 'rgba(0,0,0,0.1)',
                        color: 'text.secondary'
                      }}
                    />
                  </motion.div>
                </Tooltip>
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main',
                      width: 42,
                      height: 42,
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: 1
                    }}
                  >
                    {userData?.firstName?.charAt(0) || 'U'}
                  </Avatar>
                </motion.div>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Dashboard Stats with staggered animations */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Grow in={!loading} timeout={1000}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3, 
              height: '100%',
              borderLeft: '4px solid #4CAF50',
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.25)'
              }
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ 
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: '0.75rem'
              }}>
                YOUR CREDIT SCORE
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 0 0 rgba(76, 175, 80, 0.4)', '0 0 20px rgba(76, 175, 80, 0.4)', '0 0 0 rgba(76, 175, 80, 0.4)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Box sx={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    background: `conic-gradient(${scoreRating.color} 0% ${userData?.creditScore ? (userData.creditScore / 10) : 0}%, #eee ${userData?.creditScore ? (userData.creditScore / 10) : 0}% 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      border: `2px solid ${scoreRating.color}20`,
                      top: '3px',
                      left: '3px'
                    }
                  }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {userData?.creditScore || '--'}
                    </Typography>
                  </Box>
                </motion.div>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {scoreRating.label}
                    <Box component="span" sx={{ 
                      ml: 1,
                      fontSize: '0.7rem',
                      backgroundColor: `${scoreRating.color}20`,
                      color: scoreRating.color,
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px'
                    }}>
                      {userData?.creditScoreChange ? (
                        `${userData.creditScoreChange > 0 ? '+' : ''}${userData.creditScoreChange} pts`
                      ) : '--'}
                    </Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                    Last updated: Today
                  </Typography>
                  <Button 
                    variant="text" 
                    size="small" 
                    sx={{ 
                      mt: 1,
                      color: scoreRating.color,
                      fontWeight: 600,
                      px: 0,
                      '&:hover': { 
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    View score factors
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grow>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grow in={!loading} timeout={1200}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3, 
              height: '100%',
              borderLeft: '4px solid #FF9800',
              boxShadow: '0 4px 20px rgba(255, 152, 0, 0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.25)'
              }
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ 
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: '0.75rem'
              }}>
                QUICK ACTIONS
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <motion.div whileHover={{ y: -3 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      size="medium"
                      onClick={() => navigate('/services/credit-report')}
                      sx={{
                        background: 'linear-gradient(135deg, #2196F3, #03A9F4)',
                        borderRadius: '8px',
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: '0 4px 6px rgba(33, 150, 243, 0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 10px rgba(33, 150, 243, 0.4)'
                        }
                      }}
                    >
                      View Report
                    </Button>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <motion.div whileHover={{ y: -3 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      size="medium"
                      onClick={() => navigate('/services/loan-offers')}
                      sx={{
                        background: 'linear-gradient(135deg, #FF9800, #FFC107)',
                        borderRadius: '8px',
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: '0 4px 6px rgba(255, 152, 0, 0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 10px rgba(255, 152, 0, 0.4)'
                        }
                      }}
                    >
                      Get Loans
                    </Button>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <motion.div whileHover={{ y: -3 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      size="medium"
                      onClick={() => navigate('/services/credit-score')}
                      sx={{
                        background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
                        borderRadius: '8px',
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: '0 4px 6px rgba(76, 175, 80, 0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 10px rgba(76, 175, 80, 0.4)'
                        }
                      }}
                    >
                      Score Analysis
                    </Button>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <motion.div whileHover={{ y: -3 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      size="medium"
                      onClick={() => navigate('/services/payment')}
                      sx={{
                        background: 'linear-gradient(135deg, #9C27B0, #673AB7)',
                        borderRadius: '8px',
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: '0 4px 6px rgba(156, 39, 176, 0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 10px rgba(156, 39, 176, 0.4)'
                        }
                      }}
                    >
                      Make Payment
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </Paper>
          </Grow>
        </Grid>
      </Grid>

      {/* Services Section with animated cards */}
      <Slide direction="up" in={!loading} timeout={800}>
        <Paper sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              color: '#2d3748',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #4CAF50, #2196F3)',
                borderRadius: '2px'
              }
            }}>
              Credit Services
            </Typography>
            <Button 
              variant="text" 
              endIcon={<FaChevronRight size={14} />}
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              View all services
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {SERVICES.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Card 
                    sx={{ 
                      p: 0, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.03)',
                      '&:hover': {
                        boxShadow: '0 12px 20px rgba(0,0,0,0.12)'
                      }
                    }}
                    elevation={0}
                  >
                    <Box sx={{ 
                      height: '6px',
                      background: service.gradient,
                      backgroundSize: '200% 200%',
                      animation: `${gradientAnimation} 6s ease infinite`
                    }} />
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ 
                        display: 'inline-flex',
                        p: 2,
                        mb: 2,
                        borderRadius: '12px',
                        backgroundColor: `${service.color}15`,
                        color: service.color,
                        boxShadow: `0 2px 8px ${service.color}20`
                      }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        mb: 1.5,
                        color: '#2d3748'
                      }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        mb: 2, 
                        flexGrow: 1,
                        fontSize: '0.9rem',
                        lineHeight: 1.6
                      }}>
                        {service.description}
                      </Typography>
                      <motion.div whileHover={{ x: 5 }}>
                        <Button
                          variant="text"
                          size="small"
                          endIcon={<FaChevronRight size={12} />}
                          sx={{ 
                            alignSelf: 'flex-start',
                            color: service.color,
                            px: 0,
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                          onClick={() => navigate(service.path)}
                        >
                          Access Service
                        </Button>
                      </motion.div>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Slide>

      {/* Recent Activity Section with skeleton animation */}
      <Fade in={!loading} timeout={1000}>
        <Paper sx={{ 
          p: 4, 
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          border: '1px solid rgba(0,0,0,0.03)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            mb: 3,
            color: '#2d3748'
          }}>
            Recent Activity
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 200,
            border: '2px dashed rgba(0, 0, 0, 0.08)',
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
              animation: `${pulseAnimation} 2s ease-in-out infinite`
            }} />
            <Typography color="text.secondary" sx={{ 
              position: 'relative',
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.7)',
              px: 2,
              py: 1,
              borderRadius: 1
            }}>
              Your recent activity will appear here
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default UserServicesPage;