import React, { useState } from 'react';
import './LoginRegister.css';
import authService from '../services/authenticationService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/');
            window.location.reload();
        } catch (error) {
            setError(t('login_failed'));
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>{t('welcome_back')}</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>{t('username')}</label>
                    <input 
                        type="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>{t('password')}</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">{t('login')}</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
