import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate} from 'react-router-dom';
import SignupPage from './components/SignupPage';
import UserDetails from './components/UserDetails';
import UploadFile from './components/UploadFile';
import LoginPage from './components/LoginPage';
import PieChartWithCustomizedLabel from './components/PieChart';
import ItemDetails from "./components/ItemDetails";
import { FaBars, FaWarehouse, FaUpload, FaChartPie } from 'react-icons/fa';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeUser, setActiveUser] = useState(null); // State to hold active user details

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = (user) => {
        // Perform authentication, set isLoggedIn to true if successful
        setIsLoggedIn(true);
        setActiveUser(user); // Set active user details

    };

    const handleLogout = () => {
        // Perform logout action, set isLoggedIn to false
        setIsLoggedIn(false);
        setActiveUser(null); // Clear active user details
    };

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <FaBars />
                    </div>
                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/login" onClick={toggleMenu}>
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={toggleMenu}>
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {activeUser && (
                                    <li className="user-info">
                                        <img src={activeUser.avatar} alt={activeUser.username} className="avatar" />
                                        <span className="username">{activeUser.name}</span>
                                    </li>
                                )}

                                <li>
                                    <Link to="/pie-chart" onClick={toggleMenu}>
                                        <FaChartPie /> Pie Chart
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/userDetails" onClick={toggleMenu}>
                                        <FaWarehouse /> User Details
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload" onClick={toggleMenu}>
                                        <FaUpload /> Add Item
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/item-details" onClick={toggleMenu}>
                                        <FaWarehouse /> Item Details
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
                    {!isLoggedIn ? (
                        <>
                            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="*" element={<Navigate to={"/login"} />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={ <PieChartWithCustomizedLabel />} />
                            <Route path="/pie-chart" element={<PieChartWithCustomizedLabel />} />
                            {/* Add other routes for authenticated users */}
                            <Route path="/userDetails" element={<UserDetails />} />
                            <Route path="/upload" element={<UploadFile />} />
                            <Route path="/item-details" element={<ItemDetails />} />
                            <Route path="*" element={<Navigate to={"/"} />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
