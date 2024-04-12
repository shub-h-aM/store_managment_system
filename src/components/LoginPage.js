import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logoutTimer, setLogoutTimer] = useState(null);

    // Effect to check if user is logged in already
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, user is already logged in
            // You can redirect the user to another page or do any necessary action here
            console.log('User already logged in');
            startLogoutTimer(); // Start the logout timer when the user is logged in
        }
    }, []);

    // Function to start the logout timer
    const startLogoutTimer = () => {
        const timer = setTimeout(() => {
            // Perform logout actions here, such as clearing local storage and redirecting to login page
            localStorage.removeItem('token');
            console.log('User logged out due to inactivity');
        }, 15 * 60 * 1000); // 15 minutes in milliseconds
        setLogoutTimer(timer);
    };

    // Function to reset the logout timer
    const resetLogoutTimer = () => {
        clearTimeout(logoutTimer); // Clear the existing timer
        startLogoutTimer(); // Start a new timer
    };

    // Function to handle user login
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token); // Store token in local storage
                onLogin(user); // Pass user details to onLogin function
                startLogoutTimer(); // Start the logout timer when the user is logged in
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again later.');
        }
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    // Event listener to reset the logout timer on user activity
    useEffect(() => {
        const resetTimerOnActivity = () => {
            window.addEventListener('mousemove', resetLogoutTimer);
            window.addEventListener('keydown', resetLogoutTimer);
        };
        resetTimerOnActivity();

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('mousemove', resetLogoutTimer);
            window.removeEventListener('keydown', resetLogoutTimer);
        };
    }, [logoutTimer]);

    return (
        <div className="login-page">
            <div>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
