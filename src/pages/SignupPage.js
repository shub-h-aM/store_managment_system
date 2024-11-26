import React, { useState } from 'react';
import axios from 'axios';
import { Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        contactNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Real-time validation
        switch (name) {
            case 'name':
                setErrors({
                    ...errors,
                    name: !/^[a-zA-Z\s]+$/.test(value) ? 'Full Name must contain only letters' : '',
                });
                break;
            case 'email':
                setErrors({
                    ...errors,
                    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '',
                });
                break;
            case 'password':
                setErrors({
                    ...errors,
                    password: value.length < 6 ? 'Password must be at least 6 characters long' : '',
                });
                break;
            case 'contactNumber':
                setErrors({
                    ...errors,
                    contactNumber: !/^\d{10}$/.test(value) ? 'Contact number must be exactly 10 digits' : '',
                });
                break;
            case 'username':
                setErrors({
                    ...errors,
                    username: value.trim() === '' ? 'This field is required' : '',
                });
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation before submission
        const newErrors = {};
        if (formData.name.trim() === '' || !/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'Full Name must contain only letters and cannot be empty';
        }
        if (formData.username.trim() === '') {
            newErrors.username = 'Username is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (!/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Contact number must be exactly 10 digits.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.post('http://localhost:5000/api/signup', formData);
                alert('Form submitted successfully!');
                setFormData({ name: '', username: '', password: '', email: '', contactNumber: '' });
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Error submitting form. Please try again later.');
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Full Name"
                                    autoFocus
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="contactNumber"
                                    label="Contact Number"
                                    id="contactNumber"
                                    autoComplete="contact-number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    error={!!errors.contactNumber}
                                    helperText={errors.contactNumber}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                background: 'linear-gradient(45deg, #ff7e5f 30%, #feb47b 90%)',
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                boxShadow: '0 3px 5px 2px rgba(255, 140, 85, .3)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #feb47b 30%, #ff7e5f 90%)',
                                    boxShadow: '0 4px 6px 3px rgba(255, 140, 85, .4)',
                                },
                            }}
                            disabled={
                                !formData.name ||
                                !formData.username ||
                                !formData.email ||
                                !formData.password ||
                                !formData.contactNumber ||
                                Object.values(errors).some((error) => error !== '')
                            }
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignupPage;
