import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f0f0f0',
                py: 2,
                px: 4,
                borderTop: '1px solid #ccc', // optional: adds a border at the top
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <Link href="https://www.instagram.com/shubham_electronic_/" target="_blank" rel="noopener noreferrer" sx={{ mr: 2 }}>
                    <InstagramIcon color="primary" fontSize="large" />
                </Link>
                <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon color="primary" fontSize="large" />
                </Link>
            </Box>
            <Typography variant="body2" align="center" color="textSecondary">
                &copy; {new Date().getFullYear()} Your Website. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
