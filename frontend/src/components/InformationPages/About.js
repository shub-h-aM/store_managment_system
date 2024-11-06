import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Footer from '../Footer';

const About = () => {
    return (
        <Box
            sx={{
                minHeight: '94vh', // Ensure the container covers the full height of the viewport
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Container
                maxWidth="md"
                sx={{ flexGrow: 1, mt: 4, mb: 4 }}
            >
                <Typography variant="h3" align="center" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" align="justify" paragraph>
                    Welcome to our electronics and electrical shop! We specialize in the <strong>repair, sale, manufacture, and wholesale</strong> of high-quality electronics and electrical goods.
                    With years of experience, our mission is to provide the best products and services to our customers at competitive prices.
                </Typography>
                <Typography variant="body1" align="justify" paragraph>
                    Our team is dedicated to customer satisfaction, and we work closely with top brands to bring the latest technology and innovations to our store. Whether you are looking for <strong>household appliances, industrial electrical goods, or repairs</strong>, we have the expertise to meet your needs.
                </Typography>
                <Typography variant="body1" align="justify">
                    Visit us today and discover why we are the <strong>trusted partner for thousands of customers and businesses</strong>.
                </Typography>
            </Container>
            <Footer />
        </Box>
    );
};

export default About;
