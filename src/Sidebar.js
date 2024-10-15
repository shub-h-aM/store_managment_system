import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { FaWarehouse, FaUpload, FaBook, FaUser, FaFileInvoiceDollar, FaCartPlus, FaHome } from 'react-icons/fa';
import { IoIosMan } from 'react-icons/io';
import { MdAssignmentInd, MdListAlt } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';
import { GoSignIn } from 'react-icons/go';

const Sidebar = ({ isLoggedIn, isMenuOpen, activeUser, handleLogin, handleLogout, toggleMenu }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';

    return (
        <>
            <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
                <Box display="flex" flexDirection="column" height="100%">
                    <List style={{ flexGrow: 1 }}>
                        {!isLoggedIn ? (
                            <>
                                <ListItem button component={Link} to="/login" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <GoSignIn />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign In" />
                                </ListItem>
                                <ListItem button component={Link} to="/signup" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <MdAssignmentInd />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Up" />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                {activeUser && (
                                    <ListItem>
                                        <ListItemIcon>
                                            <Avatar src={activeUser.avatar} alt={activeUser.username} />
                                        </ListItemIcon>
                                        <Typography variant="h6">{activeUser.name}</Typography>
                                    </ListItem>
                                )}
                                <ListItem button component={Link} to="/home" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaHome />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <ListItem button component={Link} to="/userDetails" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaUser />
                                    </ListItemIcon>
                                    <ListItemText primary="User Details" />
                                </ListItem>
                                <ListItem button component={Link} to="/item/create-item" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaUpload />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Item" />
                                </ListItem>
                                <ListItem button component={Link} to="/get-category" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaUpload />
                                    </ListItemIcon>
                                    <ListItemText primary="Item Category" />
                                </ListItem>
                                <ListItem button component={Link} to="/item-details" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaWarehouse />
                                    </ListItemIcon>
                                    <ListItemText primary="Item Details" />
                                </ListItem>
                                <ListItem button component={Link} to="/invoice" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaFileInvoiceDollar />
                                    </ListItemIcon>
                                    <ListItemText primary="Invoice" />
                                </ListItem>
                                <ListItem button component={Link} to="/customer" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <IoIosMan />
                                    </ListItemIcon>
                                    <ListItemText primary="Customer" />
                                </ListItem>
                                <ListItem button component={Link} to="/ledger-transaction" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaBook />
                                    </ListItemIcon>
                                    <ListItemText primary="Ledger" />
                                </ListItem>
                                <ListItem button component={Link} to="/get/item" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <FaCartPlus />
                                    </ListItemIcon>
                                    <ListItemText primary="Item" />
                                </ListItem>
                                <ListItem button component={Link} to="/get/customer_rate/list" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <MdListAlt />
                                    </ListItemIcon>
                                    <ListItemText primary="Item Rate" />
                                </ListItem>
                                <ListItem button component={Link} to="/blog" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <MdListAlt />
                                    </ListItemIcon>
                                    <ListItemText primary="Blog" />
                                </ListItem>
                            </>
                        )}
                    </List>
                    {isHomePage && (
                        <Box p={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<PiSignOut />}
                                onClick={handleLogout}
                                fullWidth
                            >
                                Logout
                            </Button>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
