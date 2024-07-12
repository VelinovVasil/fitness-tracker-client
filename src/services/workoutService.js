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