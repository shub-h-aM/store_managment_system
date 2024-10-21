// src/components/AppItem.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
const AppItem = ({ app }) => {
    return (
        <Card style={{ margin: '10px', width: 150 }}>
            <CardMedia
                component="img"
                image={app.img}
                alt={app.name}
                draggable="false"
                height="100"
            />
            <CardContent>
                <Typography variant="body2" align="center">
                    {app.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AppItem;
