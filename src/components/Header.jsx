import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import logo from '../logo.svg';
import { getWeather } from '../services/weatherService';
import { getUserIP } from '../services/ipService';

export default function Header() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const userIP = await getUserIP();
                const data = await getWeather(userIP);
                setWeather(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

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
            {loading && <p>Loading weather...</p>}
            {error && <p>Error fetching weather: {error}</p>}
            {weather && (
                <div className="weather-info">
                    <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                    <span>{weather.location.name}: {weather.current.temp_c}°C</span>
                </div>
            )}
        </header>
    );
}
