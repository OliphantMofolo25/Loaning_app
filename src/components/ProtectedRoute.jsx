import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, redirectPath = '/login' }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check if user data exists
  if (!userData) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;