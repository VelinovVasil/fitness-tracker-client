import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddWorkout = () => {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add logic to handle submitting the workout data
        console.log(`Workout Name: ${workoutName}, Duration: ${duration}`);
        // Example: You might send an API request to save the workout data
        // After successful submission, navigate back to the dashboard or another page
        navigate('/dashboard');
    };

    return (
        <div className="add-workout">
            <h2>Add Workout</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Workout Name:
                    <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Duration (minutes):
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Workout</button>
            </form>
        </div>
    );
};

export default AddWorkout;
