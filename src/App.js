import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Headers from './components/Headers';  // Import Headers
import Sidebar from './Sidebar';
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
import Blog from "./components/HomePage/Blog";
import CardDetails from './components/card/CardDetails';
import AdminPage from './components/card/AdminPage';
import About from './components/GeneralPage/About';
import Services from './components/GeneralPage/Services';
import Contact from './components/GeneralPage/Contact';
import Footer from './components/Footer';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeUser, setActiveUser] = useState(null);

    // State for animals data
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
                <Headers toggleMenu={toggleMenu} />  {/* Include Headers */}
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
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/get/customer_rate/list" element={<CustomerItemRate />} />
                            <Route path="/card-details" element={<CardDetails animals={animals} onAdd={handleAddAnimal} />}/> {/* Pass props to CardDetails */}
                            <Route path="/admin" element={<AdminPage animals={animals} onAdd={handleAddAnimal} onUpdate={handleUpdateAnimal} onDelete={handleDeleteAnimal} />} /> {/* AdminPage Route */}
                            <Route path="*" element={<Navigate to="/home" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
