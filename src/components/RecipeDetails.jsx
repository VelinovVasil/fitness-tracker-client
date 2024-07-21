import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchRecipeById, deleteRecipeById } from '../services/recipeService';
import authenticationService from '../services/authenticationService';

export default function RecipeDetails() {
    const { id } = useParams();
    const { t } = useTranslation();
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
        return <p>{t('loading')}</p>;
    }

    return (
        <div className="recipe-detail">
            <h1>{recipe.name}</h1>
            <div className="recipe-info">
                <p><strong>{t('type')}:</strong> {t(recipe.recipeType.toLowerCase())}</p>
                <p><strong>{t('calories')}:</strong> {recipe.calories}</p>
                <p><strong>{t('description')}:</strong> {recipe.description}</p>
                <p><strong>{t('instructions')}:</strong> {recipe.instructions}</p>
            </div>
            <div className="buttons">
                <button onClick={() => navigate(`/edit-recipe/${id}`)} className="edit-button">{t('edit_recipe')}</button>
                <button onClick={handleDelete} className="delete-button">{t('delete_recipe')}</button>
            </div>
        </div>
    );
}
