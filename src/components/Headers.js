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
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="/about">About</Button>
                        <Button color="inherit" href="/gallery">Gallery</Button>
                        <Button color="inherit" href="/services">Services</Button>
                        <Button color="inherit" href="/contact">Contact</Button>
                    </nav>
                    {/*<div>*/}
                    {/*    <IconButton color="black" href="#">*/}
                    {/*        <FacebookIcon color="primary" fontSize="medium" />*/}
                    {/*    </IconButton>*/}
                    {/*    <IconButton color="red" href="https://www.instagram.com/shubham_electronic_/">*/}
                    {/*        <i className="bi bi-instagram"></i>*/}
                    {/*    </IconButton>*/}
                    {/*    <IconButton color="inherit" href="#">*/}
                    {/*        <i className="bi bi-linkedin"></i>*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Headers;
