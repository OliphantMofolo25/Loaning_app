import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
  Tooltip,
  Badge
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  AdminPanelSettings,
  CreditScore,
  ReceiptLong,
  Assessment,
  Security,
  ArrowForward,
  VerifiedUser,
  TrendingUp,
  AccountBalance,
  NotificationsActive,
  CompareArrows
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './LandingPage.css';

// Image imports
import IMG1 from '../assets/images/IMG1.jpg';
import IMG2 from '../assets/images/IMG2.png';
import HouseImage from '../assets/images/House.jpeg';
import IMG3 from '../assets/images/IMG3.jpg';
import IMG4 from '../assets/images/IMG4.jpg';
import IMG6 from '../assets/images/IMG6.jpg';

const MotionButton = motion(Button);

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleAdminButtonClick = () => {
    navigate('/admin/dashboard');
  };

  const features = [
    {
      title: "AI-Powered Credit Insights",
      description: "Our machine learning algorithms analyze your credit patterns and predict future score changes based on your financial behavior and market trends.",
      icon: <CreditScore color="primary" sx={{ fontSize: 40, mr: 2 }} />,
      color: 'primary.main',
      tip: "🚀 Pro Tip: Maintain credit utilization below 30% for optimal score improvement."
    },
    {
      title: "Smart Loan Optimization",
      description: "Compare loan products across 200+ lenders with our proprietary matching engine that finds the best rates based on your unique credit profile.",
      icon: <AccountBalance color="secondary" sx={{ fontSize: 40, mr: 2 }} />,
      color: 'secondary.main',
      tip: "💡 Did You Know? Applying for multiple loans within 14 days counts as a single credit inquiry."
    },
    {
      title: "Real-Time Credit Alerts",
      description: "Get instant notifications about credit report changes, potential fraud, and opportunities to improve your score with actionable recommendations.",
      icon: <NotificationsActive sx={{ fontSize: 40, mr: 2, color: '#4caf50' }} />,
      color: '#4caf50',
      tip: "🔔 Alert: 76% of users who respond to alerts within 24h see score improvements."
    },
    {
      title: "Credit Trend Analysis",
      description: "Visualize your credit history with interactive charts showing 5-year trends and comparisons to similar demographic profiles.",
      icon: <TrendingUp sx={{ fontSize: 40, mr: 2, color: '#ff9800' }} />,
      color: '#ff9800',
      tip: "📈 82% of users who track trends monthly improve their scores faster."
    },
    {
      title: "Debt Consolidation Planner",
      description: "Personalized strategies to consolidate debt and optimize repayment schedules to minimize interest and maximize credit score impact.",
      icon: <CompareArrows sx={{ fontSize: 40, mr: 2, color: '#9c27b0' }} />,
      color: '#9c27b0',
      tip: "💰 Average user saves $3,200 in interest with our consolidation plans."
    },
    {
      title: "Financial Health Dashboard",
      description: "Comprehensive overview of your financial health with risk assessment, credit age analysis, and credit mix optimization tools.",
      icon: <Assessment sx={{ fontSize: 40, mr: 2, color: '#2196f3' }} />,
      color: '#2196f3',
      tip: "🏆 Users with complete financial profiles qualify for 37% better rates."
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${IMG1}) center/cover no-repeat`,
          color: 'white',
          py: 10,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Security Badge */}
        <Chip
          icon={<Security />}
          label="256-bit Encryption"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white'
          }}
        />

        {/* Admin Portal Button */}
        <Tooltip title={userData?.role === 'admin' ? "Access Admin Dashboard" : "Administrator login portal"}>
          <Badge
            color="warning"
            variant="dot"
            invisible={userData?.role !== 'admin'}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2,
            }}
          >
            <MotionButton
              onClick={handleAdminButtonClick}
              variant="contained"
              sx={{
                background: userData?.role === 'admin'
                  ? 'linear-gradient(45deg, #4a148c 0%, #7b1fa2 100%)'
                  : 'linear-gradient(45deg, #0f0c29 0%, #302b63 100%)',
                color: 'white',
                '&:hover': {
                  background: userData?.role === 'admin'
                    ? 'linear-gradient(45deg, #7b1fa2 0%, #4a148c 100%)'
                    : 'linear-gradient(45deg, #302b63 0%, #0f0c29 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '600',
                textTransform: 'none',
                letterSpacing: '0.5px',
                border: userData?.role === 'admin' ? '2px solid #ffeb3b' : 'none'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              startIcon={userData?.role === 'admin' ? <VerifiedUser /> : <AdminPanelSettings />}
              aria-label="Admin portal"
            >
              {userData?.role === 'admin' ? 'Admin Dashboard' : 'Admin Portal'}
            </MotionButton>
          </Badge>
        </Tooltip>

        <Container maxWidth="md">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Advanced Credit Management Platform
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            gutterBottom
            sx={{ mb: 4, opacity: 0.9 }}
          >
            AI-powered tools to analyze, optimize, and protect your financial health
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <MotionButton
              component={Link}
              to="/signup"
              variant="contained"
              color="secondary"
              size="large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              endIcon={<ArrowForward />}
              aria-label="Get started"
            >
              Get Started
            </MotionButton>
            <MotionButton
              component={Link}
              to="/login"
              variant="outlined"
              color="inherit"
              size="large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Login"
            >
              Login
            </MotionButton>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6, color: 'text.primary' }}
        >
          Comprehensive Credit Solutions
        </Typography>
        
        {/* Horizontal Image Gallery */}
        <Box sx={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          py: 2,
          mb: 6,
          '&::-webkit-scrollbar': { height: '6px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'primary.main', borderRadius: '3px' }
        }}>
          {[IMG2, HouseImage, IMG6, IMG3, IMG4].map((img, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.03 }}
              style={{ 
                minWidth: '300px', 
                borderRadius: '12px', 
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <img 
                src={img} 
                alt={`Feature ${index + 1}`} 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover',
                  boxShadow: theme.shadows[4],
                  filter: 'brightness(0.9)'
                }} 
              />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'white',
                p: 2
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {['Credit Analysis', 'Loan History', 'Risk Prediction', 'Score Trends', 'Financial Health'][index]}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Enhanced Feature Grid */}
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '4px solid',
                  borderColor: feature.color,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6]
                  },
                  bgcolor: 'background.paper'
                }}
                component={motion.div}
                whileHover={{ scale: 1.01 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {feature.description}
                </Typography>
                <Box sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50', 
                  p: 2, 
                  borderRadius: 1,
                  borderLeft: `3px solid ${feature.color}`
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {feature.tip}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advanced Analytics Section */}
      <Box sx={{ 
        py: 8, 
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                Predictive Credit Analytics
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Our proprietary algorithms analyze thousands of data points to forecast your credit trajectory 
                and identify optimization opportunities before they appear on traditional reports.
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                <li><Typography sx={{ color: 'text.primary' }}>90-day credit score forecasting</Typography></li>
                <li><Typography sx={{ color: 'text.primary' }}>Personalized improvement roadmap</Typography></li>
                <li><Typography sx={{ color: 'text.primary' }}>Credit opportunity alerts</Typography></li>
                <li><Typography sx={{ color: 'text.primary' }}>Lender-specific approval predictors</Typography></li>
              </Box>
              <MotionButton
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
                size="large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                endIcon={<ArrowForward />}
                sx={{ px: 6, py: 1.5 }}
              >
                Unlock Analytics
              </MotionButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper' }}>
                <img 
                  src={IMG3} 
                  alt="Analytics Dashboard" 
                  style={{ 
                    width: '100%', 
                    borderRadius: '8px',
                    boxShadow: theme.shadows[4]
                  }} 
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ 
        py: 10,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Transform Your Credit?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users who improved their credit scores by an average of 72 points in the first 6 months
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Our platform provides the tools and insights you need to take control of your financial future. 
            With advanced analytics and personalized recommendations, we help you understand and improve 
            your credit health at every step of your journey.
          </Typography>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        py: 6, 
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.800', 
        color: 'white',
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Credit Management System
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Advanced tools for credit optimization, monitoring, and financial health management.
              </Typography>
              <Typography variant="body2">
                © {new Date().getFullYear()} All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Resources
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                <li><Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>Blog</Link></li>
                <li><Link to="/guides" style={{ color: 'white', textDecoration: 'none' }}>Guides</Link></li>
                <li><Link to="/research" style={{ color: 'white', textDecoration: 'none' }}>Research</Link></li>
                <li><Link to="/webinars" style={{ color: 'white', textDecoration: 'none' }}>Webinars</Link></li>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Company
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link to="/careers" style={{ color: 'white', textDecoration: 'none' }}>Careers</Link></li>
                <li><Link to="/press" style={{ color: 'white', textDecoration: 'none' }}>Press</Link></li>
                <li><Link to="/partners" style={{ color: 'white', textDecoration: 'none' }}>Partners</Link></li>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Link to="/privacy" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Privacy Policy
                </Link>
                <Link to="/terms" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Terms of Service
                </Link>
                <Link to="/security" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Security
                </Link>
                <Link to="/compliance" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Compliance
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;