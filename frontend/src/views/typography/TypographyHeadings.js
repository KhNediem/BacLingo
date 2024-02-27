// pages/index.js
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    subscriptionType: '',
    lastLoginDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://localhost:3001/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('User created successfully!');
        // Reset the form after a successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          subscriptionType: '',
          lastLoginDate: '',
        });
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Subscription Type"
          name="subscriptionType"
          value={formData.subscriptionType}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Last Login Date"
          name="lastLoginDate"
          type="date"  // Set the type to "date" for a date input
          value={formData.lastLoginDate}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: 'white' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateUserForm;
