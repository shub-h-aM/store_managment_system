import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import User from './components/User';
import Inventory from './components/Inventory';
import UploadFile from './components/UploadFile';
import { FaBars, FaWarehouse, FaUpload, FaUser } from 'react-icons/fa';
import ItemDetails from "./components/ItemDetails";

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <FaBars />
                    </div>
                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <li>
                            <Link to="/user" onClick={toggleMenu}>
                                <FaUser/> User
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
                    </ul>
                </nav>
                <Routes>
                    <Route path="/user" element={<User />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/itemDetails" element={<ItemDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
