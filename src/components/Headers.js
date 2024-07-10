import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Button } from '@mui/material';

const Headers = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        {/* Replace with your icon */}
                        <i className="bi bi-camera"></i>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        PhotoFolio
                    </Typography>
                    <nav>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="/about">About</Button>
                        <Button color="inherit" href="/gallery">Gallery</Button>
                        <Button color="inherit" href="/services">Services</Button>
                        <Button color="inherit" href="/contact">Contact</Button>
                    </nav>
                    <div>
                        <IconButton color="inherit" href="#">
                            <i className="bi bi-twitter-x"></i>
                        </IconButton>
                        <IconButton color="inherit" href="#">
                            <i className="bi bi-facebook"></i>
                        </IconButton>
                        <IconButton color="inherit" href="#">
                            <i className="bi bi-instagram"></i>
                        </IconButton>
                        <IconButton color="inherit" href="#">
                            <i className="bi bi-linkedin"></i>
                        </IconButton>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Headers;
