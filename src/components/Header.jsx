import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import logo from '../logo.svg';

export default function Header() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt={t('fitness_tracker_logo')} className="logo" />
            </Link>
            <nav>
                <ul>
                    <li><Link to="/">{t('home')}</Link></li>
                    <li><Link to="/about">{t('about')}</Link></li>
                    {!user && <li><Link to="/login">{t('login')}</Link></li>}
                    {!user && <li><Link to="/register">{t('register')}</Link></li>}
                    {user && <li><Link to="/dashboard">{t('dashboard')}</Link></li>}
                    {user && <li><button onClick={handleLogout} className="logout-button">{t('logout')}</button></li>}
                </ul>
            </nav>
        </header>
    );
}
