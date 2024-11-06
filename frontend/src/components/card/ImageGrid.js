import React from 'react';
import { Grid } from '@mui/material';
import ImageCard from './ImageCard';

const ImageGrid = ({ items, onOpenMenu, anchorEl, activeItemId, onEdit, onDelete }) => {
    return (
        <Grid container spacing={3}>
            {items.map(item => (
                <Grid item xs={12} sm={6} lg={3} key={item.id}>
                    <ImageCard
                        item={item}
                        onOpenMenu={onOpenMenu}
                        anchorEl={anchorEl}
                        activeItemId={activeItemId}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;
