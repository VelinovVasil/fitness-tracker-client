import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWorkoutById, updateWorkout } from '../services/workoutService';
import { fetchExercises } from '../services/exerciseService';
import {jwtDecode} from 'jwt-decode'; // Fixed import
import authenticationService from '../services/authenticationService';

const EditWorkout = () => {
    const { id } = useParams();
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
                const workoutData = await fetchWorkoutById(id, token);
                if (!workoutData) throw new Error('Workout not found');
                
                console.log('Workout Data:', workoutData);
                setWorkoutName(workoutData.name || '');
                setDescription(workoutData.description || '');
                setDuration(workoutData.duration || '');

                const exercisesData = await fetchExercises(token);
                console.log('Exercises Data:', exercisesData);
                
                if (!exercisesData) throw new Error('Exercises not found');

                const selected = workoutData.workoutExercises ? workoutData.workoutExercises.map(we => ({
                    ...exercisesData.find(e => e.id === we.exerciseId),
                    sets: we.sets,
                    reps: we.reps,
                })) : [];

                console.log('Selected Exercises:', selected);

                setExercises(exercisesData);
                setSelectedExercises(selected);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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

            await updateWorkout(id, workoutData, token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    const handleExerciseChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                const existingExercise = selectedExercises.find(se => se.id === options[i].value);
                if (existingExercise) {
                    selected.push(existingExercise);
                } else {
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
        <div className="edit-workout">
            <h2>Edit Workout</h2>
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
                                selected={selectedExercises.some(se => se.id === exercise.id)}
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

                <button type="submit">Update Workout</button>
            </form>
        </div>
    );
};

export default EditWorkout;
