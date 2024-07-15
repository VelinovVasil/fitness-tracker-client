const API_URL = 'http://localhost:8080/workout';


export const createWorkout = async (workout, token) => {

    try {

        const response = await fetch(API_URL + '/create',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                },
                body: JSON.stringify(workout)
            }
        );

        return response;

    } catch (error) {
        console.log(error);
        throw new error;
    }

}

export const fetchAllWorkoutsByUserId = async (userId, token) => {
    try {
        const response = await fetch(API_URL + '/get/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch workouts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error; 
    }
};

export const fetchWorkoutById = async (workoutId, token) => {
    try {
        const response = await fetch(API_URL + '/'+ workoutId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch workout');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching workout:', error);
        throw error; 
    }

}

export const deleteWorkoutById = async (id, token) => {

    try {

        const response = await fetch(API_URL + '/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateWorkout = async () => {

}