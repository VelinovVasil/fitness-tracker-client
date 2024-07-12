import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchExercises } from '../services/exerciseService';
import { createWorkout } from '../services/workoutService';
import { jwtDecode } from 'jwt-decode';
import authenticationService from '../services/authenticationService';

const AddWorkout = () => {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const token = authenticationService.getToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchExercises(token);
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        fetchData();
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const token = authenticationService.getToken();
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const workoutExercises = selectedExercises.map(ex => ({
            exerciseId: ex.id,
            sets: ex.sets,
            reps: ex.reps,
        }));

        const workoutData = {
            name: workoutName,
            description,
            duration,
            userId,
            exercises: workoutExercises,
        };

        createWorkout(workoutData, token);
        navigate('/dashboard');
    };

    const handleExerciseChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push({
                    id: options[i].value,
                    name: options[i].dataset.name,
                    description: options[i].dataset.description,
                    muscleGroup: options[i].dataset.musclegroup,
                    sets: '',
                    reps: '',
                });
            }
        }
        setSelectedExercises(selected);
    };

    const handleDetailChange = (id, field, value) => {
        setSelectedExercises(prev => 
            prev.map(ex => 
                ex.id === id ? { ...ex, [field]: value } : ex
            )
        );
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
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                <label>
                    Exercises:
                    <select multiple onChange={handleExerciseChange}>
                        {exercises.map((exercise) => (
                            <option
                                key={exercise.id}
                                value={exercise.id}
                                data-name={exercise.name}
                                data-description={exercise.description}
                                data-musclegroup={exercise.muscleGroup}
                            >
                                {exercise.name} - {exercise.description} ({exercise.muscleGroup})
                            </option>
                        ))}
                    </select>
                </label>

                {selectedExercises.map(ex => (
                    <div key={ex.id} className="selected-exercise">
                        <h3>{ex.name}</h3>
                        <p>{ex.description}</p>
                        <p>Muscle Group: {ex.muscleGroup}</p>
                        <label>
                            Sets:
                            <input
                                type="number"
                                value={ex.sets}
                                onChange={(e) => handleDetailChange(ex.id, 'sets', e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Reps:
                            <input
                                type="number"
                                value={ex.reps}
                                onChange={(e) => handleDetailChange(ex.id, 'reps', e.target.value)}
                                required
                            />
                        </label>
                    </div>
                ))}

                <button type="submit">Add Workout</button>
            </form>
        </div>
    );
};

export default AddWorkout;
