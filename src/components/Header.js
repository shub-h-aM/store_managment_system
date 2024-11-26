import React from 'react';
import {
    AppBar, Toolbar, Typography, IconButton,
    Container, Button, Box
} from '@mui/material';
import { FaBars } from 'react-icons/fa';
import '../components/card/ImageCard';
import '../pages/RolesPage';
import '../pages/AccessManagementPage';

const Header = ({ toggleMenu }) => {
    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'linear-gradient(45deg, #3a7bd5, #3a6073)',
                color: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Toolbar disableGutters>
                <Container
                    maxWidth="lg"
                    sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                >
                    {/* Menu Icon */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleMenu}
                        sx={{mr: 2}}
                    >
                        <FaBars/>
                    </IconButton>

                    {/* Logo and Title */}
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                        <img
                            src="/WhatsApp Image 2024-11-14 at 10.04.19.jpeg"
                            alt="Logo"
                            style={{
                                height: '40px',
                                width: '40px', // Ensures the image is a perfect square
                                marginRight: '10px',
                                borderRadius: '50%', // Makes the image circular
                                border: '2px solid white', // Optional border
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                display: {xs: 'none', sm: 'block'},
                            }}
                        >
                            Shubham Electronics & Electrical
                        </Typography>
                    </Box>

                    {/* Navigation Buttons */}
                    <Box component="nav" sx={{display: 'flex', gap: 2}}>
                        <Button
                            color="inherit"
                            href="/ops/admin/card"
                            sx={{
                                fontWeight: 'bold',
                                '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            }}
                        >
                            Card
                        </Button>
                        <Button
                            color="inherit"
                            href="/ops/get/product"
                            sx={{
                                fontWeight: 'bold',
                                '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            }}
                        >
                            Product
                        </Button>
                        <Button
                            color="inherit"
                            href="/ops/access/management"
                            sx={{
                                fontWeight: 'bold',
                                '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            }}
                        >
                            Access
                        </Button>
                        <Button
                            color="inherit"
                            href="/ops/roles/management"
                            sx={{
                                fontWeight: 'bold',
                                '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            }}
                        >
                            User Role
                        </Button>
                        <Button
                            color="inherit"
                            href="/ops/pages/management"
                            sx={{
                                fontWeight: 'bold',
                                '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            }}
                        >
                            Page
                        </Button>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
