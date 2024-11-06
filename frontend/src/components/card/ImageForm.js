// src/components/ImageForm.js

import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ImageForm = ({ currentItem, setCurrentItem, handleSubmit, isEditing }) => {
    return (
        <Box style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5">{isEditing ? 'Edit Item' : 'Add New Item'}</Typography>
            <TextField
                label="Image URL or Upload"
                value={currentItem.img}
                onChange={(e) => setCurrentItem({ ...currentItem, img: e.target.value })}
                fullWidth
                margin="normal"
            />
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button"
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setCurrentItem({ ...currentItem, img: reader.result });
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />
            <label htmlFor="upload-button">
                <Button variant="contained" component="span" style={{ margin: '10px 0' }}>
                    Upload Image
                </Button>
            </label>
            <TextField
                label="Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="About"
                value={currentItem.about}
                onChange={(e) => setCurrentItem({ ...currentItem, about: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="MRP (₹)"
                type="number"
                inputProps={{ min: 0 }}
                value={currentItem.mrp}
                onChange={(e) => setCurrentItem({ ...currentItem, mrp: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button
                onClick={handleSubmit}
                sx={{
                    marginTop: '10px',
                    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                    border: 'none',
                    color: 'white',
                    '&:hover': {
                        background: 'linear-gradient(to right, #feb47b, #ff7e5f)',
                    },
                }}
            >
                {isEditing ? 'Update' : 'Add Image'}
            </Button>
        </Box>
    );
};

export default ImageForm;
