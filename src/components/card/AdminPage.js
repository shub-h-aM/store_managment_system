import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    TextField,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Fab,
    Container,
    Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

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

    const handleAddImage = () => {
        const newItem = {
            id: items.length + 1,
            img: currentItem.img,
            name: currentItem.name,
            about: currentItem.about,
            mrp: currentItem.mrp
        };
        setItems([...items, newItem]);
        resetForm();
        setShowAddItem(false);
    };

    const handleOpenMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
        setActiveItemId(id);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setActiveItemId(null);
    };

    const activeItem = items.find(item => item.id === activeItemId);

    return (
        <Container maxWidth={false} style={{ padding: 0 }}>
            <Typography variant="h4" gutterBottom style={{ marginTop: '15px' }}>
                Admin Page
            </Typography>

            <Grid container spacing={3}>
                {items.map(item => (
                    <Grid item xs={12} sm={6} lg={3} key={item.id}>
                        <Card>
                            <CardMedia component="img" image={item.img} alt={item.name} height="150" />
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{item.about}</Typography>
                                <Typography variant="h6" color="primary">₹ {item.mrp}</Typography>
                                <IconButton onClick={(e) => handleOpenMenu(e, item.id)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && activeItemId === item.id}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={() => handleEdit(item)}>Edit</MenuItem>
                                    <MenuItem onClick={() => handleDelete(item.id)}>Delete</MenuItem>
                                </Menu>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Tooltip title="Add New Details" arrow>
                <Fab
                    color="primary"
                    onClick={() => setShowAddItem(!showAddItem)}
                    style={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            {showAddItem && ( // Conditional rendering for the add item form
                <Box style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5">Add New Item</Typography>
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
                        onClick={handleAddImage}
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
                        Add Image
                    </Button>
                </Box>
            )}

            {editMode && (
                <Box style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5">Edit Item</Typography>
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
                        id="edit-upload-button"
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
                    <label htmlFor="edit-upload-button">
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
                        onClick={handleUpdate}
                        sx={{
                            marginTop: '10px',
                            background: 'linear-gradient(to right, #7a3322, #d08b56)',
                            border: 'none',
                            color: 'white', 
                            '&:hover': {
                                background: 'linear-gradient(to right, #d08b56, #7a3322)',
                            },
                        }}
                    >
                        Update
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default AdminPage;
