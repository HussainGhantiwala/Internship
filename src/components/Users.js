import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Snackbar, Alert, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { getUsers, deleteUser, updateUser } from '../server/api';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      const data = res.data.data || [];
      setUsers(data);
      setFilteredUsers(data);
    } catch {
      showToast('Failed to fetch users', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Show toast
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      showToast('User deleted successfully', 'success');
      fetchUsers();
    } catch {
      showToast('Failed to delete user', 'error');
    }
  };

  // Handle edit
  const handleEdit = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleSave = async () => {
    try {
      const { first_name, last_name, email, id } = editUser;
      await updateUser(id, { first_name, last_name, email });
      showToast('User updated successfully', 'success');
      fetchUsers();
      handleClose();
    } catch {
      showToast('Failed to update user', 'error');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {/* Search */}
      <TextField
        variant="outlined"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        sx={{ mb: 2, width: '50%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Avatar src={user.avatar}>
                      {!user.avatar && user.first_name.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
          <TextField
            label="First Name"
            value={editUser?.first_name || ''}
            onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
          />
          <TextField
            label="Last Name"
            value={editUser?.last_name || ''}
            onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
          />
          <TextField
            label="Email"
            value={editUser?.email || ''}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={!!toast.message}
        autoHideDuration={3000}
        onClose={() => setToast({ message: '', type: '' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast({ message: '', type: '' })}
          severity={toast.type}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default User;
