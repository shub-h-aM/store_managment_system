import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const CardItem = ({ app }) => {
    return (
        <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Card>
                <CardMedia
                    component="img"
                    image={app.img}
                    alt={app.name}
                    height="140"
                    draggable="false"
                />
                <CardContent>
                    <Typography variant="h6">{app.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {app.about}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default CardItem;
