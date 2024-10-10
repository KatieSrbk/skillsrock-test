import { Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const User = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    username: '',
    modules: '',
    instructor: '',
    students: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserData({
      firstName: '',
      lastName: '',
      role: '',
      username: '',
      modules: '',
      instructor: '',
      students: '',
    });
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={userData.role}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Modules"
          name="modules"
          value={userData.modules}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Instructor"
          name="instructor"
          value={userData.instructor}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Students"
          name="students"
          value={userData.students}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Create User
        </Button>
      </form>
    </Paper>
  );
};

export default User;
