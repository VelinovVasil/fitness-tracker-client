import React, { useState } from 'react';
import './LoginRegister.css';
import authService from '../services/authenticationService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError('Failed to login');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome back</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
}
