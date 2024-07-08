import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authenticationService from '../services/authenticationService';
import {createRecipe} from '../services/recipeService';

const AddRecipe = () => {
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
        }

        createRecipe(toAdd, token);

        navigate('/dashboard');
    };

    return (
        <div className="add-recipe">
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit} className="recipe-form">
                <label>
                    Recipe Name:
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type:
                    <select
                        value={recipeType}
                        onChange={(e) => setRecipeType(e.target.value)}
                        required
                    >
                        <option value="SALAD">Salad</option>
                        <option value="MAIN">Main</option>
                        <option value="DESSERT">Dessert</option>
                        <option value="SNACK">Snack</option>
                    </select>
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Instructions:
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Calories:
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;
