import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import FacebookIcon from "@mui/icons-material/Facebook";
const Headers = ({ toggleMenu }) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                        <FaBars />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Shubham Electronics & Enterprises
                    </Typography>
                    <nav>
                        <Button color="inherit" href="/card-details">Card</Button>
                    </nav>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Headers;
