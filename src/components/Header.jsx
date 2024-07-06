import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logo from '../logo.svg';

export default function Header() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Fitness Tracker Logo" className="logo" />
            </Link>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {!user && <li><Link to="/login">Login</Link></li>}
                    {!user && <li><Link to="/register">Register</Link></li>}
                    {user && <li><Link to="/dashboard">Dashboard</Link></li>}
                    {user && <li><button onClick={handleLogout} className="logout-button">Logout</button></li>}
                </ul>
            </nav>
        </header>
    );
}
