import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../server/api';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setUser(res.data.data); // Check your API structure
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser(id, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
      navigate('/users');
    } catch (err) {
      console.error('Failed to update user', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Edit User</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First Name"
          name="first_name"
          value={user.first_name || ''}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={user.last_name || ''}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Container>
  );
};

export default EditUser;
