import React from 'react';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Here you can see a summary of your workouts and meals.</p>
            <div className="summary">
                <div className="workouts">
                    <h2>Workouts</h2>
                    <p>You haven't logged any workouts yet.</p>
                </div>
                <div className="meals">
                    <h2>Meals</h2>
                    <p>You haven't logged any meals yet.</p>
                </div>
            </div>
        </div>
    );
}
