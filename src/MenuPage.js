import React from 'react';
import { Link } from 'react-router-dom';
import {FaBars, FaWarehouse, FaUpload, FaChartPie, FaBook, FaUser, FaFileInvoiceDollar, FaCartPlus} from 'react-icons/fa';
import {IoIosMan} from "react-icons/io";
import {MdAssignmentInd, MdListAlt} from "react-icons/md";
import {PiSignOut} from "react-icons/pi";
import {GoSignIn} from "react-icons/go";

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
                                <GoSignIn style={{marginBottom:"3px",marginRight:"3px"}}/>Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup" onClick={toggleMenu}>
                                <MdAssignmentInd style={{marginBottom:"3px",marginRight:"3px"}}/>Sign Up
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
                            <Link to="/userDetails" onClick={toggleMenu}>
                                <FaUser style={{marginBottom:"5px",marginRight:"-1px"}}/> User Details
                            </Link>
                        </li>
                        <li>
                            <Link to="/item/inventory" onClick={toggleMenu}>
                                <FaUpload style={{marginBottom:"5px",marginRight:"-1px"}}/> Add Item
                            </Link>
                        </li>
                        <li>
                            <Link to="/item-details" onClick={toggleMenu}>
                                <FaWarehouse style={{marginBottom:"4px",marginRight:"-1px"}}/> Item Details
                            </Link>
                        </li>
                        <li>
                            <Link to="/invoice" onClick={toggleMenu}>
                                <FaFileInvoiceDollar style={{marginBottom:"4px",marginRight:"-2px"}}/> Invoice
                            </Link>
                        </li>
                        <li>
                            <Link to="/customer" onClick={toggleMenu}>
                                <IoIosMan style={{marginBottom:"4px",marginRight:"-3px"}}/> Customer
                            </Link>
                        </li>
                        <li>
                            <Link to="/ledger-transaction" onClick={toggleMenu}>
                                <FaBook style={{marginBottom:"3px",marginRight:"2px"}}/>Ledger
                            </Link>
                        </li>
                        <li>
                            <Link to="/get/item" onClick={toggleMenu}>
                                <FaCartPlus style={{marginBottom:"3px",marginRight:"3px"}}/>Item
                            </Link>
                        </li>
                        <li>
                            <Link to="/get/customer_rate/list" onClick={toggleMenu}>
                                <MdListAlt style={{marginBottom:"3px",marginRight:"2px"}}/>Item Rate
                            </Link>
                        </li>
                        <li>
                            <button style={{marginTop:"7px",marginLeft:'5px',borderRadius:'20px',marginRight:"-7px",
                                width:'112px',backgroundColor:'red',textAlign:'center'}} onClick={handleLogout}>
                                <PiSignOut style={{marginBottom:"3px",marginRight:"2px"}}/>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default MenuPage;
