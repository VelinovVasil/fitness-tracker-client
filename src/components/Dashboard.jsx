import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllRecipesByUserId } from '../services/recipeService';
import { fetchAllWorkoutsByUserId } from '../services/workoutService';
import { jwtDecode } from 'jwt-decode';
import authenticationService from '../services/authenticationService';

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const token = authenticationService.getToken();
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipesData = await fetchAllRecipesByUserId(userId, token);
                const workoutsData = await fetchAllWorkoutsByUserId(userId, token);
                setRecipes(recipesData);
                setWorkouts(workoutsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [userId, token]);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Here you can see a summary of your workouts and recipes.</p>
            <div className="summary">
                <div className="workouts">
                    <h2>Workouts</h2>
                    {workouts.length === 0 && <p>No workouts logged yet.</p>}
                    {workouts.length > 0 && (
                        <ul className="recipe-list">
                            {workouts.map(workout => (
                                <li key={workout.id} className="recipe-item">
                                    <Link to={`/workout/${workout.id}`} className="recipe-link">
                                        <h3>{workout.name}</h3>
                                        <p>Description: {workout.description}</p>
                                        <p>Duration: <strong>{workout.duration}</strong> min</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link to="/add-workout" className="plus-button">+ Add Workout</Link>
                </div>
                <div className="recipes">
                    <h2>Recipes</h2>
                    {recipes.length === 0 && <p>No recipes logged yet.</p>}
                    {recipes.length > 0 && (
                        <ul className="recipe-list">
                            {recipes.map(recipe => (
                                <li key={recipe.id} className="recipe-item">
                                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                                        <h3>{recipe.name}</h3>
                                        <p>Type: {recipe.recipeType}</p>
                                        <p>Calories: {recipe.calories}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link to="/add-recipe" className="plus-button">+ Add Recipe</Link>
                </div>
            </div>
        </div>
    );
}
