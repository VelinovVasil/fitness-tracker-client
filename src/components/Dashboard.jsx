import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllRecipesByUserId } from '../services/recipeService';
import { fetchAllWorkoutsByUserId } from '../services/workoutService';
import { jwtDecode } from 'jwt-decode';
import authenticationService from '../services/authenticationService';
import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const { t } = useTranslation();
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
            <h1>{t('dashboard')}</h1>
            <p>{t('dashboard_summary')}</p>
            <div className="summary">
                <div className="workouts">
                    <h2>{t('workouts')}</h2>
                    {workouts.length === 0 && <p>{t('no_workouts')}</p>}
                    {workouts.length > 0 && (
                        <ul className="recipe-list">
                            {workouts.map(workout => (
                                <li key={workout.id} className="recipe-item">
                                    <Link to={`/workout/${workout.id}`} className="recipe-link">
                                        <h3>{workout.name}</h3>
                                        <p>{t('workout_description')}: {workout.description}</p>
                                        <p>{t('workout_duration')}: <strong>{workout.duration}</strong> min</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link to="/add-workout" className="plus-button">{t('add_workout')}</Link>
                </div>
                <div className="recipes">
                    <h2>{t('recipes')}</h2>
                    {recipes.length === 0 && <p>{t('no_recipes')}</p>}
                    {recipes.length > 0 && (
                        <ul className="recipe-list">
                            {recipes.map(recipe => (
                                <li key={recipe.id} className="recipe-item">
                                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                                        <h3>{recipe.name}</h3>
                                        <p>{t('recipe_type')}: {recipe.recipeType}</p>
                                        <p>{t('calories')}: {recipe.calories}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link to="/add-recipe" className="plus-button">{t('add_recipe')}</Link>
                </div>
            </div>
        </div>
    );
}
