import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle user login
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token); // Store token in local storage
                onLogin(user); // Pass user details to onLogin function
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error.response); // Log the error response
            setError('Error logging in. Please try again later.');
        }
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <div className="login-page">
            <div style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ display: 'flex', marginBottom: '30px', marginLeft: '40px' }}>Login</h1>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" style={{
                        marginTop: "7px", marginLeft: '27px', borderRadius: '20px',
                        width: '150px', borderLeftColor: 'pink'
                    }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
