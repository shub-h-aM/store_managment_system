import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import UserDetails from './components/UserDetails';
import UploadFile from './components/UploadFile';
import LoginPage from './components/LoginPage';
import PieChartWithCustomizedLabel from './components/PieChart';
import ItemDetails from "./components/ItemDetails";
import {FaBars, FaWarehouse, FaUpload, FaChartPie} from 'react-icons/fa';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
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
                                <li>
                                    <Link to="/pie-chart" onClick={toggleMenu}>
                                     <FaChartPie/>Pie Chart
                                    </Link>
                                </li>
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
                                    <button  onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <Routes>
                    {!isLoggedIn ? (
                        <>
                            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignupPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={isLoggedIn ? <PieChartWithCustomizedLabel /> : <LoginPage onLogin={handleLogin} />} />
                            <Route path="/pie-chart" element={<PieChartWithCustomizedLabel />} />
                            {/* Add other routes for authenticated users */}
                            <Route path="/inventory" element={<UserDetails />} />
                            <Route path="/upload" element={<UploadFile />} />
                            <Route path="/itemDetails" element={<ItemDetails />} />
                        </>
                    )}
                </Routes>

            </div>
        </Router>
    );
};


export default App;