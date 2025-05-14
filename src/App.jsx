import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import LandingPage from './Pages/LandingPage';
import AdminLandingPage from './Pages/Admin/AdminLandingPage';
import LoginPage from './Pages/User/LoginPage';
import SignupPage from './Pages/User/SignupPage';
import UserServicesPage from './Pages/User/UserServicesPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminSignupPage from './Pages/Admin/AdminSignupPage';
import CreditReportPage from './Pages/User/CreditReportPage';
import CreditScoreAnalysisPage from './Pages/User/CreditScoreAnalysisPage';
import LoanCalculatorPage from './Pages/User/LoanCalculatorPage';
import LoanStatusPage from './Pages/User/LoanStatusPage';
import PreApprovalPage from './Pages/User/PreApprovalPage';
import LoanServicesPage from './Pages/User/LoanServicesPage';
import PaymentServicesPage from './Pages/User/PaymentServicesPage'; // Import your page

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: { 
        main: '#1976d2',
        dark: '#1565c0',
        light: '#42a5f5'
      },
      secondary: { 
        main: '#9c27b0',
        dark: '#7b1fa2',
        light: '#ba68c8'
      },
      background: { 
        default: prefersDarkMode ? '#121212' : '#f5f7fa',
        paper: prefersDarkMode ? '#1e1e1e' : '#ffffff'
      },
      error: {
        main: '#d32f2f'
      },
      success: {
        main: '#2e7d32'
      }
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem'
      },
      button: {
        textTransform: 'none',
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: 8
    }
  }), [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Admin Public Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/signup" element={<AdminSignupPage />} />

          {/* User Routes - No role checking */}
          <Route path="/services" element={<UserServicesPage />} />
          <Route path="/services/credit-report" element={<CreditReportPage />} />
          <Route path="/services/credit-score" element={<CreditScoreAnalysisPage />} />
          <Route path="/services/loan-offers" element={<LoanServicesPage />} />
          <Route path="/services/loan-calculator" element={<LoanCalculatorPage />} />
          <Route path="/services/loan-status" element={<LoanStatusPage />} />
          <Route path="/services/loan-status/:id" element={<LoanStatusPage />} />
          <Route path="/services/pre-approval" element={<PreApprovalPage />} />
          <Route path="/services/payment" element={<PaymentServicesPage />} /> {/* New route */}

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminLandingPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
