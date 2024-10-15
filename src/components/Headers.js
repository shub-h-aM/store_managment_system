import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';
const Headers = ({ toggleMenu }) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                        <FaBars />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        {/*Shubham Electronics & Enterprises*/}
                    </Typography>
                    <nav>
                        <Button color="inherit" href="/card-details">Card</Button>
                        <Button color="inherit" href="/get/order/form">Order</Button>
                    </nav>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Headers;
