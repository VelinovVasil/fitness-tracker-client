import React, { useState } from 'react';
import './LoginRegister.css';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <div className="register-container">
            <h2>{t('register')}</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>{t('email')}</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                <div className="form-group">
                    <label>{t('confirm_password')}</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">{t('register')}</button>
            </form>
        </div>
    );
}
