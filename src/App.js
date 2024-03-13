import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import Inventory from './components/Inventory';
import UploadFile from './components/UploadFile';
import LoginPage from './components/LoginPage'; // Import LoginPage component
import { FaBars, FaWarehouse, FaUpload } from 'react-icons/fa';
import ItemDetails from "./components/ItemDetails";
import {Home} from "@mui/icons-material";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Define isMenuOpen state
    const toggleMenu = () => { // Define toggleMenu function
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = () => {
        // Perform authentication, set isLoggedIn to true if successful
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Perform logout action, set isLoggedIn to false
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <FaBars/>
                    </div>
                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/signup" onClick={toggleMenu}>
                                        SignUp
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/inventory" onClick={toggleMenu}>
                                        <FaWarehouse/> Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload" onClick={toggleMenu}>
                                        <FaUpload/> UploadFile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/itemDetails" onClick={toggleMenu}>
                                        <FaWarehouse/> Item Details
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <Routes>
                    {/*<Route path="/" element={<Home />} />*/}
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/itemDetails" element={<ItemDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

