import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MenuPage from './MenuPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserDetails from './components/UserDetails';
import UploadFile from './components/UploadFile';
import ItemDetails from './components/ItemDetails';
import PieChartWithCustomizedLabel from "./components/PieChart";
import InvoiceForm from "./components/Invoice/InvoiceForm";
import CustomerOnboard from "./components/customer/CustomerOnboard";
import CustomerDetails from "./components/customer/CustomerDetails";
import LedgerPage from "./components/LedgerPage";
import CreateItemDetails from "./components/CreateItemDetails";
import CreateItem from "./components/CreateItem";
import Item from "./components/Item";

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

    useEffect(() => {
        // Store current URL in local storage before refreshing
        localStorage.setItem('currentUrl', window.location.pathname);
    }, []);

    return (
        <Router>
            <div>
                <MenuPage
                    isLoggedIn={isLoggedIn}
                    isMenuOpen={isMenuOpen}
                    activeUser={activeUser}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    toggleMenu={toggleMenu}
                />
                <Routes>
                    {!isLoggedIn ? (
                        <>
                            <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                            <Route path="/signup" element={<SignupPage/>}/>
                            <Route path="/" element={<Navigate to="/login"/>}/>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/pie-chart" element={<PieChartWithCustomizedLabel />} />
                            <Route path="/userDetails" element={<UserDetails />} />
                            <Route path="/upload/item/details" element={<UploadFile />} />
                            <Route path="/item/inventory" element={<CreateItemDetails />} />
                            <Route path="/item-details" element={<ItemDetails />} />
                            <Route path="/invoice" element={<InvoiceForm />} />
                            <Route path="/customer" element={<CustomerDetails />} />
                            <Route path="/create-customer" element={<CustomerOnboard />} />
                            <Route path="/ledger-transaction" element={<LedgerPage />} />
                            <Route path="/create-item" element={<CreateItem />} />
                            <Route path="/get/item" element={<Item />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>

            </div>
        </Router>
    );
};

export default App;
