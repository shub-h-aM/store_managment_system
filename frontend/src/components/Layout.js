import React, { useState } from 'react';
import Headers from './Headers';
import MenuPage from './Sidebar';

const Layout = ({ children, isLoggedIn, activeUser, handleLogin, handleLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Headers toggleMenu={toggleMenu} />
            <MenuPage
                isLoggedIn={isLoggedIn}
                isMenuOpen={isMenuOpen}
                activeUser={activeUser}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                toggleMenu={toggleMenu}
            />
            <main>{children}</main>
        </>
    );
};

export default Layout;
