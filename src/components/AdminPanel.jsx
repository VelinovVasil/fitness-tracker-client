import React, { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/recipeService';
import { fetchAllWorkouts } from '../services/workoutService';
import { fetchAllUsers } from '../services/userService';
import authenticationService from '../services/authenticationService';

export default function AdminPanel() {
    const [recipes, setRecipes] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collapsed, setCollapsed] = useState({
        recipes: true,
        workouts: true,
        users: true
    });
    const token = authenticationService.getToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recipesData, workoutsData, usersData] = await Promise.all([
                    fetchAllRecipes(token),
                    fetchAllWorkouts(token),
                    fetchAllUsers(token)
                ]);

                setRecipes(recipesData);
                setWorkouts(workoutsData);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const toggleSection = (section) => {
        setCollapsed(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            <section className="collapsible-section">
                <button className="collapsible-button" onClick={() => toggleSection('recipes')}>
                    Recipes {collapsed.recipes ? '+' : '-'}
                </button>
                {!collapsed.recipes && (
                    <div className="collapsible-content">
                        <h2>Recipes</h2>
                        {recipes.length > 0 ? (
                            <ul>
                                {recipes.map(recipe => (
                                    <li key={recipe.id}>
                                        <div className="detail">
                                            <p><span>Name:</span> {recipe.name}</p>
                                            <p><span>Type:</span> {recipe.recipeType}</p>
                                            <p><span>Calories:</span> {recipe.calories}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recipes found</p>
                        )}
                    </div>
                )}
            </section>

            <section className="collapsible-section">
                <button className="collapsible-button" onClick={() => toggleSection('workouts')}>
                    Workouts {collapsed.workouts ? '+' : '-'}
                </button>
                {!collapsed.workouts && (
                    <div className="collapsible-content">
                        <h2>Workouts</h2>
                        {workouts.length > 0 ? (
                            <ul>
                                {workouts.map(workout => (
                                    <li key={workout.id}>
                                        <div className="detail">
                                            <p><span>Name:</span> {workout.name}</p>
                                            <p><span>Description:</span> {workout.description}</p>
                                            <p><span>Duration:</span> {workout.duration} minutes</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No workouts found</p>
                        )}
                    </div>
                )}
            </section>

            <section className="collapsible-section">
                <button className="collapsible-button" onClick={() => toggleSection('users')}>
                    Users {collapsed.users ? '+' : '-'}
                </button>
                {!collapsed.users && (
                    <div className="collapsible-content">
                        <h2>Users</h2>
                        {users.length > 0 ? (
                            <ul>
                                {users.map(user => (
                                    <li key={user.id}>
                                        <div className="detail">
                                            <p><span>Username:</span> {user.username}</p>
                                            <p><span>Email:</span> {user.email}</p>
                                            <p><span>Role:</span> {user.role}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
