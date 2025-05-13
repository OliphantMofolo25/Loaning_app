import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to the admin panel. Here you can manage users, credit reports, and system settings.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        sx={{ mt: 2 }}
      >
        Back to Main Site
      </Button>
    </Box>
  );
};

export default AdminPage;