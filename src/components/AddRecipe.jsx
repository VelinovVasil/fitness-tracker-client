import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authenticationService from '../services/authenticationService';
import { createRecipe } from '../services/recipeService';
import { useTranslation } from 'react-i18next';

const AddRecipe = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [recipeName, setRecipeName] = useState('');
    const [recipeType, setRecipeType] = useState('SALAD');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [calories, setCalories] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = authenticationService.getToken();
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const toAdd = {
            name: recipeName,
            recipeType: recipeType,
            description: description,
            instructions: instructions,
            calories: calories,
            userId: userId
        };

        createRecipe(toAdd, token);
        navigate('/dashboard');
    };

    return (
        <div className="add-recipe">
            <h2>{t('add_recipe')}</h2>
            <form onSubmit={handleSubmit} className="recipe-form">
                <label>
                    {t('recipe_name')}:
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    {t('type')}:
                    <select
                        value={recipeType}
                        onChange={(e) => setRecipeType(e.target.value)}
                        required
                    >
                        <option value="SALAD">{t('salad')}</option>
                        <option value="MAIN">{t('main')}</option>
                        <option value="DESSERT">{t('dessert')}</option>
                        <option value="SNACK">{t('snack')}</option>
                    </select>
                </label>
                <label>
                    {t('description')}:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    {t('instructions')}:
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </label>
                <label>
                    {t('calories')}:
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">{t('add_recipe')}</button>
            </form>
        </div>
    );
};

export default AddRecipe;
