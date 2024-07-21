import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchRecipeById, updateRecipeById } from '../services/recipeService';
import authenticationService from '../services/authenticationService';

export default function EditRecipe() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [recipe, setRecipe] = useState({
        name: '',
        recipeType: '',
        calories: '',
        description: '',
        instructions: '',
        userId: id
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRecipeById(id, recipe, token);
            navigate(`/recipe/${id}`);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div className="editRecipeContainer">
            <h1>{t('edit_recipe')}</h1>
            <form onSubmit={handleSubmit} className='editRecipeForm'>
                <label>
                    {t('recipe_name')}:
                    <input type="text" name="name" value={recipe.name} onChange={handleChange} />
                </label>
                <label>
                    {t('type')}:
                    <select name="recipeType" value={recipe.recipeType} onChange={handleChange}>
                        <option value="">{t('select_type')}</option>
                        <option value="MAIN">{t('main')}</option>
                        <option value="DESSERT">{t('dessert')}</option>
                        <option value="SALAD">{t('salad')}</option>
                        <option value="SNACK">{t('snack')}</option>
                    </select>
                </label>
                <label>
                    {t('calories')}:
                    <input type="number" name="calories" value={recipe.calories} onChange={handleChange} />
                </label>
                <label>
                    {t('description')}:
                    <textarea name="description" value={recipe.description} onChange={handleChange}></textarea>
                </label>
                <label>
                    {t('instructions')}:
                    <textarea name="instructions" value={recipe.instructions} onChange={handleChange}></textarea>
                </label>
                <button type="submit" className="save-button">{t('save_changes')}</button>
            </form>
        </div>
    );
}
