import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMeal = () => {
    const navigate = useNavigate();
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add logic to handle submitting the meal data
        console.log(`Meal Name: ${mealName}, Calories: ${calories}`);
        // Example: You might send an API request to save the meal data
        // After successful submission, navigate back to the dashboard or another page
        navigate('/dashboard');
    };

    return (
        <div className="add-meal">
            <h2>Add Meal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Meal Name:
                    <input
                        type="text"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
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
                <button type="submit">Add Meal</button>
            </form>
        </div>
    );
};

export default AddMeal;
