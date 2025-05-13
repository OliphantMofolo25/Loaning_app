import { Box, Button, Container, Grid, Typography, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSwitchIcon from '@mui/icons-material/SwitchAccount';

const AdminLandingPage = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#f8f9fa',
      padding: '2rem 0'
    }}>
      {/* Admin Header - Enlarged */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          color: '#f8f9fa',
          py: 6,
          textAlign: 'center',
          position: 'relative',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          marginBottom: '3rem'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mb: 3 
          }}>
            <AdminPanelSettingsIcon sx={{ 
              fontSize: 70, 
              color: '#00b4d8', 
              mr: 3,
              filter: 'drop-shadow(0 0 12px rgba(0, 180, 216, 0.5))'
            }} />
            <Typography variant="h1" component="h1" sx={{ 
              color: '#f8f9fa',
              textShadow: '0 2px 15px rgba(0, 180, 216, 0.6)',
              fontSize: '3.5rem',
              fontWeight: 600
            }}>
              Admin Portal
            </Typography>
          </Box>
          <Typography variant="h4" gutterBottom sx={{ 
            mb: 4,
            color: '#adb5bd',
            fontSize: '1.8rem'
          }}>
            Secure access to credit bureau administration tools
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              component={Link}
              to="/admin/login"
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #00b4d8 0%, #0077b6 100%)',
                color: '#f8f9fa',
                fontSize: '1.2rem',
                padding: '12px 32px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0096c7 0%, #005f8a 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)'
                },
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
              }}
              size="large"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/admin/signup"
              variant="outlined"
              sx={{
                color: '#f8f9fa',
                borderColor: 'rgba(248, 249, 250, 0.5)',
                fontSize: '1.2rem',
                padding: '12px 32px',
                borderWidth: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(248, 249, 250, 0.1)',
                  borderColor: '#f8f9fa',
                  borderWidth: '2px'
                }
              }}
              size="large"
            >
              Sign Up
            </Button>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<PersonSwitchIcon />}
              sx={{
                background: 'linear-gradient(45deg, #e63946 0%, #a4161a 100%)',
                color: '#f8f9fa',
                fontSize: '1.2rem',
                padding: '12px 32px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #d90429 0%, #800f2f 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)'
                },
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
              }}
              size="large"
            >
              User Mode
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Rest of the component remains the same */}
      {/* Centered Admin Tools Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        py: 6,
        marginBottom: '4rem'
      }}>
        <Container maxWidth="xl">
          <Typography variant="h2" align="center" gutterBottom sx={{ 
            color: '#f8f9fa',
            mb: 6,
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            fontSize: '2.8rem'
          }}>
            Administration Tools
          </Typography>
          
          <Grid container spacing={5} justifyContent="center">
            {/* User Management */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ 
                p: 4,
                height: '100%',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                border: '2px solid rgba(0, 180, 216, 0.3)',
                '&:hover': {
                  borderLeft: '6px solid',
                  borderColor: '#00b4d8',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                  <PeopleIcon sx={{ 
                    fontSize: 50, 
                    mr: 2,
                    color: '#00b4d8'
                  }} />
                  <Typography variant="h3" sx={{ color: '#f8f9fa', fontSize: '1.8rem' }}>Users</Typography>
                </Box>
                <Divider sx={{ 
                  my: 3, 
                  bgcolor: 'rgba(0, 180, 216, 0.4)',
                  height: '2px',
                  width: '80%'
                }} />
                <Typography variant="h5" sx={{ 
                  color: '#adb5bd',
                  flexGrow: 1,
                  fontSize: '1.2rem',
                  textAlign: 'center'
                }}>
                  Manage user accounts, permissions, and access controls
                </Typography>
              </Paper>
            </Grid>
            
            {/* Analytics */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ 
                p: 4,
                height: '100%',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                border: '2px solid rgba(72, 202, 228, 0.3)',
                '&:hover': {
                  borderLeft: '6px solid',
                  borderColor: '#48cae4',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                  <BarChartIcon sx={{ 
                    fontSize: 50, 
                    mr: 2,
                    color: '#48cae4'
                  }} />
                  <Typography variant="h3" sx={{ color: '#f8f9fa', fontSize: '1.8rem' }}>Analytics</Typography>
                </Box>
                <Divider sx={{ 
                  my: 3, 
                  bgcolor: 'rgba(72, 202, 228, 0.4)',
                  height: '2px',
                  width: '80%'
                }} />
                <Typography variant="h5" sx={{ 
                  color: '#adb5bd',
                  flexGrow: 1,
                  fontSize: '1.2rem',
                  textAlign: 'center'
                }}>
                  View comprehensive system analytics and credit report statistics
                </Typography>
              </Paper>
            </Grid>

            {/* Security */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ 
                p: 4,
                height: '100%',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                border: '2px solid rgba(233, 196, 106, 0.3)',
                '&:hover': {
                  borderLeft: '6px solid',
                  borderColor: '#e9c46a',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                  <SecurityIcon sx={{ 
                    fontSize: 50, 
                    mr: 2,
                    color: '#e9c46a'
                  }} />
                  <Typography variant="h3" sx={{ color: '#f8f9fa', fontSize: '1.8rem' }}>Security</Typography>
                </Box>
                <Divider sx={{ 
                  my: 3, 
                  bgcolor: 'rgba(233, 196, 106, 0.4)',
                  height: '2px',
                  width: '80%'
                }} />
                <Typography variant="h5" sx={{ 
                  color: '#adb5bd',
                  flexGrow: 1,
                  fontSize: '1.2rem',
                  textAlign: 'center'
                }}>
                  Monitor security logs and configure system-wide security settings
                </Typography>
              </Paper>
            </Grid>
            
            {/* System Config */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ 
                p: 4,
                height: '100%',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                border: '2px solid rgba(230, 57, 70, 0.3)',
                '&:hover': {
                  borderLeft: '6px solid',
                  borderColor: '#e63946',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                  <SettingsIcon sx={{ 
                    fontSize: 50, 
                    mr: 2,
                    color: '#e63946'
                  }} />
                  <Typography variant="h3" sx={{ color: '#f8f9fa', fontSize: '1.8rem' }}>System</Typography>
                </Box>
                <Divider sx={{ 
                  my: 3, 
                  bgcolor: 'rgba(230, 57, 70, 0.4)',
                  height: '2px',
                  width: '80%'
                }} />
                <Typography variant="h5" sx={{ 
                  color: '#adb5bd',
                  flexGrow: 1,
                  fontSize: '1.2rem',
                  textAlign: 'center'
                }}>
                  Configure system parameters and manage integration settings
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enlarged Stats Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(145deg, rgba(0,119,182,0.2) 0%, rgba(0,119,182,0.4) 100%)',
              border: '2px solid rgba(0, 180, 216, 0.4)',
              textAlign: 'center',
              minHeight: '200px'
            }}>
              <Typography variant="h4" sx={{ color: '#f8f9fa', mb: 2, fontSize: '1.5rem' }}>Total Users</Typography>
              <Typography variant="h2" sx={{ color: '#00b4d8', fontSize: '3rem' }}>12,458</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(145deg, rgba(72,202,228,0.2) 0%, rgba(72,202,228,0.4) 100%)',
              border: '2px solid rgba(72, 202, 228, 0.4)',
              textAlign: 'center',
              minHeight: '200px'
            }}>
              <Typography variant="h4" sx={{ color: '#f8f9fa', mb: 2, fontSize: '1.5rem' }}>Active Today</Typography>
              <Typography variant="h2" sx={{ color: '#48cae4', fontSize: '3rem' }}>1,243</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(145deg, rgba(233,196,106,0.2) 0%, rgba(233,196,106,0.4) 100%)',
              border: '2px solid rgba(233, 196, 106, 0.4)',
              textAlign: 'center',
              minHeight: '200px'
            }}>
              <Typography variant="h4" sx={{ color: '#f8f9fa', mb: 2, fontSize: '1.5rem' }}>Alerts</Typography>
              <Typography variant="h2" sx={{ color: '#e9c46a', fontSize: '3rem' }}>27</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(145deg, rgba(230,57,70,0.2) 0%, rgba(230,57,70,0.4) 100%)',
              border: '2px solid rgba(230, 57, 70, 0.4)',
              textAlign: 'center',
              minHeight: '200px'
            }}>
              <Typography variant="h4" sx={{ color: '#f8f9fa', mb: 2, fontSize: '1.5rem' }}>Pending</Typography>
              <Typography variant="h2" sx={{ color: '#e63946', fontSize: '3rem' }}>156</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminLandingPage;