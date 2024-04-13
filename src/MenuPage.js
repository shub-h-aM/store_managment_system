import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaWarehouse, FaUpload, FaChartPie } from 'react-icons/fa';

const MenuPage = ({ isLoggedIn, isMenuOpen, activeUser, handleLogin, handleLogout, toggleMenu }) => {
    return (
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
                            <Link to="/item/inventory" onClick={toggleMenu}>
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
    );
};

export default MenuPage;
