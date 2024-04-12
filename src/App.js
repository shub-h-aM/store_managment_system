import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserDetails from './components/UserDetails';
import UploadFile from './components/UploadFile';
import ItemDetails from './components/ItemDetails';
import { FaBars, FaWarehouse, FaUpload, FaChartPie } from 'react-icons/fa';
import PieChartWithCustomizedLabel from "./components/PieChart";
import InvoiceForm from "./components/Invoice/InvoiceForm";
import CustomerOnboard from "./components/customer/CustomerOnboard";
import CustomerDetails from "./components/customer/CustomerDetails";
import LedgerPage from "./components/LedgerPage";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeUser, setActiveUser] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setActiveUser(user);
        localStorage.setItem('isLoggedIn', true);
        // Close the menu after successful login
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveUser(null);
        localStorage.removeItem('isLoggedIn');
    };

    useEffect(() => {
        let timeout;
        const logout = () => {
            localStorage.removeItem('token');
            // Perform any other logout actions
            console.log('User logged out due to inactivity');
            window.alert('You will be logged out due to inactivity.');
            handleLogout(); // Logout the user
        };

        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(logout, 15 * 60 * 1000);
        };

        resetTimeout();

        // Event listeners to reset timeout on user activity
        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);

        // Check for login state in local storage and set initial state
        const isLoggedInStored = localStorage.getItem('isLoggedIn');
        if (isLoggedInStored) {
            setIsLoggedIn(true);
        }

        return () => {
            window.removeEventListener('mousemove', resetTimeout);
            window.removeEventListener('keydown', resetTimeout);
        };
    }, []);




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
                                {activeUser && (
                                    <li className="user-info">
                                        <img src={activeUser.avatar} alt={activeUser.username} className="avatar"/>
                                        <span className="username">{activeUser.name}</span>
                                    </li>
                                )}

                                <li>
                                    <Link to="/pie-chart" onClick={toggleMenu}>
                                        <FaChartPie/> Pie Chart
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/userDetails" onClick={toggleMenu}>
                                        <FaWarehouse/> User Details
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload" onClick={toggleMenu}>
                                        <FaUpload/> Add Item
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/item-details" onClick={toggleMenu}>
                                        <FaWarehouse/> Item Details
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/invoice" onClick={toggleMenu}>
                                        <FaWarehouse/> Invoice
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customer" onClick={toggleMenu}>
                                        <FaWarehouse/> Customer
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ledger-transaction" onClick={toggleMenu}>
                                        <FaWarehouse/>Ledger
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
                            <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                            <Route path="/signup" element={<SignupPage/>}/>
                            <Route path="*" element={<Navigate to="/login"/>}/>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/pie-chart" element={<PieChartWithCustomizedLabel />} />
                            <Route path="/userDetails" element={<UserDetails />} />
                            <Route path="/upload" element={<UploadFile />} />
                            <Route path="/item-details" element={<ItemDetails />} />
                            <Route path="/invoice" element={<InvoiceForm />} />
                            <Route path="/customer" element={<CustomerDetails />} />
                            <Route path="/create-customer" element={<CustomerOnboard />} />
                            <Route path="/ledger-transaction" element={<LedgerPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
