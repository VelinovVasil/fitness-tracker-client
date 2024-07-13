import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWorkoutById } from '../services/workoutService';
import { fetchExerciseById } from '../services/exerciseService';
import authenticationService from '../services/authenticationService';

export default function WorkoutDetails() {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const token = authenticationService.getToken();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workoutData = await fetchWorkoutById(id, token);
                setWorkout(workoutData);

                if (workoutData && workoutData.workoutExercises) {
                    // Fetch details for each exercise
                    const exerciseDetailsPromises = workoutData.workoutExercises.map(ex =>
                        fetchExerciseById(ex.exerciseId, token)
                    );
                    const exercisesDetails = await Promise.all(exerciseDetailsPromises);
                    setExercises(exercisesDetails);
                }
            } catch (error) {
                console.error('Error fetching workout or exercises:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchData();
    }, [id, token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!workout) {
        return <p>Workout not found</p>;
    }

    return (
        <div className="workout-detail">
            <h1>{workout.name}</h1>
            <div className="workout-info">
                <p><strong>Description:</strong> {workout.description}</p>
                <p><strong>Duration:</strong> {workout.duration} minutes</p>
            </div>
            <div className="exercises-list">
                <h2>Exercises</h2>
                {workout.workoutExercises.map((we, index) => {
                    const exercise = exercises[index];
                    return (
                        <div key={we.exerciseId} className="exercise-detail">
                            {exercise ? (
                                <>
                                    <h3>{exercise.name}</h3>
                                    <p><strong>Description:</strong> {exercise.description}</p>
                                    <p><strong>Sets:</strong> {we.sets}</p>
                                    <p><strong>Reps:</strong> {we.reps}</p>
                                </>
                            ) : (
                                <p>Loading exercise details...</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="buttons">
                <button onClick={() => navigate(`/edit-workout/${id}`)} className="edit-button">Edit Workout</button>
                <button onClick={() => navigate(`/delete-workout/${id}`)} className="delete-button">Delete Workout</button>
            </div>
        </div>
    );
}
