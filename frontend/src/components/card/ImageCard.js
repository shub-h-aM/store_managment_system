import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ImageCard = ({ item, onOpenMenu, anchorEl, activeItemId, onEdit, onDelete }) => {
    return (
        <Card>
            <CardMedia component="img" image={item.img} alt={item.name} height="150" />
            <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">{item.about}</Typography>
                <Typography variant="h6" color="primary">₹ {item.mrp}</Typography>
                <IconButton onClick={(e) => onOpenMenu(e, item.id)}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && activeItemId === item.id}
                    onClose={() => onOpenMenu(null, null)}
                >
                    <MenuItem onClick={() => onEdit(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => onDelete(item.id)}>Delete</MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
};

export default ImageCard;
