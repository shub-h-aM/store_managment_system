import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const UserImageCard = ({ item }) => {
    const { name, about, mrp, image_url } = item;

    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={image_url}
                alt={name}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {about}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                    ₹{mrp}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserImageCard;
