import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openLoanDialog, setOpenLoanDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchUsers();
    fetchLoans();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await axios.get('/api/loans');
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setOpenUserDialog(true);
  };

  const handleEditLoan = (loan) => {
    setCurrentLoan(loan);
    setOpenLoanDialog(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/auth/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteLoan = async (loanId) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      try {
        await axios.delete(`/api/loans/${loanId}`);
        fetchLoans();
      } catch (error) {
        console.error('Error deleting loan:', error);
      }
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser._id) {
        await axios.put(`/api/auth/users/${currentUser._id}`, currentUser);
      } else {
        await axios.post('/api/auth/users', currentUser);
      }
      fetchUsers();
      setOpenUserDialog(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentLoan._id) {
        await axios.put(`/api/loans/${currentLoan._id}`, currentLoan);
      } else {
        await axios.post('/api/loans', currentLoan);
      }
      fetchLoans();
      setOpenLoanDialog(false);
    } catch (error) {
      console.error('Error saving loan:', error);
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const handleLoanChange = (e) => {
    const { name, value } = e.target;
    setCurrentLoan({
      ...currentLoan,
      [name]: value
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', mb: 3 }}>
        <Button 
          variant={activeTab === 'users' ? 'contained' : 'outlined'} 
          onClick={() => setActiveTab('users')}
          sx={{ mr: 2 }}
        >
          Users
        </Button>
        <Button 
          variant={activeTab === 'loans' ? 'contained' : 'outlined'} 
          onClick={() => setActiveTab('loans')}
        >
          Loans
        </Button>
      </Box>

      {activeTab === 'users' && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">User Management</Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setCurrentUser({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  role: 'user',
                  employmentStatus: 'Employed',
                  annualIncome: 0,
                  creditScore: 650
                });
                setOpenUserDialog(true);
              }}
            >
              Add New User
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Credit Score</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.creditScore}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {activeTab === 'loans' && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Loan Management</Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setCurrentLoan({
                  user: '',
                  loanAmount: 0,
                  loanPurpose: 'Personal',
                  loanTerm: 12,
                  interestRate: 8.5,
                  monthlyIncome: 0,
                  employmentStatus: 'employed',
                  status: 'Pending'
                });
                setOpenLoanDialog(true);
              }}
            >
              Add New Loan
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Term</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan._id}>
                    <TableCell>{loan.user?.firstName} {loan.user?.lastName}</TableCell>
                    <TableCell>{loan.loanAmount}</TableCell>
                    <TableCell>{loan.loanPurpose}</TableCell>
                    <TableCell>{loan.loanTerm} months</TableCell>
                    <TableCell>{loan.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditLoan(loan)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteLoan(loan._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* User Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>{currentUser?._id ? 'Edit User' : 'Add New User'}</DialogTitle>
        <form onSubmit={handleUserSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="First Name"
              name="firstName"
              value={currentUser?.firstName || ''}
              onChange={handleUserChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Last Name"
              name="lastName"
              value={currentUser?.lastName || ''}
              onChange={handleUserChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={currentUser?.email || ''}
              onChange={handleUserChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Phone"
              name="phone"
              value={currentUser?.phone || ''}
              onChange={handleUserChange}
              fullWidth
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={currentUser?.role || 'user'}
                onChange={handleUserChange}
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Credit Score"
              name="creditScore"
              type="number"
              value={currentUser?.creditScore || 650}
              onChange={handleUserChange}
              fullWidth
              inputProps={{ min: 300, max: 850 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Loan Dialog */}
      <Dialog open={openLoanDialog} onClose={() => setOpenLoanDialog(false)}>
        <DialogTitle>{currentLoan?._id ? 'Edit Loan' : 'Add New Loan'}</DialogTitle>
        <form onSubmit={handleLoanSubmit}>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>User</InputLabel>
              <Select
                name="user"
                value={currentLoan?.user?._id || ''}
                onChange={handleLoanChange}
                label="User"
                required
              >
                {users.map(user => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Loan Amount"
              name="loanAmount"
              type="number"
              value={currentLoan?.loanAmount || 0}
              onChange={handleLoanChange}
              fullWidth
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Loan Purpose</InputLabel>
              <Select
                name="loanPurpose"
                value={currentLoan?.loanPurpose || 'Personal'}
                onChange={handleLoanChange}
                label="Loan Purpose"
                required
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Debt Consolidation">Debt Consolidation</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Loan Term (months)"
              name="loanTerm"
              type="number"
              value={currentLoan?.loanTerm || 12}
              onChange={handleLoanChange}
              fullWidth
              required
              inputProps={{ min: 1, max: 60 }}
            />
            <TextField
              margin="dense"
              label="Interest Rate (%)"
              name="interestRate"
              type="number"
              value={currentLoan?.interestRate || 8.5}
              onChange={handleLoanChange}
              fullWidth
              inputProps={{ min: 1, max: 25, step: 0.1 }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={currentLoan?.status || 'Pending'}
                onChange={handleLoanChange}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Defaulted">Defaulted</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLoanDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

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