import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MenuPage from './MenuPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserDetails from './components/UserDetails';
import UploadFile from './components/UploadFile';
import ItemDetails from './components/ItemDetails';
import InvoiceForm from "./components/Invoice/InvoiceForm";
import CustomerOnboard from "./components/customer/CustomerOnboard";
import CustomerDetails from "./components/customer/CustomerDetails";
import LedgerPage from "./components/LedgerPage";
import CreateItemDetails from "./components/CreateItemDetails";
import CreateItem from "./components/CreateItem";
import Item from "./components/Item";
import CustomerItemRate from "./components/customer/CustomerItemRate";
import useInactivityTimeout from "./components/hook/useInactivityTimeout";

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
        // Redirect to login page after logout
        window.location.href = '/login';
    };

    useEffect(() => {
        // Check for login state in local storage and set initial state
        const isLoggedInStored = localStorage.getItem('isLoggedIn');
        if (isLoggedInStored) {
            setIsLoggedIn(true);
        }
    }, []);

    // Use the custom hook for inactivity timeout
    useInactivityTimeout(5 * 60 * 1000, () => {
        alert('You will be logged out due to inactivity.');
        handleLogout();
    });

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
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/userDetails" element={<UserDetails />} />
                            <Route path="/upload/item/details" element={<UploadFile />} />
                            <Route path="/item/create-item" element={<CreateItemDetails />} />
                            <Route path="/item-details" element={<ItemDetails />} />
                            <Route path="/invoice" element={<InvoiceForm />} />
                            <Route path="/customer" element={<CustomerDetails />} />
                            <Route path="/create-customer" element={<CustomerOnboard />} />
                            <Route path="/ledger-transaction" element={<LedgerPage />} />
                            <Route path="/create-item" element={<CreateItem />} />
                            <Route path="/get/item" element={<Item />} />
                            <Route path="/get/customer_rate/list" element={<CustomerItemRate />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
