import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Footer from '../components/Footer';


const HomePage = () => {
    return (
        <>
            <Container maxWidth="lg" style={{ marginTop: 20 }}>
                <Typography variant="h2" gutterBottom>Welcome</Typography>
                <Typography variant="body1" gutterBottom>Explore the latest accessories</Typography>

                <Grid container spacing={3} style={{ marginTop: 20 }}>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/HomePageImg/Product1.jpg"
                                alt="Product 1"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Product 1
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/HomePageImg/Product2.jpg"
                                alt="Product 2"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Product 2
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/HomePageImg/Product3.jpg"
                                alt="Product 3"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Product 3
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography variant="h2" style={{ marginTop: 40 }} gutterBottom>Special Promotion</Typography>
                <Typography variant="h5" gutterBottom>Get 20% off on all smartphones!</Typography>
                <Typography variant="body1" gutterBottom>Offer valid till the end of this month. Don't miss out!</Typography>

                <Typography variant="h2" style={{ marginTop: 40 }} gutterBottom>Shop by Category</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" gutterBottom>Category 1</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" gutterBottom>Category 2</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" gutterBottom>Category 3</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default HomePage;
