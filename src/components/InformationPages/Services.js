import React from 'react';
import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandymanIcon from '@mui/icons-material/Handyman';
import Footer from '../Footer';

const Services = () => {
    return (
        <Box
            sx={{
                minHeight: '94vh', // Ensures the full height of the viewport
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Container
                maxWidth="md"
                sx={{ flexGrow: 1, mt: 4, mb: 4 }}
            >
                <Typography variant="h3" align="center" gutterBottom>
                    Our Services
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <BuildIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Repair Services"
                            secondary="Expert repair services for electronic and electrical devices."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StoreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Sales"
                            secondary="Retail and wholesale of electronic and electrical goods."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <HandymanIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Manufacturing"
                            secondary="Custom manufacturing of electrical and electronic products."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocalShippingIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Wholesale & Distribution"
                            secondary="Bulk supply and distribution for businesses."
                        />
                    </ListItem>
                </List>
            </Container>
            <Footer />
        </Box>
    );
};

export default Services;
