import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllRecipesByUserId } from '../services/recipeService';
import { jwtDecode } from 'jwt-decode';
import authenticationService from '../services/authenticationService';

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    const token = authenticationService.getToken();
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipesData = await fetchAllRecipesByUserId(userId, token);
                setRecipes(recipesData);
            } catch (error) {
                console.error('Error fetching recipes:', error);
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
                    <p>You haven't logged any workouts yet.</p>
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
