import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchWorkoutById, deleteWorkoutById } from '../services/workoutService';
import { fetchExerciseById } from '../services/exerciseService';
import authenticationService from '../services/authenticationService';

export default function WorkoutDetails() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = authenticationService.getToken();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workoutData = await fetchWorkoutById(id, token);
                setWorkout(workoutData);

                if (workoutData && workoutData.workoutExercises) {
                    const exerciseDetailsPromises = workoutData.workoutExercises.map(ex =>
                        fetchExerciseById(ex.exerciseId, token)
                    );
                    const exercisesDetails = await Promise.all(exerciseDetailsPromises);
                    setExercises(exercisesDetails);
                }
            } catch (error) {
                console.error('Error fetching workout or exercises:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    const handleDelete = async () => {
        try {
            await deleteWorkoutById(id, token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    if (loading) {
        return <p>{t('loading')}</p>;
    }

    if (!workout) {
        return <p>{t('workout_not_found')}</p>;
    }

    return (
        <div className="workout-detail">
            <h1>{workout.name}</h1>
            <div className="workout-info">
                <p><strong>{t('description')}:</strong> {workout.description}</p>
                <p><strong>{t('duration')}:</strong> {workout.duration} {t('minutes')}</p>
            </div>
            <div className="exercises-list">
                <h2>{t('exercises')}</h2>
                {workout.workoutExercises.map((we, index) => {
                    const exercise = exercises[index];
                    return (
                        <div key={we.exerciseId} className="exercise-detail">
                            {exercise ? (
                                <>
                                    <h3>{exercise.name}</h3>
                                    <p><strong>{t('description')}:</strong> {exercise.description}</p>
                                    <p><strong>{t('sets')}:</strong> {we.sets}</p>
                                    <p><strong>{t('reps')}:</strong> {we.reps}</p>
                                </>
                            ) : (
                                <p>{t('loading_exercise_details')}</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="buttons">
                <button onClick={() => navigate(`/edit-workout/${id}`)} className="edit-button">{t('edit_workout')}</button>
                <button onClick={handleDelete} className="delete-button">{t('delete_workout')}</button>
            </div>
        </div>
    );
}
