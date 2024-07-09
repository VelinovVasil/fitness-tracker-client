import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeById, updateRecipeById } from '../services/recipeService';
import authenticationService from '../services/authenticationService';

export default function EditRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        name: '',
        recipeType: '',
        calories: '',
        description: '',
        instructions: ''
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
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit} className='editRecipeForm'>
                <label>
                    Name:
                    <input type="text" name="name" value={recipe.name} onChange={handleChange} />
                </label>
                <label>
                    Type:
                    <select name="recipeType" value={recipe.recipeType} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="MAIN">Main</option>
                        <option value="DESSERT">Dessert</option>
                        <option value="SALAD">Salad</option>
                        <option value="SNACK">Snack</option>
                    </select>
                </label>
                <label>
                    Calories:
                    <input type="number" name="calories" value={recipe.calories} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={recipe.description} onChange={handleChange}></textarea>
                </label>
                <label>
                    Instructions:
                    <textarea name="instructions" value={recipe.instructions} onChange={handleChange}></textarea>
                </label>
                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
    );
}
