import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Here you can see a summary of your workouts and meals.</p>
            <div className="summary">
                <div className="workouts">
                    <h2>Workouts</h2>
                    <p>You haven't logged any workouts yet.</p>
                    <Link to="/add-workout" className="plus-button">+ Add Workout</Link>
                </div>
                <div className="meals">
                    <h2>Meals</h2>
                    <p>You haven't logged any meals yet.</p>
                    <Link to="/add-meal" className="plus-button">+ Add Meal</Link>
                </div>
            </div>
        </div>
    );
}
