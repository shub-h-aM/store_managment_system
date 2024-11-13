import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Fab, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageForm from './ImageForm';
import ImageGrid from './ImageGrid';
//import ImageCard from './UserImageCard';
import axios from 'axios';

const AdminPage = () => {
    const [items, setItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({ id: null, img: '', name: '', about: '', mrp: '' });
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeItemId, setActiveItemId] = useState(null);
    const [showAddItem, setShowAddItem] = useState(false);

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
        handleCloseMenu();
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setEditMode(true);
        handleCloseMenu();
    };

    const handleUpdate = () => {
        setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
        resetForm();
    };

    const resetForm = () => {
        setCurrentItem({ id: null, img: '', name: '', about: '', mrp: '' });
        setEditMode(false);
    };

    // const handleAddImage = () => {
    //     const newItem = {
    //         id: items.length + 1,
    //         img: currentItem.img,
    //         name: currentItem.name,
    //         about: currentItem.about,
    //         mrp: currentItem.mrp
    //     };
    //     setItems([...items, newItem]);
    //     resetForm();
    //     setShowAddItem(false);
    // };

    const handleAddImage = async () => {
        const newItem = {
            name: currentItem.name,
            about: currentItem.about,
            mrp: parseFloat(currentItem.mrp),
            image_url: currentItem.img.startsWith('data:image')
                ? 'img/about.jpg'
                : currentItem.img,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/ops/admin/images', newItem);
            const addedItem = response.data;
            setItems([...items, addedItem]);
            resetForm();
            setShowAddItem(false);
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const handleOpenMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
        setActiveItemId(id);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setActiveItemId(null);
    };

    return (
        <Container maxWidth={false} style={{ padding: 0 }}>
            <Typography variant="h4" gutterBottom style={{ marginTop: '15px' }}>
                Admin Page
            </Typography>

            <ImageGrid
                items={items}
                onOpenMenu={handleOpenMenu}
                anchorEl={anchorEl}
                activeItemId={activeItemId}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Tooltip title="Add New Details" arrow>
                <Fab
                    color="primary"
                    onClick={() => setShowAddItem(!showAddItem)}
                    style={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            {showAddItem && (
                <ImageForm
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    handleSubmit={handleAddImage}
                    isEditing={false}
                />
            )}

            {editMode && (
                <ImageForm
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    handleSubmit={handleUpdate}
                    isEditing={true}
                />
            )}
        </Container>
    );
};

export default AdminPage;
