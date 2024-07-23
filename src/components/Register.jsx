import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import authenticationService from '../services/authenticationService';


export default function Register() {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (!username || !email || !password || !confirmPassword) {
            setError(t('all_fields_required'));
            return;
        }


        if (password !== confirmPassword) {
            setError(t('passwords_do_not_match'));
            return;
        }


        setError('');

        const dto = {
            username,
            email,
            password
        }

        authenticationService.register(dto);
    };

    return (
        <div className="register-container">
            <h2>{t('register')}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>{t('username')}</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
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
