import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import User from './components/User';
import Inventory from './components/Inventory';
import UploadFile from './components/UploadFile';
import { FaBars, FaWarehouse, FaUpload, FaUser } from 'react-icons/fa';

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
                            <Link to="/user">
                                <FaUser/> User
                            </Link>
                        </li>
                        <li>
                            <Link to="/inventory">
                                <FaWarehouse /> Inventory
                            </Link>
                        </li>
                        <li>
                            <Link to="/upload">
                                <FaUpload/> UploadFile
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/user" element={<User />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/upload" element={<UploadFile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
