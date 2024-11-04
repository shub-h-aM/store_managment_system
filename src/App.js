import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header'; 
import Sidebar from './Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDetails from './pages/UserDetails';
import UploadFile from './pages/UploadFile';
import ItemDetails from './pages/ItemDetails';
import InvoiceForm from './components/Invoice/InvoiceForm';
import CustomerOnboard from './components/customer/CustomerOnboard';
import CustomerDetails from './components/customer/CustomerDetails';
import LedgerPage from './pages/LedgerPage';
import CreateItemDetails from './pages/CreateItemDetails';
import CreateItem from './pages/CreateItem';
import Item from './pages/Item';
import CustomerItemRate from './components/customer/CustomerItemRate';
import useInactivityTimeout from './hooks/useInactivityTimeout';
import Blog from './components/HomePage/Blog';
import AdminPage from './components/card/AdminPage';
import About from './components/InformationPages/About';
import Services from './components/InformationPages/Services';
import Contact from './components/InformationPages/Contact';
import OrderForm from './pages/OrderForm';
import ItemCategory from './pages/ItemCategory';
import CreateCategory from './pages/CreateItemCategoryPage';
import Cart from './components/Cart';
import UserProduct from './components/card/UserPage';
import Roles from './pages/RolesPage';
import AccessManagementPage from './pages/AccessManagementPage';
import Pages from './pages/UiPagesPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeUser, setActiveUser] = useState(null);
    const [animals, setAnimals] = useState([
        { id: 1, img: 'https://img.mobiscroll.com/demos/gridlayout/okapi.jpg', name: 'Okapi', about: 'Native to Congo.' },
        { id: 2, img: 'https://img.mobiscroll.com/demos/gridlayout/dragon.jpg', name: 'The Blue Dragon', about: 'Found in Indian Pacific Oceans.' },
        { id: 3, img: 'https://img.mobiscroll.com/demos/gridlayout/wolf.jpg', name: 'The Maned Wolf', about: 'Often found in Brazil.' },
        { id: 4, img: 'https://img.mobiscroll.com/demos/gridlayout/fossa.jpg', name: 'Fossa', about: 'A carnivorous animal in Madagascar.' },
    ]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setActiveUser(user);
        localStorage.setItem('isLoggedIn', true);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveUser(null);
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
    };

    const handleAddAnimal = (newAnimal) => {
        const animalWithId = {
            ...newAnimal,
            id: animals.length ? Math.max(...animals.map(a => a.id)) + 1 : 1 // Generate a new ID
        };
        setAnimals((prevAnimals) => [...prevAnimals, animalWithId]);
    };

    const handleUpdateAnimal = (updatedAnimal) => {
        setAnimals((prevAnimals) =>
            prevAnimals.map(animal =>
                animal.id === updatedAnimal.id ? updatedAnimal : animal
            )
        );
    };

    const handleDeleteAnimal = (id) => {
        setAnimals((prevAnimals) => prevAnimals.filter(animal => animal.id !== id));
    };

    useEffect(() => {
        const isLoggedInStored = localStorage.getItem('isLoggedIn');
        if (isLoggedInStored) {
            setIsLoggedIn(true);
        }
    }, []);

    useInactivityTimeout(5 * 60 * 1000, () => {
        alert('You will be logged out due to inactivity.');
        handleLogout();
    });

    useEffect(() => {
        localStorage.setItem('currentUrl', window.location.pathname);
    }, []);

    return (
        <Router>
            <div>
                <Header toggleMenu={toggleMenu} />
                <Sidebar
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
                            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/home" element={<HomePage />} />
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
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/get/customer_rate/list" element={<CustomerItemRate />} />
                            <Route path="/get/order/form" element={<OrderForm />} />
                            <Route path="/ops/get-category" element={<ItemCategory />} />
                            <Route path="/create-item-category" element={<CreateCategory />} />
                            <Route path="/ops/get/product" element={<UserProduct />} />
                            <Route path="/ops/access/management" element={<AccessManagementPage />} />
                            <Route path="/ops/roles/management" element={<Roles />} />
                            <Route path="/ops/pages/management" element={<Pages />} />
                            <Route path="/ops/admin/card" element={<AdminPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
