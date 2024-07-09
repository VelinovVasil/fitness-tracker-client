import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeById, deleteRecipeById  } from '../services/recipeService';
import authenticationService from '../services/authenticationService';

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const token = authenticationService.getToken();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await fetchRecipeById(id, token);
                setRecipe(recipeData);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchData();
    }, [id, token]);

    const handleDelete = async () => {
        try {
            await deleteRecipeById(id, token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div className="recipe-detail">
            <h1>{recipe.name}</h1>
            <div className="recipe-info">
                <p><strong>Type:</strong> {recipe.recipeType}</p>
                <p><strong>Calories:</strong> {recipe.calories}</p>
                <p><strong>Description:</strong> {recipe.description}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
            <div className="buttons">
                <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)} className="edit-button">Edit Recipe</button>
                <button onClick={handleDelete} className="delete-button">Delete Recipe</button>
            </div>
        </div>
    );
}
