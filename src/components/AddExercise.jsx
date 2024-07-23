import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MuscleGroup from '../constants/MuscleGroup';
import { addExercise } from '../services/exerciseService';
import authService from '../services/authenticationService';

export default function AddExercise() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [muscleGroup, setMuscleGroup] = useState(MuscleGroup.BACK);
    const token = authService.getToken();
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault();

        const exerciseDTO = {
            name,
            description,
            muscleGroup
        };

        addExercise(exerciseDTO, token);
        navigate('/admin');
    };

    return (
        <div className="form-container">
            <h2>Add New Exercise</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name"
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                        minLength="5"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="muscleGroup">Muscle Group:</label>
                    <select 
                        id="muscleGroup"
                        value={muscleGroup} 
                        onChange={(e) => setMuscleGroup(e.target.value)}
                    >
                        {Object.keys(MuscleGroup).map(group => (
                            <option key={group} value={MuscleGroup[group]}>
                                {MuscleGroup[group]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit">Add Exercise</button>
                </div>
            </form>
        </div>
    );
}
