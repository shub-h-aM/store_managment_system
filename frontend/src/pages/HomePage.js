import React from 'react';
import {
    Container, Typography, Grid, Card, CardContent,
    CardMedia, Button, Box, Divider
} from '@mui/material';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            {/* Main Content */}
            <Container maxWidth="100%" sx={{ flex: 1, mt: 5, mb: 5 }} style={{marginTop: 0}}>
                {/* Dashboard Image Section */}
                <Box sx={{ mb: 5 }}>
                    <Card sx={{ position: 'relative', height: '90vh',width:'100%', overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="img/intro-bg.jpg"
                            alt="Dashboard"
                            sx={{ objectFit: 'cover', width: '100%', position: 'absolute', top: 0, left: 0 }}
                        />
                        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography variant="h3" component="div" gutterBottom>
                                Your Dashboard
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Access all your tools and features from here.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                    Featured Products
                </Typography>
                <Grid container spacing={4}>
                    {['01-large.jpg', '02-large.jpg', '03-large.jpg'].map((img, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={`img/portfolio/${img}`}
                                    alt={`Product ${index + 1}`}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        Product {index + 1}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2, width: '100%' }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Divider */}
                <Divider sx={{ my: 5 }} />

                {/* Promotion Section */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h4" gutterBottom color="secondary">
                        Special Promotion
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Get 20% off on all smartphones!
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Offer valid till the end of this month. Don't miss out!
                    </Typography>
                </Box>

                {/* Shop by Category Section */}
                <Typography variant="h4" gutterBottom>
                    Shop by Category
                </Typography>
                <Grid container spacing={4}>
                    {['Category 1', 'Category 2', 'Category 3'].map((category, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ textAlign: 'center', p: 3 }}>
                                <Typography variant="h5" gutterBottom>
                                    {category}
                                </Typography>
                                <Button variant="outlined" color="primary">
                                    Explore {category}
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

export default HomePage;
