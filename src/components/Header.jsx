import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Fitness Tracker Logo" className="logo" />
            </Link>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
}
